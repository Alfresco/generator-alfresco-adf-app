<h1 align="center">Yeoman Generator Angular 2 Alfresco Application</h1>
<p align="center">
  <img title="yeoman generator" src='assets/yeoman.png' alt='yeoman logo'  />
</p>
<p align="center">
  <a title='Build Status' href="https://travis-ci.org/Alfresco/generator-ng2-alfresco-app">
    <img src='https://travis-ci.org/Alfresco/generator-ng2-alfresco-app.svg?branch=master' alt='Build Status'  />
  </a>
  <a href='https://codecov.io/gh/Alfresco/generator-ng2-alfresco-app'>
    <img src='https://img.shields.io/codecov/c/github/codecov/generator-ng2-alfresco-app/master.svg?maxAge=2592000' alt='Coverage Status' />
  </a>
  <a href='https://github.com/Alfresco/generator-ng2-alfresco-app/blob/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='license' />
  </a>
  <a alt='downloads stats' href='https://npmjs.org/package/generator-ng2-alfresco-app'>
    <img src='https://img.shields.io/npm/dt/generator-ng2-alfresco-app.svg' alt='downloads stats' />
  </a>
  <a href="https://nodei.co/npm/generator-ng2-alfresco-app/">
    <img src="http://img.shields.io/npm/v/generator-ng2-alfresco-app.svg" alt='npm version' >
  </a>
</p>

>Yeoman generator generating a Angular2 Alfresco App scaffold

## Introduction

See the following [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/INTRODUCTION.md) for an introduction to the Alfresco Application Development Framework. 

## Prerequisites

Before you start using this development framework and the generator, make sure you have installed all required software and done all the 
necessary configuration, see this [page](https://github.com/Alfresco/app-dev-framework/blob/master/PREREQUISITES.md).

## Installing Yeoman and the App Generator

First, install [Yeoman](http://yeoman.io):

```bash
$ npm install -g yo
```

Then the Alfresco Application Generator:
 
```bash
$ npm install -g generator-ng2-alfresco-app
```
 
##  Generating a new application project:

First, move in the folder where you want create your project.

```bash
$ yo ng2-alfresco-app
```

Which will generate the following project structure and run `npm install` for you to fetch all dependencies:

     ├──  browser-sync-config.js
     ├──  typings.json
     ├──  tslint.json
     ├──  systemjs.config.js
     ├──  README.md
     ├──  index.html
     ├──  .gitignore
     ├──  .editorconfig
     ├──  assets/material.orange-blue.min.css
     ├──  app/css/muli-font.css
     ├──  app/fonts/Muli-Regular.ttf
     ├──  app/main.ts
     ├──  app/app.component.ts
     ├──  app/app.component.html
     ├──  app/components/router/_AuthRouterOutlet.ts   
     ├──  app/components/*[Any Component selected in the generator]* 
     └──  app/components/login/login-demo.component.ts


## Building and running command for the generated project

* Start the project and watch for changes

```sh
npm start
```

## Optional utility commands

* Clean the project from node_modules and typings folder

```sh
npm run clean
```

>`start` script also includes live reload and watchers for all the `.ts` files.
TypeScript watchers are also configured for `node_modules` folder within demo shell
and provide live reload for all the component libraries as well.

*  Install dependencies or reinstall after the clean

```sh
npm install
```

## Support Angular Cli

If you are familiar with angular-cli, you can use the following command also inside the generated project.

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp
```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
Component | `ng g component my-new-component`
Directive | `ng g directive my-new-directive`
Pipe      | `ng g pipe my-new-pipe`
Service   | `ng g service my-new-service`
Class     | `ng g class my-new-class`
Interface | `ng g interface my-new-interface`
Enum      | `ng g enum my-new-enum`

If you don't have the angular-cli installed and you want to install it run the following command:

```bash
npm install -g angular-cli
```

## Contributing to the generator

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make some changes 
4. Add the changes to the index: `git add .`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request

>to Contribute to the existing code base Add test cases to cover the new behaviour, and make sure all the existing tests are still green.

* To test the generator 

    ```sh
    $ npm run test
    ```

    
## History

For detailed changelog, see [Releases](https://github.com/Alfresco/generator-ng2-alfresco-app/releases).

## Contributors

Contributor | GitHub profile | Twitter profile |
--- | --- | ---
Eugenio Romano (contributor)| [Eugenio Romano](https://github.com/eromano) | [@RomanoEugenio](https://twitter.com/RomanoEugenio)

All contributors [contributors](https://github.com/alfresco/generator-ng2-alfresco-app/graphs/contributors).

 * 2016-07-11  v0.0.21 Add basic support for generate command of angular-cli
 * 2016-07-01  v0.0.20 Point to a fixed components version 
 * 2016-06-30  v0.0.19 Bug Fixing and update documentation 
 * 2016-06-30  v0.0.18 Angular RC3 
 * 2016-06-17  v0.0.14 Angular RC2
 * 2016-06-03  v0.0.13 Angular Beta  
## License
[Apache Version 2.0](https://github.com/alfresco/generator-ng2-alfresco-app/blob/master/LICENSE)
 
