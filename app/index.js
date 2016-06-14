'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var githubUsername = require('github-username');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

function makeAppName(name) {
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
      'Welcome to the awesome angular 2 App generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What\'s the name of your App?',
      default: makeAppName(path.basename(process.cwd())),
      filter: makeAppName
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);
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
      message: 'How would you describe the app?'
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
    }, {
      name: 'alfrescoServerHost',
      message: 'Which is your Alfresco platform server URL?',
      default: 'http://127.0.0.1:8080',
      store: true
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

  askForAlfrescoComponent: function () {
    var done = this.async();

    var prompts = [{
      name: 'navigationBar',
      message: 'Do you want include a navigation bar?',
      type: 'confirm',
      default: true
    }, {
      name: 'drawer',
      message: 'Do you want include a drawer bar?',
      type: 'confirm',
      default: true
    }, {
      name: 'searchBar',
      message: 'Do you want include a search bar?',
      type: 'confirm',
      default: true
    }, {
      name: 'contentPage',
      message: 'Do you want include a Document List?',
      type: 'confirm',
      default: true
    }, {
      name: 'bpmTaskPage',
      message: 'Do you want include a Tasks List?',
      type: 'confirm',
      default: true
    }, {
      name: 'chartPage',
      message: 'Do you want include a sample dashboard?',
      type: 'confirm',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);
      done();
    }.bind(this));
  },

  writing: function () {
    this.props.projectNameCamelCase = _.chain(this.props.projectName).camelCase().upperFirst();

    this.fs.copy(
      this.templatePath('_browser-sync-config.js'),
      this.destinationPath('browser-sync-config.js')
    );

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
        projectName: this.props.projectName,
        contentPage: this.props.contentPage,
        chartPage: this.props.chartPage
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
    this.fs.copyTpl(
      this.templatePath('app/_main.ts'),
      this.destinationPath('app/main.ts'),
      {
        contentPage: this.props.contentPage
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.component.ts'),
      this.destinationPath('app/app.component.ts'),
      {
        projectName: this.props.projectName,
        navigationBar: this.props.navigationBar,
        drawerBar: this.props.drawer,
        searchBar: this.props.searchBar,
        contentPage: this.props.contentPage,
        bpmTaskPage: this.props.bpmTaskPage,
        chartPage: this.props.chartPage,
        alfrescoServerHost: this.props.alfrescoServerHost
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.component.html'),
      this.destinationPath('app/app.component.html'),
      {
        projectName: this.props.projectName,
        navigationBar: this.props.navigationBar,
        drawerBar: this.props.drawer,
        searchBar: this.props.searchBar,
        contentPage: this.props.contentPage,
        bpmTaskPage: this.props.bpmTaskPage,
        chartPage: this.props.chartPage
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

    this.fs.copy(
      this.templatePath('assets/_material.orange-blue.min.css'),
      this.destinationPath('assets/material.orange-blue.min.css')
    );

    this.fs.copy(
      this.templatePath('app/css/_muli-font.css'),
      this.destinationPath('app/css/muli-font.css')
    );

    this.fs.copy(
      this.templatePath('app/css/_app.css'),
      this.destinationPath('app/css/app.css')
    );

    this.fs.copy(
      this.templatePath('app/fonts/_Muli-Regular.ttf'),
      this.destinationPath('app/fonts/Muli-Regular.ttf')
    );

    this.fs.copy(
      this.templatePath('i18n/_en.json'),
      this.destinationPath('i18n/en.json')
    );

    this.fs.copy(
      this.templatePath('i18n/_it.json'),
      this.destinationPath('i18n/it.json')
    );

    if (this.props.searchBar) {
      this.fs.copy(
        this.templatePath('app/components/search/_search.component.html'),
        this.destinationPath('app/components/search/search.component.html')
      );

      this.fs.copy(
        this.templatePath('app/components/search/_search.component.ts'),
        this.destinationPath('app/components/search/search.component.ts')
      );
    }

    if (this.props.contentPage) {
      this.fs.copy(
        this.templatePath('app/components/files/_files.component.html'),
        this.destinationPath('app/components/files/files.component.html')
      );

      this.fs.copy(
        this.templatePath('app/components/files/_files.component.ts'),
        this.destinationPath('app/components/files/files.component.ts')
      );
    }

    if (this.props.bpmTaskPage) {
      this.fs.copy(
        this.templatePath('app/components/tasks/_tasks-demo.component.ts'),
        this.destinationPath('app/components/tasks/tasks-demo.component.ts')
      );

      this.fs.copy(
        this.templatePath('app/components/tasks/_activiti.service.ts'),
        this.destinationPath('app/components/tasks/activiti.service.ts')
      );
    }

    if (this.props.chartPage) {
      this.fs.copy(
        this.templatePath('app/components/chart/_chart.component.ts'),
        this.destinationPath('app/components/chart/chart.component.ts')
      );

      this.fs.copy(
        this.templatePath('app/components/chart/_chart.component.html'),
        this.destinationPath('app/components/chart/chart.component.html')
      );

      this.fs.copy(
        this.templatePath('assets/_Chart.min.js'),
        this.destinationPath('assets/Chart.min.js')
      );
    }
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
