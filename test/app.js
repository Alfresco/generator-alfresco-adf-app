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

  it('Can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  describe('Defaults', function () {
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
          alfrescoServerHost: 'http://servertTest:8080/share',
          navigationBar: true,
          drawerBar: true,
          searchBar: true,
          contentPage: true,
          bpmTaskPage: true,
          chartPage: true,
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
        'browser-sync-config.js',
        'typings.json',
        'tslint.json',
        'systemjs.config.js',
        'README.md',
        'index.html',
        '.gitignore',
        '.editorconfig',
        'assets/material.orange-blue.min.css',
        'app/css/muli-font.css',
        'app/css/app.css',
        'app/fonts/Muli-Regular.ttf',
        'app/main.ts',
        'app/app.component.ts',
        'app/app.component.html',
        'app/components/chart/chart.component.ts',
        'app/components/chart/chart.component.html',
        'app/components/tasks/tasks-demo.component.ts',
        'app/components/tasks/activiti.service.ts',
        'app/components/files/files.component.html',
        'app/components/files/files.component.ts',
        'app/components/search/search.component.html',
        'app/components/search/search.component.ts',
        'app/components/search/search-bar.component.html',
        'app/components/search/search-bar.component.ts',
        'app/components/login/login-demo.component.ts',
        'app/components/login/login-demo.component.html',
        'i18n/en.json',
        'i18n/it.json'
      ];
      assert.file(expected);
    });

    it('fill the README with project data', function () {
      assert.fileContent('README.md', 'app-fake');
      assert.fileContent('README.md', 'A awesome alfresco APP');
      assert.fileContent('README.md', 'https://github.com/componentCreatorAccount/app-fake/releases');
    });

    it('fill the app.component.html with project data', function () {
      assert.fileContent('app/app.component.html', 'app-fake');
    });

    it('fill the package.json with project data', function () {
      assert.fileContent('package.json', '"name": "app-fake"');
      assert.fileContent('package.json', '"author": "Alfresco Team"');
      assert.fileContent('package.json', '"description": "A awesome alfresco APP"');
      assert.fileContent('package.json', '"url": "https://github.com/componentCreatorAccount/app-fake/issues"');
      //assert.fileContent('package.json', '"app-keyword"');
    });

    it('fill the app.component.html with the search bar', function () {
      assert.fileContent('app/app.component.html', 'search-bar');
    });

    it('fill the app.component.html with the navigation bar', function () {
      assert.fileContent('app/app.component.html', 'id="navigation-bar"');
    });

    it('fill the app.component.html with the navigation bar', function () {
      assert.fileContent('app/app.component.html', 'id="drawer-bar"');
    });

    it('fill the app.component.ts with the search bar', function () {
      assert.fileContent('app/app.component.ts', 'SearchComponent');
    });

    it('sill the app.component.ts with the files component', function () {
      assert.fileContent('app/app.component.ts', 'FilesComponent');
      assert.fileContent('app/app.component.ts', '\'http://servertTest:8080/share\'');
    });

    it('fill the app.component with the UploadButtonComponent', function () {
      assert.fileContent('app/app.component.ts', 'UploadButtonComponent');
    });

    it('fill the app.component with the UploadService', function () {
      assert.fileContent('app/main.ts', 'UploadService');
      assert.fileContent('app/main.ts', 'ng2-alfresco-upload');
    });

    it('fill the app.component with the TasksDemoComponent', function () {
      assert.fileContent('app/app.component.ts', '/components/tasks/tasks-demo.component');
      assert.fileContent('app/app.component.ts', 'component: TasksDemoComponent');
    });

    it('fill the index.html with pdf library', function () {
      assert.fileContent('index.html', 'pdf.js');
      assert.fileContent('index.html', 'pdf.worker.js');
      assert.fileContent('index.html', 'pdf_viewer.js');
    });

  });

  describe('Not include component', function () {
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
          alfrescoServerHost: 'http://servertTest:8080/share',
          navigationBar: false,
          drawer: false,
          searchBar: false,
          contentPage: false,
          bpmTaskPage: false,
          chartPage: false,
          license: 'MIT'
        })
        .withOptions({'skip-install': true})
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        'app/components/search/search.component.html',
        'app/components/search/search.component.ts',
        'app/components/files/files.component.html',
        'app/components/files/files.component.ts',
        'app/components/tasks/tasks-demo.component.ts',
        'app/components/tasks/activiti.service.ts',
        'app/components/chart/chart.component.ts',
        'app/components/chart/chart.component.html',
        'app/assets/Chart.min.js'
      ];
      assert.noFile(expected);
    });

    it('not fill the app.component.html with the search bar', function () {
      assert.noFileContent('app/app.component.html', 'search-bar');
    });

    it('notfill the app.component.html with the navigation bar', function () {
      assert.noFileContent('app/app.component.html', 'id="navigation-bar"');
    });

    it('not fill the app.component.html with the navigation bar', function () {
      assert.noFileContent('app/app.component.html', 'id="drawer-bar"');
    });

    it('not fill the app.component.ts with the search bar', function () {
      assert.noFileContent('app/app.component.ts', 'SearchComponent');
    });

    it('not fill the app.component.ts with the files component', function () {
      assert.noFileContent('app/app.component.ts', 'FilesComponent');
    });

    it('not fill the app.component.ts with the UploadButtonComponent', function () {
      assert.noFileContent('app/app.component.ts', 'UploadButtonComponent');
    });

    it('not fill the app.main.ts with the UploadService', function () {
      assert.noFileContent('app/main.ts', 'UploadService');
      assert.noFileContent('app/main.ts', 'ng2-alfresco-upload');
    });

    it('not fill the app.component.ts with the TasksDemoComponent', function () {
      assert.noFileContent('app/app.component.ts', '/components/tasks/tasks-demo.component');
      assert.noFileContent('app/app.component.ts', 'component: TasksDemoComponent');
    });

    it('not fill the app.component.ts with the ChartComponent', function () {
      assert.noFileContent('app/app.component.ts', '/components/chart/chart.component');
      assert.noFileContent('app/app.component.ts', 'component: ChartComponent');
    });

    it('not fill the index.html with pdf library', function () {
      assert.noFileContent('index.html', 'psf.js');
      assert.noFileContent('index.html', 'pdf.worker..js');
      assert.noFileContent('index.html', 'pdf_viewer.js');
    });
  });

});
