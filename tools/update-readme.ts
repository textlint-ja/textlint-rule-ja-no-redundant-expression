// MIT © 2016 azu
"use strict";
import { Dictionary, ExpectedDictionary, ExpectedToken } from "../src/dictionary";
import fs from "fs";
import path from "path";

const addMarkdown = require("add-text-to-markdown");
const SectionName = "表現の一覧";
const escapeMarkdown = (text: string) => {
    return text.replace(/([\[])/g, "\\$1");
};

/**
 * descriptionがある場合はその内容を返す
 * descriptionはgitの3行目と同じように詳細な解説内容
 * @param dict
 */
const createDescription = (dict: ExpectedDictionary) => {
    return dict.description ? `\n\n${dict.description}\n\n` : "";
};
/**
 * allowsがある場合はその内容を返す
 * @param dict
 */
const createAllows = (dict: ExpectedDictionary) => {
    if (!dict.allows) {
        return "";
    }
    if (!Array.isArray(dict.allows)) {
        return "";
    }
    if (dict.allows.length === 0) {
        return "";
    }
    return `
誤検知を防ぐためにデフォルトでは、"allows"オプションに次のパターンが定義されています。
    
    ${JSON.stringify(dict.allows)}
`;
};
const replaceWithCaptureTokens = (text: string, tokens: ExpectedToken[]) => {
    let resultText = text;
    tokens.forEach(token => {
        // _captureがないのは無視
        if (!token._capture) {
            return;
        }
        if (token._readme) {
            resultText = resultText.split(token._capture).join(escapeMarkdown(token._readme));
        } else if (token.basic_form) {
            resultText = resultText.split(token._capture).join(escapeMarkdown(Array.isArray(token.basic_form) ? token.basic_form[0] : token.basic_form));
        } else {
            resultText = resultText.split(token._capture).join("");
        }
    });
    return resultText;
};
const createExamples = (dictionaries: ExpectedDictionary[]) => {
    return dictionaries
        .map(dict => {
            return (
                `### 【${dict.id}】

${replaceWithCaptureTokens(dict.message, dict.tokens)}${createDescription(dict)}${createAllows(dict)}` +
                (dict.url
                    ? `

**参考:**
 
- ${dict.url}
`
                    : "")
            );
        })
        .join("\n");
};

const README_PATH = path.join(__dirname, "..", "README.md");
const README = fs.readFileSync(README_PATH, "utf-8");
const UpdatedREADM = addMarkdown(README, createExamples(Dictionary), SectionName);
fs.writeFileSync(README_PATH, UpdatedREADM, "utf-8");
