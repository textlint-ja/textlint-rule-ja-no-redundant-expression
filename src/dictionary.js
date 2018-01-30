// MIT © 2016 azu
"use strict";
module.exports = [
    {
        // https://azu.github.io/morpheme-match/?text=省略(することが可能)。
        message: `"することが可能$1"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。`,
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
                "surface_form": "が",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "が",
                "reading": "ガ",
                "pronunciation": "ガ"
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
        message: `"することが$1$2"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。`,
        url: "http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0",
        expected: "$1$2",
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
                "surface_form": "が",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "が",
                "reading": "ガ",
                "pronunciation": "ガ"
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
        message: `"確認を行わなければ"は冗長な表現です。"確認しなければ"など簡潔な表現にすると文章が明瞭になります。`,
        url: "http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html",
        tokens: [
            {
                "surface_form": "確認",
                "pos": "名詞",
                "pos_detail_1": "サ変接続",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "確認",
                "reading": "カクニン",
                "pronunciation": "カクニン"
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
                "surface_form": "行わ",
                "pos": "動詞",
                "pos_detail_1": "自立",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "五段・ワ行促音便",
                "conjugated_form": "未然形",
                "basic_form": "行う",
                "reading": "オコナワ",
                "pronunciation": "オコナワ"
            },
            {
                "surface_form": "なけれ",
                "pos": "助動詞",
                "pos_detail_1": "*",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "特殊・ナイ",
                "conjugated_form": "仮定形",
                "basic_form": "ない",
                "reading": "ナケレ",
                "pronunciation": "ナケレ"
            },
            {
                "surface_form": "ば",
                "pos": "助詞",
                "pos_detail_1": "接続助詞",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "ば",
                "reading": "バ",
                "pronunciation": "バ"
            }
        ]
    }
];
