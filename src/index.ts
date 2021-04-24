// MIT © 2016 azu
"use strict";
import { matchPatterns } from "@textlint/regexp-string-matcher";
import { wrapReportHandler } from "textlint-rule-helper";
import { StringSource } from "textlint-util-to-string";
import { Dictionary, ExpectedType } from "./dictionary";

import { tokenize, KuromojiToken } from "kuromojin";
import { TextlintRuleModule } from "@textlint/types";
import { createMatcher } from "morpheme-match-all";

/**
 * textの中身をすべて置換する
 * @param {string} text
 * @param {string|undefined} from
 * @param {string} to
 * @returns {string}
 */
const replaceAll = (text: string, from: string | undefined, to: string): string => {
    if (!from) {
        return text;
    }
    return text.split(from).join(to);
};

const replaceTokenWith = (matcherToken: any, actualToken: KuromojiToken, specialTo: string) => {
    if (matcherToken[specialTo]) {
        return matcherToken[specialTo](actualToken);
    }
    return actualToken.surface_form;
};

/**
 * tokensのsurface_formをつなげた文字列を返す
 * @param tokens
 * @returns {string}
 */
const tokensToString = (tokens: KuromojiToken[]) => {
    return tokens.map((token) => token.surface_form).join("");
};

/**
 * "allows" オプションで許可されているかどうか
 * @param {*[]} tokens
 * @param {string[]} allows
 */
const isTokensAllowed = (tokens: KuromojiToken[], allows: string[]) => {
    if (allows.length === 0) {
        return false;
    }
    const matchedText = tokensToString(tokens);
    const allowsMatchResults = matchPatterns(matchedText, allows);
    return allowsMatchResults.length > 0;
};

/**
 * マッチしたtokensを置換した結果の文字列を返す
 * 置換できなかった場合はnullを返す
 * @param {string} expected
 * @param {*[]} matcherTokens
 * @param {boolean[]} skipped
 * @param {*[]} actualTokens
 * @returns {null|string}
 */
const createExpected = ({
    expected,
    matcherTokens,
    skipped,
    actualTokens
}: {
    expected?: string;
    matcherTokens: any[];
    skipped: boolean[];
    actualTokens: KuromojiToken[];
}): null | string => {
    if (!expected) {
        return null;
    }
    let resultText = expected;
    let actualTokenIndex = 0;
    for (let index = 0; index < matcherTokens.length; index++) {
        const token = matcherTokens[index];
        if (skipped[index]) {
            resultText = replaceAll(resultText, token._capture, "");
            continue;
        }
        if (token._capture) {
            const to = replaceTokenWith(token, actualTokens[actualTokenIndex], "_capture_to_expected");
            // _capture_to_expectedが"STOP_REPLACE"を返した場合は置換を取りやめる
            if (to === ExpectedType.STOP_REPLACE) {
                return null;
            }
            resultText = replaceAll(resultText, token._capture, to);
        }
        ++actualTokenIndex;
    }
    return resultText;
};

const createMessage = ({
    id,
    text,
    matcherTokens,
    skipped,
    actualTokens
}: {
    id: string;
    text: string;
    matcherTokens: any[];
    skipped: boolean[];
    actualTokens: KuromojiToken[];
}) => {
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
    return `【${id}】 ${resultText}
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#${id}`;
};

export interface Options {
    // - それぞれの`dict`に対するオプションを指定する
    // - プロパティに`dict`の【dict[id]】を書き、値には次の辞書オプションを指定する
    // - 辞書オプション: `object`
    dictOptions?: {
        [index: string]: {
            disabled?: boolean;
            allows?: string[];
        };
    };
    // - 無視したいNode typeを配列で指定
    // - Node typeは <https://textlint.github.io/docs/txtnode.html#type> を参照
    // - デフォルトでは、`["BlockQuote", "Link", "ReferenceDef", "Code"]`を指定し、引用やリンクのテキストは無視する
}

const reporter: TextlintRuleModule<Options> = (context, options = {}) => {
    const { Syntax, RuleError, fixer } = context;
    const DefaultOptions = {
        // https://textlint.github.io/docs/txtnode.html#type
        allowNodeTypes: [Syntax.BlockQuote, Syntax.Link, Syntax.ReferenceDef, Syntax.Code],
        dictOptions: {}
    };
    const dictOptions = options.dictOptions || DefaultOptions.dictOptions;
    // "disabled": trueな辞書は取り除く
    const enabledDictionaryList = Dictionary.filter((dict) => {
        const dictOption = dictOptions[dict.id] || {};
        const disabled = typeof dictOption.disabled === "boolean" ? dictOption.disabled : dict.disabled;
        return !disabled;
    });
    const matchAll = createMatcher(enabledDictionaryList);
    const skipNodeTypes = options.allowNodeTypes || DefaultOptions.allowNodeTypes;
    return wrapReportHandler(
        context,
        {
            ignoreNodeTypes: skipNodeTypes
        },
        (report) => {
            return {
                [Syntax.Paragraph](node) {
                    const source = new StringSource(node);
                    const text = source.toString();
                    return tokenize(text).then((currentTokens) => {
                        const matchResults = matchAll(currentTokens);
                        matchResults.forEach((matchResult) => {
                            const dictOption = dictOptions[matchResult.dict.id] || {};
                            // "allows" オプションにマッチした場合はエラーを報告しない
                            const allows = dictOption.allows || matchResult.dict.allows;
                            const isAllowed = isTokensAllowed(matchResult.tokens, allows);
                            if (isAllowed) {
                                return;
                            }
                            // エラー報告
                            const firstToken = matchResult.tokens[0];
                            const lastToken = matchResult.tokens[matchResult.tokens.length - 1];
                            const firstWordIndex =
                                source.originalIndexFromIndex(Math.max(firstToken.word_position - 1, 0)) || 0;
                            const lastWordIndex =
                                source.originalIndexFromIndex(Math.max(lastToken.word_position - 1, 0)) || 0;
                            // エラーメッセージ
                            const message = createMessage({
                                id: matchResult.dict.id,
                                text: matchResult.dict.message,
                                matcherTokens: matchResult.dict.tokens,
                                skipped: matchResult.skipped,
                                actualTokens: matchResult.tokens
                            });
                            // 置換結果
                            const expected = createExpected({
                                expected: matchResult.dict.expected,
                                matcherTokens: matchResult.dict.tokens,
                                skipped: matchResult.skipped,
                                actualTokens: matchResult.tokens
                            });
                            const hasFixableResult = expected && tokensToString(matchResult.tokens) !== expected;
                            if (expected && hasFixableResult) {
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
export default {
    linter: reporter,
    fixer: reporter
};
