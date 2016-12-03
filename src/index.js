// MIT © 2016 azu
"use strict";
const tokenize = require("kuromojin").tokenize;
const dictionaryList = require("./dictionary");
const createMatchAll = require("morpheme-match-all");
const reporter = (context) => {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const matchAll = createMatchAll(dictionaryList);
    return {
        [Syntax.Str](node){
            const text = getSource(node);
            return tokenize(text).then(currentTokens => {
                /**
                 * @type {MatchResult[]}
                 */
                const matchResults = matchAll(currentTokens);
                matchResults.forEach(matchResult => {
                    const firstToken = matchResult.tokens[0];
                    const firstWordIndex = Math.max(firstToken.word_position - 1, 0);
                    const message = matchResult.dict.message
                        + (matchResult.dict.url ? `参考: ${matchResult.dict.url}` : "");
                    const expected = matchResult.dict.expected;
                    if (expected) {
                        report(node, new RuleError(message, {
                            index: firstWordIndex,
                            fix: fixer.replaceTextRange([
                                firstWordIndex, firstWordIndex + expected.length
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