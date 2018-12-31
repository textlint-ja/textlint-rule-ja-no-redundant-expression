// MIT © 2016 azu
"use strict";
module.exports = [
    {
        // https://azu.github.io/morpheme-match/?text=省略(することが可能)。
        message: `"すること$3可能$1"は冗長な表現です。"すること$3可能"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0",
        tokens: [
            {
                "surface_form": "する",
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "サ変・スル",
                "conjugated_form": "基本形",
                "basic_form": "する",
                "reading": "スル",
                "pronunciation": "スル"
            }, {
                "surface_form": "こと",
                "pos": "名詞",
                "pos_detail_1": "非自立",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "こと",
                "reading": "コト",
                "pronunciation": "コト"
            }, {
                "pos": "助詞",
                "_capture": "$3",
                "_readme": "[助詞]",
            }, {
                "surface_form": "可能",
                "pos": "名詞",
                "pos_detail_1": "形容動詞語幹",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "可能",
                "reading": "カノウ",
                "pronunciation": "カノー"
            }, {
                "pos": "助動詞",
                "_capture": "$1"
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=解析(することができます)。
        message: `"すること$3$1$2"は冗長な表現です。"すること$3"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0",
        expected: "$3$1$2",
        tokens: [
            {
                "surface_form": "する",
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "サ変・スル",
                "conjugated_form": "基本形",
                "basic_form": "する",
                "reading": "スル",
                "pronunciation": "スル"
            },
            {
                "surface_form": "こと",
                "pos": "名詞",
                "pos_detail_1": "非自立",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "こと",
                "reading": "コト",
                "pronunciation": "コト"
            },
            {
                "pos": "助詞",
                "_capture": "$3",
                "_capture_to_expected": function(actualToken) {
                    if (actualToken.surface_form === "も") {
                        return "も"
                    } else if (actualToken.surface_form === "は") {
                        return "は"
                    }
                    return "";
                },
                "_readme": "[助詞]",
            },
            {
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "basic_form": "できる",
                "_capture": "$1"
            },
            {
                "_capture": "$2"
            },
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=必要(であると言えます)
        message: `"であると言えます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.sekaihaasobiba.com/entry/2014/10/24/204024",
        tokens: [
            {
                "surface_form": "で",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "特殊・ダ",
                "conjugated_form": "連用形",
                "basic_form": "だ",
                "reading": "デ",
                "pronunciation": "デ"
            },
            {
                "surface_form": "ある",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "五段・ラ行アル",
                "conjugated_form": "基本形",
                "basic_form": "ある",
                "reading": "アル",
                "pronunciation": "アル"
            },
            {
                "surface_form": "と",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "引用",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "と",
                "reading": "ト",
                "pronunciation": "ト"
            },
            {
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "一段",
                "conjugated_form": "連用形",
                "reading": "イエ",
                "pronunciation": "イエ"
            },
            {
                "surface_form": "ます",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "特殊・マス",
                "conjugated_form": "基本形",
                "basic_form": "ます",
                "reading": "マス",
                "pronunciation": "マス"
            }
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=必要(であると考えている)
        message: `"であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        expected: "である",
        tokens: [
            {
                "surface_form": "で",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "特殊・ダ",
                "conjugated_form": "連用形",
                "basic_form": "だ",
                "reading": "デ",
                "pronunciation": "デ"
            },
            {
                "surface_form": "ある",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "五段・ラ行アル",
                "conjugated_form": "基本形",
                "basic_form": "ある",
                "reading": "アル",
                "pronunciation": "アル"
            },
            {
                "surface_form": "と",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "引用",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "と",
                "reading": "ト",
                "pronunciation": "ト"
            },
            {
                "surface_form": "考え",
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "一段",
                "conjugated_form": "連用形",
                "basic_form": "考える",
                "reading": "カンガエ",
                "pronunciation": "カンガエ"
            },
            {
                "surface_form": "て",
                "pos": "助詞",
                "pos_detail_1": "接続助詞",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "て",
                "reading": "テ",
                "pronunciation": "テ"
            },
            {
                "pos": "動詞",
                "pos_detail_1": "非自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "basic_form": "いる"
            },
        ]
    },
    {
        // https://azu.github.io/morpheme-match/?text=動作の(確認を行わなければ)ならない
        message: `"$1を行う"は冗長な表現です。"$1する"など簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        tokens: [
            {
                "pos": "名詞",
                "pos_detail_1": "サ変接続",
                "_capture": "$1"
            },
            {
                "surface_form": "を",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "を",
                "reading": "ヲ",
                "pronunciation": "ヲ"
            },
            {
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "五段・ワ行促音便",
                "basic_form": "行う",
            }
        ]
    },
    {
        message: `"$1を実行"は冗長な表現です。"$1する"など簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        tokens: [
            {
                "pos": "名詞",
                "pos_detail_1": "サ変接続",
                "_capture": "$1"
            },
            {
                "surface_form": "を",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "を",
                "reading": "ヲ",
                "pronunciation": "ヲ"
            },
            {
                "surface_form": "実行",
                "pos": "名詞",
                "pos_detail_1": "サ変接続",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "実行",
                "reading": "ジッコウ",
                "pronunciation": "ジッコー"
            },
        ]
    }

];
