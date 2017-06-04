<h1 align="center">Yeoman Generator Angular 2 Alfresco Application</h1>
<p align="center">
  <img title="yeoman generator" src='assets/yeoman.png' alt='yeoman logo'  />
</p>
<p align="center">
  <a href="https://nodei.co/npm/generator-ng2-alfresco-app/">
    <img src="http://img.shields.io/npm/v/generator-ng2-alfresco-app.svg" alt='npm version' >
  </a>
  <a title='Build Status' href="https://travis-ci.org/Alfresco/generator-ng2-alfresco-app">
    <img src='https://travis-ci.org/Alfresco/generator-ng2-alfresco-app.svg?branch=master' alt='Build Status'  />
  </a>
  <a href='https://codecov.io/gh/Alfresco/generator-ng2-alfresco-app'>
    <img src='https://img.shields.io/codecov/c/github/Alfresco/generator-ng2-alfresco-app/master.svg?maxAge=2592000' alt='Coverage Status' />
  </a>
  <a alt='downloads stats' href='https://npmjs.org/package/generator-ng2-alfresco-app'>
    <img src='https://img.shields.io/npm/dt/generator-ng2-alfresco-app.svg' alt='downloads stats' />
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

```sh
npm install -g yo
```

Then the Alfresco Application Generator:

```sh
npm install -g generator-ng2-alfresco-app
```

##  Generating a new application project:

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

## Update ADF generator-ng2-alfresco-app

```sh
npm uninstall -g generator-ng2-alfresco-app
npm install -g generator-ng2-alfresco-app
```

## Optional utility commands

* Show current version generator-ng2-alfresco-app installed

```sh
npm list --depth 1 --global generator-ng2-alfresco-app
```

* Link all ADF components locally

```sh
npm run link
```

* Clean the project

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

## Contributing to the generator

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make some changes
4. Add the changes to the index: `git add .`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request

>to Contribute to the existing code base Add test cases to cover the new behaviour, and make sure all the existing tests are still green.

To test the generator:

```sh
npm test
```

To run the integration test of the generator:

```sh
npm run integrations-test
```

those test run the generator and install the app with different options in the tempo folder, because of the download of the npm packages are quite slow

### Debugging generator

```sh
# OS X / Linux
DEBUG=yeoman:generator yo ng2-alfresco-app

# Windows
set DEBUG=yeoman:generator & yo ng2-alfresco-app
```

More on [debugging generators](http://yeoman.io/authoring/debugging.html).

## Advanced options

```sh
yo ng2-alfresco-app --alfresco
```

Typically used for internal purposes and adds the following extras to the generated project structure:

- adds Alfresco license headers to all code files
- configures component `package.json` with additional license checker configurations (devDependencies, scripts, etc.)

## History

For detailed changelog, see [Releases](https://github.com/Alfresco/generator-ng2-alfresco-app/releases).

## Contributors

| Contributor | GitHub profile | Twitter profile |
| --- | --- | ---
| Eugenio Romano | [Eugenio Romano](https://github.com/eromano) | [@RomanoEugenio](https://twitter.com/RomanoEugenio)
| Denys Vuika | [Denys Vuika](https://github.com/denisvuyka) | [@denisvuyka](https://twitter.com/denisvuyka) |
| Mario Romano | [Mario Romano](https://github.com/magemello) | [@MagemelloMario](https://twitter.com/MagemelloMario) |

[See all contributors](https://github.com/alfresco/generator-ng2-alfresco-app/graphs/contributors)

## License

[Apache Version 2.0](https://github.com/alfresco/generator-ng2-alfresco-app/blob/master/LICENSE)
