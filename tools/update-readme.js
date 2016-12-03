// MIT © 2016 azu
"use strict";
const fs = require("fs");
const path = require("path");
const dict = require("../src/dictionary");
const addMarkdown = require("add-text-to-markdown");
const SectionName = "表現の一覧";
const replaceWithCaptureTokens = (text, tokens) => {
    let resultText = text;
    tokens.forEach((token) => {
        // _capreturがないのは無視
        if (!token._capture) {
            return;
        }
        resultText = resultText.replace(token._capture, token.basic_form);
    });
    return resultText;
};
const createExamples = (dictionaries) => {
    return dictionaries.map((dict) => {
        return `- ${replaceWithCaptureTokens(dict.message, dict.tokens)}` + (dict.url ? `\n  - 参考: ${dict.url}` : "")
    }).join("\n");
};

const README_PATH = path.join(__dirname, "..", "README.md");
const README = fs.readFileSync(README_PATH, "utf-8");
const UpdatedREADM = addMarkdown(README, createExamples(dict), SectionName);
fs.writeFileSync(README_PATH, UpdatedREADM, "utf-8");