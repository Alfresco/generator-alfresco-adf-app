# ADF application generator for Yeoman

An extension for the Yeoman generator to create minimal Alfresco ADF applications.

## Introduction

See the following [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/INTRODUCTION.md) for an introduction to the Alfresco Application Development Framework.

## Prerequisites

Before you start using this development framework and the generator, make sure you have installed all required software and done all the
necessary configuration, see this [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/PREREQUISITES.md).

## Installing Node.js and NPM

Install the LTS (Long-Term Support) version of the Node.js: <https://nodejs.org/en/download/>

### MacOS

You can use the official macOS installer from the <https://nodejs.org/en/download/> page, it includes the NPM as well.

### Ubuntu

Use this article to get details on how to install Node.js and NPM on Ubuntu:
<https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/>

It is important to install the developer tools:

```sh
sudo apt install build-essential
```

### CentOS

Use this article to get details on how to install Node.js and NPM on CentOS:
<https://linuxize.com/post/how-to-install-node-js-on-centos-7/>

It is important to install the developer tools:

```sh
sudo yum install gcc-c++ make
```

## Installing Yeoman

First, install the [Yeoman](http://yeoman.io) tool:

```sh
npm install -g yo
```

## Installing the App Generator

Use the following command to install the Alfresco App Generator for the Yeoman:

```sh
npm install -g generator-alfresco-adf-app
```

To install a specific version, use @ followed by the version.

```sh
npm install -g generator-alfresco-adf-app@WHERSION_YOU_WANT
```

Some tags in the project may not be available in npm. [See available versions for npm](https://www.npmjs.com/package/generator-alfresco-adf-app?activeTab=versions)

## Generating a New Application Project

First, move in the folder where you want create your project.

```sh
yo alfresco-adf-app
```

You will need to run the following scripts in the generated folder:

```sh
npm install
npm start
```

Commands above install all project dependencies, start the project and watch for changes.

Alternatively you can use generator with install switch to trigger automatic installation of dependencies via npm install script:

```sh
yo alfresco-adf-app --install
```

## Activiti 7

For the projects running with Activiti 7 you need to update the **app.config.json** with the list of the apps to use.

For example:

```json
{
  "alfresco-deployed-apps" : [{"name": "simple-app"}]  
}
```

For more information about the app list component refer to the [documentation](https://github.com/Alfresco/alfresco-ng2-components/blob/develop/docs/process-services-cloud/app-list-cloud.component.md)

### Using from the Command Line

You can use the generator in the unattended mode by providing all necessary options from the command line:

```sh
yo ng2-alfresco-app -n app2 -b adf-cli-aps-template -i
```

Options:

| Name | Alias | Type | Description |
| --- | --- | --- | --- |
| --name=\<value> | -n \<value> | string | Application name |
| --blueprint=\<value> | -b \<value> | string | Blueprint name |
| --install | -i | boolean | Install dependencies upon generation |

Default blueprint names:

- adf-cli-acs-aps-template
- adf-cli-acs-template
- adf-cli-aps-template

## Updating Generator

```sh
npm update -g generator-alfresco-adf-app
```

## Getting Current Version

Show current version generator-alfresco-adf-app installed

```sh
npm ls -g generator-alfresco-adf-app
```

## Contributing to the Generator

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make some changes
4. Add the changes to the index: `git add .`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request

To Contribute to the existing code base, add test cases to cover the new behaviour, and make sure all the existing tests are still green.

To test the generator:

```sh
npm test
```

To scaffold app from local changes:

```sh
yo <cloned project path>
```

Example

```sh
yo ../generator-alfresco-adf-app # this generates from the local changes
```

### Extending the Blueprints

In order to add a new blueprint just put the project template to the `app/templates` folder.

Requirements for new projects:

- must contain `package.json` file
- the `package.json` file must contain at least `name` and `version` attributes

### Debugging Generator

```sh
# OS X / Linux
DEBUG=yeoman:generator yo alfresco-adf-app

# Windows
set DEBUG=yeoman:generator & yo alfresco-adf-app
```

More on [debugging generators](http://yeoman.io/authoring/debugging.html).

## History

For detailed changelog, see [Releases](https://github.com/Alfresco/generator-alfresco-adf-app/releases).

## License

[Apache Version 2.0](https://github.com/alfresco/generator-alfresco-adf-app/blob/master/LICENSE)
