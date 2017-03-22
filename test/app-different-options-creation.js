'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var exec = require('child_process').exec;
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

    var installApp = function (nameApp, callback) {
      exec('npm install ', {cwd: path.join(__dirname, `../temp/${nameApp}`)}, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          assert.isNotOk('everything', 'this will fail');
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        callback();
      });
    };

    it.only('All', function (done) {

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
         // installApp(nameApp, done);
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
          installApp(nameApp, done);
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
          installApp(nameApp, done);
        });
    });
  });
});


