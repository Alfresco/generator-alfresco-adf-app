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
          blueprint: 'adf-cli-acs-template'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-acs-template');
    });

    it('creates files', () => {
      const expected = [
        '.editorconfig',
        'angular.json',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'proxy.conf.js',
        'tsconfig.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.html',
        'src/app/documents/documents.component.html',
        'src/app/documents/documents.component.ts'
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
          blueprint: 'adf-cli-aps-template'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-aps-template');
    });

    it('creates files', () => {
      const expected = [
        'angular.json',
        '.editorconfig',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'proxy.conf.js',
        'tsconfig.json',
        'tslint.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.html',
        'src/app/task-details/task-details.component.html',
        'src/app/task-details/task-details.component.ts',
        'src/app/tasks/tasks.component.html',
        'src/app/tasks/tasks.component.ts'
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
          blueprint: 'adf-cli-acs-aps-template'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'adf-cli-acs-aps-template');
    });

    it('creates files', () => {
      const expected = [
        '.editorconfig',
        'angular.json',
        'LICENSE',
        'README.md',
        'karma.conf.js',
        'package.json',
        'proxy.conf.js',
        'tsconfig.json',
        'tslint.json',
        'src/index.html',
        'src/app/home/home.component.ts',
        'src/app/home/home.component.html',
        'src/app/task-details/task-details.component.html',
        'src/app/task-details/task-details.component.ts',
        'src/app/tasks/tasks.component.html',
        'src/app/tasks/tasks.component.ts',
        'src/app/documents/documents.component.html',
        'src/app/documents/documents.component.ts'
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
