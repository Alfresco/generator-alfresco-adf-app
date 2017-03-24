'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');

gulp.task('static', function () {
  return gulp.src(['**/*.js', '!**/templates/**', '!**/temp/**'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
  return gulp.src(['app/index.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test-template', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/app-template.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec', timeout: 10000}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('generation-multiple-app-test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/app-different-options-creation.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec', timeout: 1000000}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('default', ['static', 'test-template']);

gulp.task('generation-app-test', ['generation-multiple-app-test']);
