# textlint-rule-ja-no-redundant-expression [![test](https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression/actions/workflows/test.yml/badge.svg)](https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression/actions/workflows/test.yml)

冗長な表現を禁止するtextlintルールです。

冗長な表現とは、その文から省いても意味が通じるような表現を示しています。

## 表現の一覧

### 【dict1】

"すること\[助詞](不)可能"は冗長な表現です。"すること\[助詞]"を省き簡潔な表現にすると文章が明瞭になります。

**参考:**

- <http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0>

### 【dict2】

"すること\[助詞]できる"は冗長な表現です。"すること\[助詞]"を省き簡潔な表現にすると文章が明瞭になります。

**参考:**

- <http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0>

### 【dict3】

"であると言えます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。

**参考:**

- <https://web.archive.org/web/20170608111205/http://www.sekaihaasobiba.com/entry/2014/10/24/204024>

### 【dict4】

"であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。

**参考:**

- <http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html>

### 【dict5】

"\[サ変名詞]を行う"は冗長な表現です。"\[サ変名詞]する"など簡潔な表現にすると文章が明瞭になります。

[サ変名詞]とは「[名詞]する」というように「する」が後ろについた場合に、動詞の働きをする名詞です。

例）「行動（する）」、「プログラム（する）」

誤検知を防ぐためにデフォルトでは、"allows"オプションに次のパターンが定義されています。

    ["/^処理を行[ぁ-ん]/","/^[ァ-ヶ]+を.?行[ぁ-ん]/","/^[a-zA-Z]+を.?行[ぁ-ん]/"]

**参考:**

- <http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html>

### 【dict6】

"\[サ変名詞]を実行"は冗長な表現です。"\[サ変名詞]する"など簡潔な表現にすると文章が明瞭になります。

[サ変名詞]とは「[名詞]する」というように「する」が後ろについた場合に、動詞の働きをする名詞です。

例）「行動（する）」、「プログラム（する）」

誤検知を防ぐためにデフォルトでは、"allows"オプションに次のパターンが定義されています。

    ["/^処理を実行/","/^[ァ-ヶ]+を.?実行/","/^[a-zA-Z]+を.?実行/"]

**参考:**

- <http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html>

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-no-redundant-expression

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-no-redundant-expression": true
    }
}
```

Via CLI

    textlint --rule ja-no-redundant-expression README.md

## Options

- `allowNodeTypes`: `string[]`
  - 無視したいNode typeを配列で指定
  - Node typeは <https://textlint.github.io/docs/txtnode.html#type> を参照
  - デフォルトでは、`["BlockQuote", "Link", "ReferenceDef", "Code"]`を指定し、引用やリンクのテキストは無視する
- `dictOptions`: `object`
  - それぞれの`dict`に対するオプションを指定する
  - プロパティに`dict`の【dict[id]】を書き、値には次の辞書オプションを指定する
    - 辞書オプション: `object`
      - `disabled`: `boolean`
        - `true`を指定するdictを無効化
      - `allows`: `string[]`
        - エラーを無視したいパターンを[正規表現ライクな文字列](https://github.com/textlint/regexp-string-matcher)で指定

例) [dict1](#dict1)は無効化、[dict5](#dict5)で"議論を行う"をエラーにしない。

```json5
{
    "rules": {
        "ja-no-redundant-expression": {
            "dictOptions": {
                "dict1": {
                     "disabled": true
                },
                "dict5": {
                    // "議論を行う" を許可する
                    allows: [
                        "/^議論を行う/",
                        // デフォルトの許可リストは上書きされるので、維持したい場合は追加する
                        "/^処理を行[ぁ-ん]/",
                        "/^[ァ-ヶ]+を.?行[ぁ-ん]/",
                        "/^[a-zA-Z]+を.?行[ぁ-ん]/"
                    ]
                }
            }
        }
    }
}
```

## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression/releases).

## 参考文献

- [「することができる」は有害と考えられる - Qiita](http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0#comment-850ec4d194748453a39a)
- [読みやすい文章を書くために心がけたい１０のポイント - クソログ](http://www.sekaihaasobiba.com/entry/2014/10/24/204024)
- [誰にでも分かるSEのための文章術（6）：読みやすい文章の極意は「修飾語」にあり (2/2) - ＠IT](http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html)

## 類似ルール

- [textlint-ja/textlint-rule-ja-no-weak-phrase: 弱い表現の利用を禁止するtextlintルール](https://github.com/textlint-ja/textlint-rule-ja-no-weak-phrase "textlint-ja/textlint-rule-ja-no-weak-phrase: 弱い表現の利用を禁止するtextlintルール")

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
