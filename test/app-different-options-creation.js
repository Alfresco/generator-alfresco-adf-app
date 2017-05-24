'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var tempDir;

describe('Alfresco Integration test generator', function () {
  before(function () {
    tempDir = path.join(__dirname, '../temp');

    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('Include component', function () {

    it('All', function (done) {

      var nameApp = 'all-options-test';

      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempDir + '/' + nameApp)
        .withPrompts({
          projectName: nameApp,
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [
            'userInfo',
            'drawerBar',
            'searchBar',
            'contentPage',
            'bpmTaskPage'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', ()=> {
          done();
        });
    });

    it('only process service', function (done) {

      var nameApp = 'app-process-service-test';

      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempDir + '/' + nameApp)
        .withPrompts({
          projectName: nameApp,
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [,
            'bpmTaskPage'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', ()=> {
          done();
        });
    });

    it('only search service', function (done) {

      var nameApp = 'app-search-test';

      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempDir + '/' + nameApp)
        .withPrompts({
          projectName: nameApp,
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [
            'searchBar'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', ()=> {
          done();
        });
    });

    it('only document list service', function (done) {

      var nameApp = 'app-document-list-test';

      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempDir + '/' + nameApp)
        .withPrompts({
          projectName: nameApp,
          description: 'A awesome alfresco APP',
          githubAccount: 'componentCreatorAccount',
          authorName: 'Alfresco Team',
          authorEmail: 'Sonikku.Hejjihoggu@alfresco.com',
          authorUrl: 'http://Hejjihoggu.io',
          keywords: ['app-keyword', 'angular2-keyword'],
          alfrescoServerHost: 'http://servertTest:8080/share',
          activitiServerHost: 'http://servertTest:9999/share',
          features: [
            'contentPage'
          ],
          license: 'MIT'
        })
        .on('error', function (error) {
          console.log(error);
        })
        .on('end', ()=> {
          done();
        });
    });

  });
});


