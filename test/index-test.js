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
        "あいつにだけは絶対抜かれることはできない",
        `> これは省略することが可能だが、省略しない。`, // 引用文はOK
        `[これは省略することが可能](http://example)だが、省略しない。`, // リンクはOK
        `
1. 省略する
2. ことが可能
3. リストはアイテムごとにチェックする
`
    ],
    invalid: [
        // option
        {
            text: "> これは省略することが可能だが、省略しない。",
            options: {
                // すべてをチェックする
                allowNodeTypes: []
            },
            errors: [
                {
                    message: `"することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 7
                }
            ]
        },
        // code + str
        {
            text: "`code`は省略することが可能だが、省略しない。",
            errors: [
                {
                    message: `"することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 9
                }
            ]
        },
        // check
        {
            text: "これは省略することが可能だが、省略しない。",
            errors: [
                {
                    message: `"することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することが可能です。",
            errors: [
                {
                    message: `"することが可能です"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することも可能だ。",
            errors: [
                {
                    message: `"することも可能だ"は冗長な表現です。"することも可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略する事は可能だ。",
            errors: [
                {
                    message: `"する事は可能だ"は冗長な表現です。"する事は可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは，可能だ。",
            errors: [
                {
                    message: `"することは，可能だ"は冗長な表現です。"することは，可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは可能だ。",
            errors: [
                {
                    message: `"することは可能だ"は冗長な表現です。"することは可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは不可能だ。",
            errors: [
                {
                    message: `"することは不可能だ"は冗長な表現です。"することは不可能"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 5
                }
            ]
        },
        {
            text: "必要なら解析することができます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `"することができます"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 6
                }
            ]
        },
        {
            text: "必要なら解析することが、できます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `"することが、できます"は冗長な表現です。"することが、"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 6
                }
            ]
        },
        {
            text: "必要なら解析することが,できます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `"することが,できます"は冗長な表現です。"することが,"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 6
                }
            ]
        },
        {
            text: "解析することもできますよ。",
            output: "解析もできますよ。",
            errors: [
                {
                    message: `"することもできます"は冗長な表現です。"することも"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 2
                }
            ]
        },
        {
            text: "解析することはできますよ。",
            output: "解析はできますよ。",
            errors: [
                {
                    message: `"することはできます"は冗長な表現です。"することは"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 2
                }
            ]
        },
        {
            text: "解析する事はできますよ。",
            output: "解析はできますよ。",
            errors: [
                {
                    message: `"する事はできます"は冗長な表現です。"する事は"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 2
                }
            ]
        },

        {
            text: "解析することをできますよ。",
            output: "解析できますよ。",
            errors: [
                {
                    message: `"することをできます"は冗長な表現です。"することを"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    index: 2
                }
            ]
        },
        {
            text: "これは必要であると言えます。",
            errors: [
                {
                    message: `"であると言えます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.sekaihaasobiba.com/entry/2014/10/24/204024`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要であると、言えます。",
            errors: [
                {
                    message: `"であると、言えます"は冗長な表現です。"である" または "と、言えます"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.sekaihaasobiba.com/entry/2014/10/24/204024`,
                    index: 5
                }
            ]
        },
        {
            text: "これは大切であると考えています",
            output: `これは大切である`,
            errors: [
                {
                    message: `"であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要で有るといえます。",
            errors: [
                {
                    message: `"で有るといえます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.sekaihaasobiba.com/entry/2014/10/24/204024`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要である,と、考えて,います。",
            errors: [
                {
                    message: `"である,と、考えて,いる"は冗長な表現です。"である," または "と、考えて,いる"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    index: 5
                }
            ]
        },
        {
            text: "実験を行えば分かります。",
            errors: [
                {
                    message: `"実験を行う"は冗長な表現です。"実験する"など簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    index: 0
                }
            ]
        },
        {
            text: "実験を,行えば分かります。",
            errors: [
                {
                    message: `"実験を,行う"は冗長な表現です。"実験する"など簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    index: 0
                }
            ]
        },
        {
            text: "検査を実行すれば分かります。",
            errors: [
                {
                    message: `"検査を実行"は冗長な表現です。"検査する"など簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    index: 0
                }
            ]
        },

        //http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html
        {
            text:
                "このコマンドの後には任意の値を設定することができる。このため、設定した値ごとに、システムの動作の確認を行わなければならない。この作業には時間がかかるため、テスト要員の追加が必要であると考えている。",
            errors: [
                {
                    message: `"することができる。"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。参考: http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0`,
                    line: 1,
                    column: 18
                },
                {
                    message: `"確認を行う"は冗長な表現です。"確認する"など簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    line: 1,
                    column: 49
                },
                {
                    message: `"であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。参考: http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html`,
                    line: 1,
                    column: 89
                }
            ]
        }
    ]
});
