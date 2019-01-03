// MIT © 2019 azu
"use strict";
import assert from "assert";

describe('dictionary', function() {
    it("should not have duplicated id", () => {
        const dictionary = require("../src/dictionary.js");
        dictionary.forEach(item => {
            assert.ok(typeof item.id === "string", "should have id property");
            const sameIdItems = dictionary.filter(target => target.id === item.id);
            assert.ok(sameIdItems.length === 1, "should not have duplicated id item");
        });
    });
    it("should have disabled default value", () => {
        const dictionary = require("../src/dictionary.js");
        dictionary.forEach(item => {
            assert.ok(typeof item.disabled === "boolean", `${item} should have disabled property`);
        });
    });
    it("should have allows default value", () => {
        const dictionary = require("../src/dictionary.js");
        dictionary.forEach(item => {
            assert.ok(Array.isArray(item.allows), `${item}: should have disabled property`);
        });
    });
});
