# &lt;<%= projectName %>&gt;
[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
                   
## About <%= projectName %>
> <%= description %>


## Prerequisites

Before you start using this development framework, make sure you have installed all required software and done all the 
necessary configuration, see this [page](PREREQUISITES.md).

### Building and running

1 Install dependencies

```sh
npm install
```

2 Fast build and watch for dev purposes

```sh
npm start
```

>`start` script also includes live reload and watchers for all the `.ts` files.
TypeScript watchers are also configured for `node_modules` folder within demo shell
and provide live reload for all the component libraries as well.

#### Docker build

A Dockerfile is provided as part of the demo-shell. This can be used to build a local image using the current code
that you have in your development environment. The `node_modules` folder will not be copied over, instead `npm install`
is executed during the build to bring in the required dependencies from the registry, which ensures that you start from
a clean base.

Another advantage is that you do not need to have Node and npm installed locally, since these are already included with the
base image.

    docker build -t demo-shell --rm .
    docker run -it --rm --name demo-shell-ng2 -p 3000 demo-shell

When you are done testing you can remove the image that you created

    docker rmi demo-shell

###Multi-language
To support a new language you need to create your language file (.json) and add it to `i18n/` folder.

```json
{
        "username" : "Username",
        "input-required-message": "Required",
        "input-min-message": "Your username needs to be at least 4 characters.",
        "login-button": "Login"
}
```

Directory structure:
```
.
├── i18n/
│   ├── en.json
│   ├── it.json
│   └── fr.json
```


## History

For detailed changelog, check [Releases](https://github.com/<%= githubAccount %>/<%= projectName %>/releases).

## Contributors

[Contributors](https://github.com/<%= githubAccount %>/<%= projectName %>/graphs/contributors)


[npm-image]: https://badge.fury.io/js/<%= projectName %>.svg
[npm-url]: https://npmjs.org/package/<%= projectName %>
[travis-image]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>
[coveralls-image]: https://coveralls.io/repos/<%= githubAccount %>/<%= projectName %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= githubAccount %>/<%= projectName %>
