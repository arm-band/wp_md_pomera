/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */

var gulp = require("gulp");
//全般
var plumber = require("gulp-plumber"); //待機
var notify = require("gulp-notify"); //標準出力
//sass
var sass = require("gulp-sass"); //sass
var autoprefixer = require("gulp-autoprefixer");
var json2sass = require("gulp-json-to-sass"); //jsonからsassファイルを生成
//img
var imagemin = require("gulp-imagemin"); //画像ロスレス圧縮
//js
var rename = require("gulp-rename"); //ファイル名変更
//ejs
var ejs = require("gulp-ejs");
var data = require("gulp-data"); //gulp-ejs内でファイル名を参照できるようにする
//file operation
var fs = require("fs");
//reload
var browserSync = require("browser-sync"); //ブラウザリロード

//path difinition
var dir = {
  assets: {
    jquery    : './node_modules/jquery/dist',
    easing    : './node_modules/jquery.easing'
  },
  src: {
    ejs       : './src/ejs',
    md        : './src/content',
    scss      : './src/scss',
    img       : './src/img'
  },
  data: {
    dir       : './src/data',
    variables : '/variables.json',
    commonvar : '/commonvar.json'
  },
  dist: {
    html      : './dist',
    md        : './dist/content',
    css       : './dist/css',
    js        : './dist/js',
    img       : './dist/img',
    favicon   : './dist/favicon'
  }
};
//jsonファイル取得
//ejs内で使用するパラメータ
var getVariables = function() {
    return JSON.parse(fs.readFileSync(dir.data.dir + dir.data.variables, { encoding: "UTF-8" }).replace(/\r|\n|\t/g, ""));
}
//ejs, js, scssにまたがって使用するパラメータ
var getCommonVar = function() {
    return JSON.parse(fs.readFileSync(dir.data.dir + dir.data.commonvar, { encoding: "UTF-8" }).replace(/\r|\n|\t/g, ""));
}

//scssコンパイルタスク
gulp.task("sass", () => {
	return gulp.src(dir.src.scss + "/**/*.scss")
		.pipe(plumber())
        .pipe(json2sass({
            jsonPath: dir.data.dir + dir.data.commonvar,
            scssPath: dir.src.scss + "/util/_var.scss"
        }))
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
            cascade: false
        }))
		.pipe(gulp.dest(dir.dist.css));
});
//watchタスク(Sassファイル変更時に実行するタスク)
gulp.task("sass-watch", () => {
	gulp.watch(dir.src.scss + "/**/*.scss", ["sass"]);
});

//画像圧縮
gulp.task("imagemin", () => {
	gulp.src(dir.src.img + "/**/*.+(jpg|jpeg|png|gif|svg)")
		.pipe(imagemin())
		.pipe(gulp.dest(dir.dist.img));
});

//ejs
gulp.task("ejs", () => {
    var variables = getVariables();
    var commonVar = getCommonVar();
    gulp.src(
        [dir.src.ejs + "/**/*.ejs", "!" + dir.src.ejs + "/**/_*.ejs"] //_*.ejs(パーツ)はhtmlにしない
    )
    .pipe(plumber())
    .pipe(data(function(file) {
        return { "filename": file.path }
    }))
    .pipe(ejs({ variables, commonVar }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(dir.dist.html));
});

//md
gulp.task("md", () => {
    gulp.src(
        [dir.src.md + "/**/*"]
     )
     .pipe(plumber())
    .pipe(gulp.dest(dir.dist.md));
});

//proxy経由
gulp.task("connect-sync", () => {
    browserSync({
        server: {
            baseDir: dir.dist.html
        },
        open: 'external'
    });
});

//gulpのデフォルトタスクで諸々を動かす
gulp.task("default", ["sass", "sass-watch", "ejs", "md", "imagemin", "connect-sync"], () => {
	gulp.watch(dir.src.ejs + "/**/*.ejs", ["ejs"]);
    gulp.watch(dir.src.md + "/**/*.md", ["md"]);
    gulp.watch(dir.src.scss + "/**/*.scss", ["sass"]);
	gulp.watch(dir.src.img + "/**/*.+(jpg|jpeg|png|gif|svg)", ["imagemin"]);
    gulp.watch(dir.data.dir + "/**/*.json", ["ejs", "sass"]);

    gulp.watch([dir.dist.html + "/**/*.html", dir.dist.md + "/**/*.md", dir.dist.css + "/**/*.css", dir.dist.img + "/**/*.+(jpg|jpeg|png|gif|svg)"]).on("change", () => { browserSync.reload(); });
});