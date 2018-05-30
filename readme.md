# Benten

## Abstract

自分用のスライド制作用テンプレートです。Kiribi_Ususamaからフォークしています。

Scss, ejs, gulp使用。

## How to use?

使い方

### Preparement

事前に以下の準備が必要です。

- node.js(7.2.1以上)
    - npm: 以下のライブラリを使用します(主なもののみ記載)
        - browser-sync: 2.18.13
        - gulp: 3.9.1
        - gulp-ejs: 3.0.1
        - gulp-sass: 3.1.0
        - gulp-autoprefixer: 4.1.0
        - jquery: 3.2.1
        - jquery.easing: 1.4.1
        - reveal.js: 3.6.0
        - font-awesome: 4.7.0

### Using

1. `git clone <REPOSITORY_TEMPLATE_URL.git>`でリポジトリのクローンを作成
2. リポジトリ名でディレクトリが作成されるので、ディレクトリ名をプロジェクト名に変更
3. `git clone`するとリモートリポジトリがテンプレート元のパスのままなので、変更する
    1. `git remote rm origin <REPOSITORY_TEMPLATE_URL.git>`で現在のリモートリポジトリを削除
    2. `git remote add origin <REPOSITORY_PROJECT_URL.git>`でプロジェクトのリモートリポジトリを追加
4. `npm i -D`(`npm install --save-dev`のショートカット)で必要なプラグインを揃える
5. `npm run benten`(`npm run proinit`でも良い)で初期設定を行う
6. `gulp`で実行。browser-syncにより、既定のブラウザでページを表示します

## Functions1

gulpで処理されるもの

- ejs → htmlへの変換(`/src/ejs/*.ejs`→`/dist/*.html`)
    - 自動生成
- Scss → cssへの変換(`/src/scss/*.scss`→`/dist/css/*.css`)
    - 自動生成
        - minifyされたものを生成
    - 自動でプレフィックスを付与
        - 基本最新2バージョン
        - `iOS >= 8.1`
        - `Android >= 4.4`
- jsの圧縮(`/src/js/*.js`→`/dist/js/*.min.js`)
    - 自動生成
        - 1つのファイルにminify
- 画像の圧縮(`/src/img/*`→`/dist/img/*`)
    - 自動生成

## Functions2

テンプレートが用意している機能

- Now Loading
- アイキャッチ(高さ100vh, 背景fixed) ※画像は適宜用意
- ページトップへ戻る
- `src/ejs/news/news.json`による新着情報一覧の一元管理(トップページ: `index.ejs`と新着情報一覧: `news.ejs`の2箇所で使用)

## Futures

ejsの使い方をもっとしっかりしていきたい。

- 特にパンくずはテストの為に追加したので柔軟性に欠ける

<del>どうせならばFont Awesomeも混ぜれば良かった。</del>

## Settings

- jsonファイル
    - `variables.json`
        - `commons`:
            - `sitename`: サイト名。タイトルタグやトップページのアイキャッチ、ヘッダのブランド、フッタのコピーライトなど各所に使われます
            - `year`: 年数。フッタのコピーライトで使います
            - `author`: 作者名。フッタのコピーライトで使います
            - `baseurl`: `base`タグの`href`属性に使います
            - `ogpurl`: Twitterカード出力時のサイトURLを指定します
            - `ogpimage`: Twitterカード出力時の画像を指定します
            - `twitteraccount`: Twitterカード出力時のTwitterアカウントを指定します(@マーク抜き)
        - `color`:
            - `main`: メインカラー。アドレスバーの色を指定するテーマカラーで使います
        - `param`:
            - キー名はファイル名と合わせること
                - `title`: ページ名
                - `entitle`: 英語のページ名
                - `css`: 読み込むcssファイルのファイル名。拡張子不要
                - `js`: 読み込むjsファイルのファイル名。拡張子不要
                - `description`: `<meta description="">`に記述される説明
                - `ogpimage`: Twitterカード出力時の画像を指定します
                - `newscount`: `index.ejs`のみ存在。新着情報一覧で出力する新着情報の件数
    - `commonvar.json`
        - 色、ナビゲーションバーの高さなど、基本的な情報をjson形式で記述
        - このjsonからscssの各所で使用している変数の元となる`/src/base/_var.scss`が生成される
        - ※既定で記述されているものはscssやejsで使用しているため、消さないこと
            - `main-color`: scssの他、`/src/ejs/partial/head.ejs`の`meta`タグ、`theme-color`属性の指定で使用

## Release Notes

- 2018/5/30 ver.2.7.7
    - 初版。バージョン番号はKiribi_Ususamaのものを保持し、同じ番号を付けるものとする。