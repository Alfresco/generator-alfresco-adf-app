'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var os = require('os');

describe('Alfresco component generator', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  after(function () {
    mockery.disable();
  });

  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withPrompts({
          projectName: 'app-fake',
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          license: 'MIT'
        })
        .withOptions({'skip-install': true})
        .on('end', done);
    });

    it('created and CD into a folder named like the component', function () {
      assert.equal(path.basename(process.cwd()), 'app-fake');
    });

    it('creates files', function () {
      var expected = [
        'typings.json',
        'tslint.json',
        'systemjs.config.js',
        'README.md',
        'index.html',
        '.gitignore',
        '.editorconfig',
        'app/main.ts',
        'app/app.component.ts',
        'app/app.component.html',
        'app/components/login/login-demo.component.ts',
        'app/components/router/AuthRouterOutlet.ts'
      ];
      assert.file(expected);
    });

    it('fills the README with project data', function () {
      assert.fileContent('README.md', 'app-fake');
      assert.fileContent('README.md', 'A awesome alfresco APP');
      assert.fileContent('README.md', 'https://github.com/componentCreatorAccount/app-fake/releases');
    });

    it('fills the app.component.html with project data', function () {
      assert.fileContent('app/app.component.html', 'app-fake');
    });

    it('fills the package.json with project data', function () {
      assert.fileContent('package.json', '"name": "app-fake"');
      assert.fileContent('package.json', '"author": "Alfresco Team"');
      assert.fileContent('package.json', '"description": "A awesome alfresco APP"');
      assert.fileContent('package.json', '"url": "https://github.com/componentCreatorAccount/app-fake/issues"');
      assert.fileContent('package.json', '"app-keyword"');
    });

  });
});
