// MIT © 2016 azu
"use strict";
const fs = require("fs");
const path = require("path");
const dict = require("../src/dictionary");
const addMarkdown = require("add-text-to-markdown");
const SectionName = "表現の一覧";
const escapeMarkdown = (text) => {
    return text.replace(/([\[])/g, "\\$1");
};

/**
 * descriptionがある場合はその内容を返す
 * descriptionはgitの3行目と同じように詳細な解説内容
 * @param dict
 */
const createDescription = (dict) => {
    return dict.description ? `\n\n${dict.description}` : ""
};
const replaceWithCaptureTokens = (text, tokens) => {
    let resultText = text;
    tokens.forEach(token => {
        // _captureがないのは無視
        if (!token._capture) {
            return;
        }
        if (token._readme) {
            resultText = resultText.split(token._capture).join(escapeMarkdown(token._readme));
        } else if (token.basic_form) {
            resultText = resultText.split(token._capture).join(escapeMarkdown(token.basic_form));
        } else {
            resultText = resultText.split(token._capture).join("");
        }
    });
    return resultText;
};
const createExamples = dictionaries => {
    return dictionaries
        .map(dict => {
            return (
                `### 【${dict.id}】

${replaceWithCaptureTokens(dict.message, dict.tokens)}${createDescription(dict)}` +
                (dict.url
                 ? `
- 参考: ${dict.url}
`
                 : "")
            );
        })
        .join("\n");
};

const README_PATH = path.join(__dirname, "..", "README.md");
const README = fs.readFileSync(README_PATH, "utf-8");
const UpdatedREADM = addMarkdown(README, createExamples(dict), SectionName);
fs.writeFileSync(README_PATH, UpdatedREADM, "utf-8");
