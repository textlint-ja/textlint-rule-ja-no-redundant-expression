const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-ja-no-redundant-expression", rule, {
    valid: [
        // no match
        "text",
        // することができるが正当な文 - http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0#comment-850ec4d194748453a39a
        "人は1人では育つことができない",
        "あいつにだけは絶対抜かれることはできない"
    ],
    invalid: [
        {
            text: "必要なら解析することができます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `"することができ"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 7
                }
            ]
        },
        {
            text: "これは必要であると言えます。",
            errors: [
                {
                    message: `"することができ"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 7
                }
            ]
        },
        //http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html
        {
            text: "このコマンドの後には任意の値を設定することができる。このため、設定した値ごとに、システムの動作の確認を行わなければならない。この作業には時間がかかるため、テスト要員の追加が必要であると考えている。",
            errors: [
                {
                    message: `"することができる"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    line: 1,
                    column: 18
                },
                {
                    message: `"確認を行わなければ"は冗長な表現です。"確認しなければ"など簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    line: 1,
                    column: 49
                },
                {
                    message: `"であると考えている"は冗長な表現です。"と考えている"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    line: 1,
                    column: 89
                }
            ]
        },
    ]
});