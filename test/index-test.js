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
`,
        // デフォルトの例外
        "プログラムを実行する",
        "テストを行う",
        "テストを行っているとき",
        {
            text: "処理を行う",
            options: {
                dictOptions: {
                    "dict5": {
                        allows: ["処理"]
                    }
                }
            }
        },
        {
            // 辞書を無効化しているのでマッチしない
            text: "これは省略することが可能だが、省略しない。",
            options: {
                dictOptions: {
                    "dict1": {
                        disabled: true
                    }
                }
            }
        }
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
                    message: `【dict1】 "することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 7
                }
            ]
        },
        {
            // disable allows
            text: "テストを行う",
            options: {
                dictOptions: {
                    "dict5": {
                        allows: []
                    }
                }
            },
            errors: [
                {
                    message: `【dict5】 "テストを行う"は冗長な表現です。"テストする"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict5`,
                    index: 0
                }
            ]
        },
        // code + str
        {
            text: "`code`は省略することが可能だが、省略しない。",
            errors: [
                {
                    message: `【dict1】 "することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 9
                }
            ]
        },
        // check
        {
            text: "これは省略することが可能だが、省略しない。",
            errors: [
                {
                    message: `【dict1】 "することが可能だ"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することが可能です。",
            errors: [
                {
                    message: `【dict1】 "することが可能です"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することも可能だ。",
            errors: [
                {
                    message: `【dict1】 "することも可能だ"は冗長な表現です。"することも可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略する事は可能だ。",
            errors: [
                {
                    message: `【dict1】 "する事は可能だ"は冗長な表現です。"する事は可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは，可能だ。",
            errors: [
                {
                    message: `【dict1】 "することは，可能だ"は冗長な表現です。"することは，可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは可能だ。",
            errors: [
                {
                    message: `【dict1】 "することは可能だ"は冗長な表現です。"することは可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        {
            text: "これは省略することは不可能だ。",
            errors: [
                {
                    message: `【dict1】 "することは不可能だ"は冗長な表現です。"することは不可能"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict1`,
                    index: 5
                }
            ]
        },
        // "が"は修正可能
        {
            text: "必要なら解析することができます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `【dict2】 "することができます"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 6
                }
            ]
        },
        {
            text: "必要なら解析することが、できます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `【dict2】 "することが、できます"は冗長な表現です。"することが、"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 6
                }
            ]
        },
        {
            text: "ES5では`class`は予約語であるため、構文エラーとなり実行することはできません。",
            errors: [
                {
                    message: `【dict2】 "することはできませ"は冗長な表現です。"することは"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 32
                }
            ]
        },
        {
            text: "たとえば`window.document`プロパティは、グローバル変数の`document`としてアクセスすることもできます。",
            errors: [
                {
                    message: `【dict2】 "することもできます"は冗長な表現です。"することも"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 53
                }
            ]
        },
        {
            text: "必要なら解析することが,できます。",
            output: "必要なら解析できます。",
            errors: [
                {
                    message: `【dict2】 "することが,できます"は冗長な表現です。"することが,"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 6
                }
            ]
        },
        {
            text: "解析することもできますよ。",
            errors: [
                {
                    message: `【dict2】 "することもできます"は冗長な表現です。"することも"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 2
                }
            ]
        },
        {
            text: "解析することはできますよ。",
            errors: [
                {
                    message: `【dict2】 "することはできます"は冗長な表現です。"することは"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 2
                }
            ]
        },
        {
            text: "解析する事はできますよ。",
            errors: [
                {
                    message: `【dict2】 "する事はできます"は冗長な表現です。"する事は"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 2
                }
            ]
        },

        {
            text: "解析することをできますよ。",
            errors: [
                {
                    message: `【dict2】 "することをできます"は冗長な表現です。"することを"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    index: 2
                }
            ]
        },
        {
            text: "これは必要であると言えます。",
            errors: [
                {
                    message: `【dict3】 "であると言えます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict3`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要であると、言えます。",
            errors: [
                {
                    message: `【dict3】 "であると、言えます"は冗長な表現です。"である" または "と、言えます"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict3`,
                    index: 5
                }
            ]
        },
        {
            text: "これは大切であると考えています",
            output: `これは大切である`,
            errors: [
                {
                    message: `【dict4】 "であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict4`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要で有るといえます。",
            errors: [
                {
                    message: `【dict3】 "で有るといえます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict3`,
                    index: 5
                }
            ]
        },
        {
            text: "これは必要である,と、考えて,います。",
            errors: [
                {
                    message: `【dict4】 "である,と、考えて,いる"は冗長な表現です。"である," または "と、考えて,いる"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict4`,
                    index: 5
                }
            ]
        },
        {
            text: "この関数では、XHRを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示を行っています。",
            output: "この関数では、XHRを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示を行っています。",
            errors: [
                {
                    message: `【dict5】 "表示を行う"は冗長な表現です。"表示する"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict5`,
                    index: 44
                }
            ]
        },
        {
            text: "実験を行えば分かります。",
            errors: [
                {
                    message: `【dict5】 "実験を行う"は冗長な表現です。"実験する"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict5`,
                    index: 0
                }
            ]
        },
        {
            text: "実験を,行えば分かります。",
            errors: [
                {
                    message: `【dict5】 "実験を,行う"は冗長な表現です。"実験する"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict5`,
                    index: 0
                }
            ]
        },
        {
            text: "検査を実行すれば分かります。",
            errors: [
                {
                    message: `【dict6】 "検査を実行"は冗長な表現です。"検査する"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict6`,
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
                    message: `【dict2】 "することができる。"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict2`,
                    line: 1,
                    column: 18
                },
                {
                    message: `【dict5】 "確認を行う"は冗長な表現です。"確認する"など簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict5`,
                    line: 1,
                    column: 49
                },
                {
                    message: `【dict4】 "であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。
解説: https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression#dict4`,
                    line: 1,
                    column: 89
                }
            ]
        }
    ]
});
