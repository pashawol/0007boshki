"use strict";

// module.paths = module.paths.concat(module.parent.paths);


var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    removeComments = require('gulp-strip-css-comments'),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    rigger = require("gulp-rigger"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    run = require("run-sequence"),
    rimraf = require("rimraf"),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require("browser-sync"),
    csso = require('gulp-csso'),
    cache = require('gulp-cached');

// cssbeautify = require("gulp-cssbeautify"),
// versionAppend = require('gulp-version-append'),
// imagemin = require("gulp-imagemin"),

// changed = require('gulp-changed'),
// sftp = require('gulp-sftp');


/* Paths to source/build/watch files
=========================*/

var path = {
    build: {
        // html: "build/",
        // fonts: "build/fonts"
        js: "build/js",
        // img: "images/",
        css: "build/css"
    },
    src: {
        html: "*.{htm,html}",
        js: "js/*.js",
        css: "scss/style.scss"
        // img: "images/**/*.*",
        // fonts: "fonts/**/*.*"
    },
    watch: {
        html: "*.{htm,html}",
        js: "js/**/*.js",
        css: "scss/**/*.scss"
        // img: "images/**/*.*",
        // fonts: "fonts/**/*.*"
    },
    clean: "./build"
};



/* Webserver config
=========================*/

var config = {
    server: "",
    notify: false,
    open: true,
    ui: false
};



/* Tasks
=========================*/



gulp.task("webserver", function () {
    webserver(config);
});


gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(webserver.reload({
            stream: true
        }));
});


gulp.task("css:build", function () {
    return gulp.src(path.src.css)
        .pipe(plumber())
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 5 versions"]
        }))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        // .pipe(csso({
        //     restructure: false
        //     // sourceMap: true,
        //     // debug: true
        // }))
        // .pipe(sourcemaps.write(path.build.css))
        // .pipe(removeComments())
        .pipe(rename("style.min.css"))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({
            stream: true
        }));
});


gulp.task("js:build", function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        // .pipe(rename("main.min.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({
            stream: true
        }));
});


// gulp.task("fonts:build", function() {
//     gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.build.fonts));
// });


// gulp.task("image:build", function () {
//     gulp.src(path.src.img)
//         .pipe(imagemin({
//             optimizationLevel: 3,
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             interlaced: true
//         }))
//         .pipe(gulp.dest(path.build.img));
// });


gulp.task("clean", function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('build', function (cb) {
    run(
        "clean",
        // 'sass',
        "css:build",
        "js:build"
        // "upload"
        // "html:build"
        // "fonts:build"
        // "image:build"

        , cb);


});


gulp.task("watch", function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start("css:build");
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start("js:build");
    });


    // watch([path.watch.css, path.watch.js], function(event, cb) {
    //     gulp.start("upload");
    // });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start("image:build");
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start("fonts:build");
    // });
});


//
// gulp.task('upload', function() {
//
//
//     return gulp.src('build/**/*')
//         .pipe(changed(path.build.js, path.build.css))
//         .pipe(sftp({
//             host: host,
//             user: user,
//             pass: pass,
//             remotePath: remotePath
//         }))
// });


gulp.task("default", function (cb) {
    run(
        "clean",
        "build",
        "watch",
        // 'sass'
        "webserver", cb);
});
