// MIT © 2016 azu
"use strict";
const tokenize = require("kuromojin").tokenize;
const dictionaryList = require("./dictionary");
const createMatchAll = require("morpheme-match-all");

const replaceTokenWith = (matcherToken, actualToken, specialTo) => {
    // _captureがないのは無視
    if (!matcherToken._capture) {
        return null;
    }
    if (matcherToken[specialTo]) {
        return matcherToken[specialTo](actualToken);
    }
    return actualToken.surface_form;
};
const createExpected = ({text, matcherTokens, skipped, actualTokens}) => {
    let resultText = text;
    let actualTokenIndex = 0;
    matcherTokens.forEach((token, index) => {
        let to = "";
        if (!skipped[index]) {
            to = replaceTokenWith(token, actualTokens[actualTokenIndex], "_capture_to_expected");
            ++actualTokenIndex ;
        }
        if (to !== null) {
            resultText = resultText.split(token._capture).join(to);
        }
    });
    return resultText;
};
const createMessage = ({text, matcherTokens, skipped, actualTokens}) => {
    let resultText = text;
    let actualTokenIndex = 0;
    matcherTokens.forEach((token, index) => {
        let to = "";
        if (!skipped[index]) {
            to = replaceTokenWith(token, actualTokens[actualTokenIndex], "_capture_to_message");
            ++actualTokenIndex ;
        }
        if (to !== null) {
            resultText = resultText.split(token._capture).join(to);
        }
    });
    return resultText;
};

const reporter = (context) => {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const matchAll = createMatchAll(dictionaryList);
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            return tokenize(text).then(currentTokens => {
                /**
                 * @type {MatchResult[]}
                 */
                const matchResults = matchAll(currentTokens);
                matchResults.forEach(matchResult => {
                    const firstToken = matchResult.tokens[0];
                    const lastToken = matchResult.tokens[matchResult.tokens.length - 1];
                    const firstWordIndex = Math.max(firstToken.word_position - 1, 0);
                    const lastWorkIndex = Math.max(lastToken.word_position - 1, 0);
                    // replace $1
                    const message = createMessage({
                        text: matchResult.dict.message,
                        matcherTokens: matchResult.dict.tokens,
                        skipped: matchResult.skipped,
                        actualTokens: matchResult.tokens
                    })
                    + (matchResult.dict.url ? `参考: ${matchResult.dict.url}` : "");
                    const expected = matchResult.dict.expected
                        ? createExpected({
                            text: matchResult.dict.expected,
                            matcherTokens: matchResult.dict.tokens,
                            skipped: matchResult.skipped,
                            actualTokens: matchResult.tokens
                        })
                        : undefined;
                    if (expected) {
                        report(node, new RuleError(message, {
                            index: firstWordIndex,
                            fix: fixer.replaceTextRange([
                                firstWordIndex, lastWorkIndex + lastToken.surface_form.length
                            ], expected)
                        }));
                    } else {
                        report(node, new RuleError(message, {
                            index: firstWordIndex
                        }));
                    }
                });
            });
        }
    }
};
module.exports = {
    linter: reporter,
    fixer: reporter
};
