var gulp        = require('gulp'),
  apidoc      = require('gulp-apidoc'),
  concat      = require('gulp-concat'),
  annotate    = require('gulp-ng-annotate'),
  minifyCss   = require('gulp-minify-css'),
  flatten     = require('gulp-flatten'),
  inject      = require('gulp-inject'),
  plumber     = require('gulp-plumber'),
  runSequence = require('run-sequence'),
  less        = require('gulp-less'),
  bower       = require('gulp-bower'),
  es          = require('event-stream');


  gulp.task('apidoc', function () {
    apidoc.exec({
      src: "./services/",
      dest: "doc/",
      includeFilters: ["apiconst.js", "router.js", "history.js"]
    });
  });

