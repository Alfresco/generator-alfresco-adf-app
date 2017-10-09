# ADF application generator for Yeoman

[![npm](https://img.shields.io/npm/v/generator-ng2-alfresco-app)](https://www.npmjs.com/package/generator-ng2-alfresco-app)
[![Build Status](https://travis-ci.org/Alfresco/generator-ng2-alfresco-app.svg?branch=master)](https://travis-ci.org/Alfresco/generator-ng2-alfresco-app)

> Yeoman generator generating a ADF Angular Alfresco App scaffold

## Introduction

See the following [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/INTRODUCTION.md) for an introduction to the Alfresco Application Development Framework.

## Prerequisites

Before you start using this development framework and the generator, make sure you have installed all required software and done all the
necessary configuration, see this [page](https://github.com/Alfresco/app-dev-framework/blob/master/PREREQUISITES.md).

## Installing Yeoman and the App Generator

First, install [Yeoman](http://yeoman.io):

```sh
npm install -g yo
```

Then the Alfresco Application Generator:

```sh
npm install -g generator-ng2-alfresco-app
```

## Generating a new application project

First, move in the folder where you want create your project.

```sh
yo ng2-alfresco-app
```

You will need to run the following scripts in the generated folder:

```sh
npm install
npm start
```

Commands above install all project dependencies, start the project and watch for changes.

Alternatively you can use generator with install switch to trigger automatic installation of dependencies via npm install script:

```sh
yo ng2-alfresco-app --install
```

## Updating generator

```sh
npm update -g generator-ng2-alfresco-app
```

## Getting current version

* Show current version generator-ng2-alfresco-app installed

```sh
yo ng2-alfresco-app --version
```

## Contributing to the generator

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make some changes
4. Add the changes to the index: `git add .`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request

> to Contribute to the existing code base Add test cases to cover the new behaviour, and make sure all the existing tests are still green.

To test the generator:

```sh
npm test
```

### Extending the blueprints

In order to add a new blueprint just put the project template to the `app/templates` folder.

Requirements for new projects:

* must contain `package.json` file
* the `package.json` file must contain at least `name` and `version` attributes

### Debugging generator

```sh
# OS X / Linux
DEBUG=yeoman:generator yo ng2-alfresco-app

# Windows
set DEBUG=yeoman:generator & yo ng2-alfresco-app
```

More on [debugging generators](http://yeoman.io/authoring/debugging.html).

## History

For detailed changelog, see [Releases](https://github.com/Alfresco/generator-ng2-alfresco-app/releases).

## License

[Apache Version 2.0](https://github.com/alfresco/generator-ng2-alfresco-app/blob/master/LICENSE)
