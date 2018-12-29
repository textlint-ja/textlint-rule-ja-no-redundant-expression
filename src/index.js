// MIT © 2016 azu
"use strict";
const tokenize = require("kuromojin").tokenize;
const dictionaryList = require("./dictionary");
const createMatchAll = require("morpheme-match-all");
const replaceWithCaptureTokens = (text, tokens, actualTokens, for_expected) => {
    let resultText = text;
    tokens.forEach((token, index) => {
        // _captureがないのは無視
        if (!token._capture) {
            return;
        }
        let to;
        if (for_expected && token["_capture_to_expected"]) {
            to = token["_capture_to_expected"](actualTokens[index]);
        } else if (!for_expected && token["_capture_to_message"]) {
            to = token["_capture_to_message"](actualTokens[index]);
        } else {
            to = actualTokens[index].surface_form;
        }
        resultText = resultText.split(token._capture).join(to);
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
                    const message = replaceWithCaptureTokens(matchResult.dict.message, matchResult.dict.tokens, matchResult.tokens, false)
                    + (matchResult.dict.url ? `参考: ${matchResult.dict.url}` : "");
                    const expected = matchResult.dict.expected
                        ? replaceWithCaptureTokens(matchResult.dict.expected, matchResult.dict.tokens, matchResult.tokens, true)
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
