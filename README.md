<h1 align="center">Yeoman Generator Angular 2 Alfresco Component</h1>
<p align="center">
  <img title="yeoman generator" src='https://github.com/yeoman/media/blob/master/optimized/yeoman-150x150-opaque.png' alt='yeoman logo'  />
</p>
<p align="center">
  <a title='Build Status' href="https://travis-ci.com/Alfresco/generator-ng2-alfresco-app">
    <img src='https://travis-ci.com/Alfresco/generator-ng2-alfresco-app.svg?token=FPzV2wyyCU8imY6wHR2B&branch=master' alt='Build Status'  />
  </a>
  <a href='https://github.com/Alfresco/generator-ng2-alfresco-app/blob/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='license' />
  </a>
  <a alt='downloads stats' href='https://npmjs.org/package/generator-ng2-alfresco-app'>
    <img src='https://img.shields.io/npm/dm/generator-ng2-alfresco-app.svg' alt='downloads stats' />
  </a>
  <a href="https://nodei.co/npm/generator-ng2-alfresco-app/">
    <img src="http://img.shields.io/npm/v/generator-ng2-alfresco-app.svg" alt='npm version' >
  </a>
</p>

>Yeoman generator generating a Angular2 Alfresco App scaffold

## Introduction

See the following [page](https://github.com/Alfresco/app-dev-framework/blob/master/Introduction.md) for an introduction to the Alfresco Application Development Framework. 

## Prerequisites

Before you start using this development framework and the generator, make sure you have installed all required software and done all the 
necessary configuration, see this [page](https://github.com/Alfresco/app-dev-framework/blob/master/Prerequisites.md).

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

Which will generate the following project structure:

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

And run `npm install` for you to fetch all dependencies.

## Develop command list 

* To test your project

    ```sh
    $ npm run test
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ npm run build
    ```

* To provide a live demo

    ```sh
    $ npm run deploy
    ```
    
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

For detailed changelog, see [Releases](https://github.com/Alfresco/generator-ng2-alfresco-app/releases).

## Contributors

Contributor | GitHub profile | Twitter profile |
--- | --- | ---
Eugenio Romano (contributor)| [Eugenio Romano](https://github.com/eromano) | [@RomanoEugenio](https://twitter.com/RomanoEugenio)

All contributors [contributors](https://github.com/alfresco/generator-ng2-alfresco-app/graphs/contributors).

 * 2016-06-17  v0.0.14 Angular RC2
 * 2016-06-03  v0.0.13 Angular Beta  

## License
[MIT](https://github.com/alfresco/generator-ng2-alfresco-app/blob/master/LICENSE)
 
