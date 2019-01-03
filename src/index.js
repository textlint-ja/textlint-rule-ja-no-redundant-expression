// MIT © 2016 azu
"use strict";
import { wrapReportHandler } from "textlint-rule-helper";
import StringSource from "textlint-util-to-string";

const tokenize = require("kuromojin").tokenize;
const dictionaryList = require("./dictionary");
const createMatchAll = require("morpheme-match-all");

const replaceAll = (text, from, to) => {
    return text.split(from).join(to);
};

const replaceTokenWith = (matcherToken, actualToken, specialTo) => {
    if (matcherToken[specialTo]) {
        return matcherToken[specialTo](actualToken);
    }
    return actualToken.surface_form;
};
const createExpected = ({ text, matcherTokens, skipped, actualTokens }) => {
    let resultText = text;
    let actualTokenIndex = 0;
    matcherTokens.forEach((token, index) => {
        if (skipped[index]) {
            resultText = replaceAll(resultText, token._capture, "");
            return;
        }
        if (token._capture) {
            const to = replaceTokenWith(token, actualTokens[actualTokenIndex], "_capture_to_expected");
            resultText = replaceAll(resultText, token._capture, to);
        }
        ++actualTokenIndex;
    });
    return resultText;
};
const createMessage = ({ text, matcherTokens, skipped, actualTokens }) => {
    let resultText = text;
    let actualTokenIndex = 0;
    matcherTokens.forEach((token, index) => {
        if (skipped[index]) {
            resultText = replaceAll(resultText, token._capture, "");
            return;
        }

        if (token._capture) {
            const to = replaceTokenWith(token, actualTokens[actualTokenIndex], "_capture_to_message");
            resultText = replaceAll(resultText, token._capture, to);
        }
        ++actualTokenIndex;
    });
    return resultText;
};

const reporter = (context, options = {}) => {
    const { Syntax, RuleError, fixer } = context;
    const DefaultOptions = {
        // https://textlint.github.io/docs/txtnode.html#type
        allowNodeTypes: [Syntax.BlockQuote, Syntax.Link, Syntax.ReferenceDef]
    };
    const matchAll = createMatchAll(dictionaryList);
    const skipNodeTypes = options.allowNodeTypes || DefaultOptions.allowNodeTypes;
    return wrapReportHandler(
        context,
        {
            ignoreNodeTypes: skipNodeTypes
        },
        report => {
            return {
                [Syntax.Paragraph](node) {
                    const source = new StringSource(node);
                    const text = source.toString();
                    return tokenize(text).then(currentTokens => {
                        /**
                         * @type {MatchResult[]}
                         */
                        const matchResults = matchAll(currentTokens);
                        matchResults.forEach(matchResult => {
                            const firstToken = matchResult.tokens[0];
                            const lastToken = matchResult.tokens[matchResult.tokens.length - 1];
                            const firstWordIndex = source.originalIndexFromIndex(
                                Math.max(firstToken.word_position - 1, 0)
                            );
                            const lastWordIndex = source.originalIndexFromIndex(
                                Math.max(lastToken.word_position - 1, 0)
                            );
                            // replace $1
                            const message =
                                createMessage({
                                    text: matchResult.dict.message,
                                    matcherTokens: matchResult.dict.tokens,
                                    skipped: matchResult.skipped,
                                    actualTokens: matchResult.tokens
                                }) + (matchResult.dict.url ? `参考: ${matchResult.dict.url}` : "");
                            const expected = matchResult.dict.expected
                                             ? createExpected({
                                    text: matchResult.dict.expected,
                                    matcherTokens: matchResult.dict.tokens,
                                    skipped: matchResult.skipped,
                                    actualTokens: matchResult.tokens
                                })
                                             : undefined;
                            if (expected) {
                                const wordLength = lastToken.surface_form.length;
                                report(
                                    node,
                                    new RuleError(message, {
                                        index: firstWordIndex,
                                        fix: fixer.replaceTextRange(
                                            [firstWordIndex, lastWordIndex + wordLength],
                                            expected
                                        )
                                    })
                                );
                            } else {
                                report(
                                    node,
                                    new RuleError(message, {
                                        index: firstWordIndex
                                    })
                                );
                            }
                        });
                    });
                }
            };
        }
    );
};
module.exports = {
    linter: reporter,
    fixer: reporter
};
