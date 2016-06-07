'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var askName = require('inquirer-npm-name');
var githubUsername = require('github-username');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

function makeComponentName(name) {
  name = _.kebabCase(name);
  return name;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the awesome angular 2 component generator!'
    ));

    askName({
      name: 'projectName',
      message: 'What\'s the name of your component?',
      default: makeComponentName(path.basename(process.cwd())),
      filter: makeComponentName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      this.props.projectName = name;
      done();
    }.bind(this));
  },

  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'description',
      message: 'How would you describe the element?'
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      filter: function (words) {
        return words.split(/\s*,\s*/g);
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);
      done();
    }.bind(this));
  },

  askForGithubAccount: function () {
    var done = this.async();

    if (validateEmail(this.props.authorEmail)) {
      githubUsername(this.props.authorEmail, function (err, username) {
        if (err) {
          username = username || '';
        }

        var prompts = [{
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }];

        this.prompt(prompts, function (props) {
          this.props = _.extend(this.props, props);
          done();
        }.bind(this));
      }.bind(this));
    } else {
      done();
    }
  },

  writing: function () {
    this.props.projectNameCamelCase = _.chain(this.props.projectName).camelCase().upperFirst();

    this.fs.copy(
      this.templatePath('_typings.json'),
      this.destinationPath('typings.json')
    );

    this.fs.copy(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('_systemjs.config.js'),
      this.destinationPath('systemjs.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.props.projectName,
        description: this.props.description,
        githubAccount: this.props.githubAccount
      }
    );

    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('_.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        description: this.props.description,
        authorName: this.props.authorName,
        githubAccount: this.props.githubAccount
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props.keywords.push('alfresco-component');

    var pkg = _.extend({
      keywords: this.props.keywords
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.composeWith('license', {
      options: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      }
    }, {
      local: require.resolve('generator-license/app')
    });

  },

  writeApp: function () {
    this.fs.copy(
      this.templatePath('app/_main.ts'),
      this.destinationPath('app/main.ts')
    );

    this.fs.copy(
      this.templatePath('app/_app.component.ts'),
      this.destinationPath('app/app.component.ts')
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.component.html'),
      this.destinationPath('app/app.component.html'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('app/components/login/_login-demo.component.ts'),
      this.destinationPath('app/components/login/login-demo.component.ts')
    );

    this.fs.copy(
      this.templatePath('app/components/router/_AuthRouterOutlet.ts'),
      this.destinationPath('app/components/router/AuthRouterOutlet.ts')
    );
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
