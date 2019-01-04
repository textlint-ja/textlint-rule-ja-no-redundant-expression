// MIT © 2016 azu
"use strict";
const punctuations = ["、", "､", "，", ","];

module.exports = [
    {
        // https://azu.github.io/morpheme-match/?text=省略(することが可能)。
        id: "dict1",
        disabled: false,
        allows: [],
        message: `"する$2$3$4$5$1"は冗長な表現です。"する$2$3$4$5"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0",
        tokens: [
            {
                surface_form: "する",
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "サ変・スル",
                conjugated_form: "基本形",
                basic_form: "する",
                reading: "スル",
                pronunciation: "スル"
            },
            {
                pos: "名詞",
                reading: "コト",
                _capture: "$2",
                _readme: "こと"
            },
            {
                pos: "助詞",
                _capture: "$3",
                _readme: "[助詞]"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$4"
            },
            {
                basic_form: ["可", "可能", "不可能", "不能", "不可"],
                _capture: "$5",
                _readme: "(不)可能"
            },
            {
                pos: "助動詞",
                _capture: "$1"
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=解析(することができます)。
        id: "dict2",
        disabled: false,
        allows: [],
        message: `"する$4$3$5$1$2"は冗長な表現です。"する$4$3$5"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0",
        expected: "$3$1$2",
        tokens: [
            {
                surface_form: "する",
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "サ変・スル",
                conjugated_form: "基本形",
                basic_form: "する",
                reading: "スル",
                pronunciation: "スル"
            },
            {
                pos: "名詞",
                reading: "コト",
                _capture: "$4",
                _readme: "こと"
            },
            {
                pos: "助詞",
                _capture: "$3",
                _capture_to_expected: function(actualToken) {
                    if (actualToken.surface_form === "も") {
                        return "も";
                    } else if (actualToken.surface_form === "は") {
                        return "は";
                    }
                    return "";
                },
                _readme: "[助詞]"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$5"
            },
            {
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                basic_form: "できる",
                _capture: "$1"
            },
            {
                _capture: "$2"
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=必要(であると言えます)
        id: "dict3",
        disabled: false,
        allows: [],
        message: `"で$1$6と$5$2ます"は冗長な表現です。"である$6" または "と$5言えます"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.sekaihaasobiba.com/entry/2014/10/24/204024",
        tokens: [
            {
                surface_form: "で",
                pos: "助動詞",
                pos_detail_1: "*",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "特殊・ダ",
                conjugated_form: "連用形",
                basic_form: "だ",
                reading: "デ",
                pronunciation: "デ"
            },
            {
                reading: "アル",
                _capture: "$1",
                _readme: "ある"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$6"
            },
            {
                surface_form: "と",
                pos: "助詞"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$5"
            },
            {
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "一段",
                conjugated_form: "連用形",
                reading: "イエ",
                pronunciation: "イエ",
                _capture: "$2",
                _readme: "言え"
            },
            {
                surface_form: "ます",
                pos: "助動詞",
                pos_detail_1: "*",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "特殊・マス",
                conjugated_form: "基本形",
                basic_form: "ます",
                reading: "マス",
                pronunciation: "マス"
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=必要(であると考えている)
        id: "dict4",
        disabled: false,
        allows: [],
        message: `"である$7と$5考えて$6いる"は冗長な表現です。"である$7" または "と$5考えて$6いる"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        expected: "である",
        tokens: [
            {
                surface_form: "で",
                pos: "助動詞",
                pos_detail_1: "*",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "特殊・ダ",
                conjugated_form: "連用形",
                basic_form: "だ",
                reading: "デ",
                pronunciation: "デ"
            },
            {
                reading: "アル",
                _capture: "$1",
                _readme: "ある"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$7"
            },
            {
                surface_form: "と",
                pos: "助詞"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$5"
            },
            {
                surface_form: "考え",
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "一段",
                conjugated_form: "連用形",
                basic_form: "考える",
                reading: "カンガエ",
                pronunciation: "カンガエ"
            },
            {
                surface_form: "て",
                pos: "助詞",
                pos_detail_1: "接続助詞",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "*",
                conjugated_form: "*",
                basic_form: "て",
                reading: "テ",
                pronunciation: "テ"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$6"
            },
            {
                pos: "動詞",
                pos_detail_1: "非自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                basic_form: "いる"
            },
            {
                "surface_form": "ます",
                "pos": "助動詞",
                "conjugated_type": "特殊・マス",
                "conjugated_form": "基本形",
                "basic_form": "ます",
                "reading": "マス",
                "pronunciation": "マス",
                _skippable: true
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=動作の(確認を行わなければ)ならない
        id: "dict5",
        disabled: false,
        allows: ["/^[ァ-ヶ]+を.?行う/", "/^[a-zA-Z]+を.?行う/"],
        message: `"$1を$5行う"は冗長な表現です。"$1する"など簡潔な表現にすると文章が明瞭になります。`,
        description: `[サ変名詞]とは「[名詞]する」というように「する」が後ろについた場合に、動詞の働きをする名詞です。

例）「行動（する）」、「プログラム（する）」

誤検知を防ぐためにデフォルトでは、「[カタカナ]を行う」と「[アルファベット]を行う」は"allows"で無視するように定義されています。
`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        tokens: [
            {
                pos: "名詞",
                pos_detail_1: "サ変接続",
                _capture: "$1",
                _readme: "[サ変名詞]"
            },
            {
                surface_form: "を",
                pos: "助詞",
                pos_detail_1: "格助詞",
                pos_detail_2: "一般",
                pos_detail_3: "*",
                conjugated_type: "*",
                conjugated_form: "*",
                basic_form: "を",
                reading: "ヲ",
                pronunciation: "ヲ"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$5"
            },
            {
                pos: "動詞",
                pos_detail_1: "自立",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "五段・ワ行促音便",
                basic_form: "行う"
            }
        ]
    },
    {
        id: "dict6",
        disabled: false,
        allows: ["/^[ァ-ヶ]+を.?実行/", "/^[a-zA-Z]+を.?実行/"],
        message: `"$1を$5実行"は冗長な表現です。"$1する"など簡潔な表現にすると文章が明瞭になります。`,
        description: `[サ変名詞]とは「[名詞]する」というように「する」が後ろについた場合に、動詞の働きをする名詞です。

例）「行動（する）」、「プログラム（する）」

誤検知を防ぐためにデフォルトでは、「[カタカナ]を実行」と「[アルファベット]を実行」は"allows"で無視するように定義されています。
`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        tokens: [
            {
                pos: "名詞",
                pos_detail_1: "サ変接続",
                _capture: "$1",
                _readme: "[サ変名詞]"
            },
            {
                surface_form: "を",
                pos: "助詞",
                pos_detail_1: "格助詞",
                pos_detail_2: "一般",
                pos_detail_3: "*",
                conjugated_type: "*",
                conjugated_form: "*",
                basic_form: "を",
                reading: "ヲ",
                pronunciation: "ヲ"
            },
            {
                surface_form: punctuations,
                _skippable: true,
                _capture: "$5"
            },
            {
                surface_form: "実行",
                pos: "名詞",
                pos_detail_1: "サ変接続",
                pos_detail_2: "*",
                pos_detail_3: "*",
                conjugated_type: "*",
                conjugated_form: "*",
                basic_form: "実行",
                reading: "ジッコウ",
                pronunciation: "ジッコー"
            }
        ]
    }
];
