// MIT © 2019 azu
"use strict";
import assert from "assert";

import { Dictionary } from "../src/dictionary";

describe("dictionary", function () {
    it("should not have duplicated id", () => {
        Dictionary.forEach((item) => {
            assert.strictEqual(typeof item.id, "string", "should have id property");
            const sameIdItems = Dictionary.filter((target) => target.id === item.id);
            assert.ok(sameIdItems.length === 1, "should not have duplicated id item");
        });
    });
    it("should have disabled default value", () => {
        Dictionary.forEach((item) => {
            assert.strictEqual(typeof item.disabled, "boolean", `${item} should have disabled property`);
        });
    });
    it("should have allows default value", () => {
        Dictionary.forEach((item) => {
            assert.ok(Array.isArray(item.allows), `${item}: should have disabled property`);
        });
    });
});
