// MIT © 2016 azu
"use strict";
const fs = require("fs");
const path = require("path");
const dict = require("../src/dictionary");
const addMarkdown = require("add-text-to-markdown");
const SectionName = "表現の一覧";
const createExamples = (dictionaries) => {
    return dictionaries.map((dict) => {
        return `- ${dict.message}` + (dict.url ? `\n  - ${dict.url}` : "")
    }).join("\n");
};

const README_PATH = path.join(__dirname, "..", "README.md");
const README = fs.readFileSync(README_PATH, "utf-8");
const UpdatedREADM = addMarkdown(README, createExamples(dict), SectionName);
fs.writeFileSync(README_PATH, UpdatedREADM, "utf-8");