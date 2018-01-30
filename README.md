# textlint-rule-ja-no-redundant-expression [![Build Status](https://travis-ci.org/textlint-ja/textlint-rule-ja-no-redundant-expression.svg?branch=master)](https://travis-ci.org/textlint-ja/textlint-rule-ja-no-redundant-expression) [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

冗長な表現を禁止するtextlintルールです。

冗長な表現とは、その文から省いても意味が通じるような表現を示しています。

## 表現の一覧

- "することが可能"は冗長な表現です。"することが可能"を省き簡潔な表現にすると文章が明瞭になります。
  - 参考: <http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0>
- "することができる"は冗長な表現です。"することが"を省き簡潔な表現にすると文章が明瞭になります。
  - 参考: <http://qiita.com/takahi-i/items/a93dc2ff42af6b93f6e0>
- "であると言えます"は冗長な表現です。"である" または "と言えます"を省き簡潔な表現にすると文章が明瞭になります。
  - 参考: <http://www.sekaihaasobiba.com/entry/2014/10/24/204024>
- "であると考えている"は冗長な表現です。"である" または "と考えている"を省き簡潔な表現にすると文章が明瞭になります。
  - 参考: <http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html>
- "確認を行わなければ"は冗長な表現です。"確認しなければ"など簡潔な表現にすると文章が明瞭になります。
  - 参考: <http://www.atmarkit.co.jp/ait/articles/1001/19/news106_2.html>

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
