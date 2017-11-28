'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Alfresco component generator', () => {

  describe('Content Service', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'adf-cli-acs-template',
          blueprint: 'Content Services'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-acs-template');
    });

    it('creates files', () => {
      const expected = [
        '.editorconfig',
        '.angular-cli.json',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'protractor-ci.conf.js',
        'protractor.conf.js',
        'proxy.conf.json',
        'tsconfig.json',
        'tslint.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.css',
        'src/app/home/home.component.html',
        'src/app/home/home.component.spec.ts',
        'src/app/documentlist/documentlist.component.spec.ts',
        'src/app/documentlist/documentlist.component.html',
        'src/app/documentlist/documentlist.component.css',
        'src/app/documentlist/documentlist.component.ts',
        'e2e/app.e2e-spec.ts'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
        name: 'adf-cli-acs-template'
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', 'ADF/ACS Application with Angular CLI');
    });

  });

  describe('Process Service', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'adf-cli-aps-template',
          blueprint: 'Process Services'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-aps-template');
    });

    it('creates files', () => {
      const expected = [
        '.angular-cli.json',
        '.editorconfig',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'protractor-ci.conf.js',
        'protractor.conf.js',
        'proxy.conf.json',
        'tsconfig.json',
        'tslint.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.css',
        'src/app/home/home.component.html',
        'src/app/home/home.component.spec.ts',
        'src/app/task-details/task-details.component.spec.ts',
        'src/app/task-details/task-details.component.html',
        'src/app/task-details/task-details.component.css',
        'src/app/task-details/task-details.component.ts',
        'src/app/tasks/tasks.component.spec.ts',
        'src/app/tasks/tasks.component.html',
        'src/app/tasks/tasks.component.css',
        'src/app/tasks/tasks.component.ts',
        'e2e/app.e2e-spec.ts'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
        name: 'adf-cli-aps-template'
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', 'ADF/APS Application with Angular CLI');
    });

  });

  describe('Process Service and Content Service', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'adf-cli-acs-aps-template',
          blueprint: 'Process and Content Services'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-acs-aps-template');
    });

    it('creates files', () => {
      const expected = [
        '.editorconfig',
        '.angular-cli.json',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'protractor-ci.conf.js',
        'protractor.conf.js',
        'proxy.conf.json',
        'tsconfig.json',
        'tslint.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.css',
        'src/app/home/home.component.html',
        'src/app/home/home.component.spec.ts',
        'src/app/task-details/task-details.component.spec.ts',
        'src/app/task-details/task-details.component.html',
        'src/app/task-details/task-details.component.css',
        'src/app/task-details/task-details.component.ts',
        'src/app/tasks/tasks.component.spec.ts',
        'src/app/tasks/tasks.component.html',
        'src/app/tasks/tasks.component.css',
        'src/app/tasks/tasks.component.ts',
        'src/app/documentlist/documentlist.component.spec.ts',
        'src/app/documentlist/documentlist.component.html',
        'src/app/documentlist/documentlist.component.css',
        'src/app/documentlist/documentlist.component.ts',
        'e2e/app.e2e-spec.ts'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
        name: 'adf-cli-acs-aps-template'
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', 'ADF/APS/ACS Application with Angular CLI');
    });

  });


});
