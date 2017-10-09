'use strict';
var alflogo = require('alfresco-logo');
var yeoman = require('yeoman-generator');
var githubUsername = require('github-username');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function makeGeneratorName (name) {
  return _.kebabCase(name);
}

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {
      licenseHeader: '',
      licenseChecker: false,
      // features
      contentPage: false,
      bpmTaskPage: false
    };

    this.props.licenseHeader = this.fs.read(path.join(__dirname, './alfresco-license-header.ts'));
    if (this.options.alfresco) {
      this.props.licenseChecker = true;
    }
  },

  prompting: function () {
    var done = this.async();

    this.log(alflogo(
      'Welcome to the awesome\nADF Angular app generator\nfor Alfresco!\n',
      {'left-pad': '     '}));

    var prompts = [{
      name: 'projectName',
      message: 'What\'s the name of your App?',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: function (str) {
        return str.length > 0;
      }
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
      message: 'How would you describe the app?',
      default: 'Alfresco Angular 2 Application Example'
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
      message: 'What is your Alfresco platform server URL?',
      default: 'http://127.0.0.1:8080',
      store: true
    }, {
      name: 'activitiServerHost',
      message: 'What is your Activiti platform server URL?',
      default: 'http://127.0.0.1:9999',
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);

      var projectAuthor = this.props.authorName;
      if (this.props.authorEmail) {
        projectAuthor += ' <' + this.props.authorEmail + '>';
      }
      this.props.projectAuthor = projectAuthor;

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

  selectFeatures: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Features',
      choices: [
        {
          name: 'ADF: DocumentList Component',
          value: 'contentPage',
          checked: true
        },
        {
          name: 'ADF: Search Component',
          value: 'searchBar'
        },
        {
          name: 'ADF: Process Services Components',
          value: 'bpmTaskPage'
        }
      ],
      validate: function (answers) {
        if (answers.length < 1) {
          return 'You must choose at least one feature.';
        }
        return true;
      }
    }];

    this.prompt(prompts, function (answer) {
      var props = this.props;
      answer.features.map(function (feature) {
        props[feature] = true;
      });
      done();
    }.bind(this));
  },

  writing: function () {
    this.props.projectNameCamelCase = _.chain(this.props.projectName).camelCase().upperFirst();

    this.fs.copy(
      this.templatePath('favicon-96x96.png'),
      this.destinationPath('favicon-96x96.png')
    );

    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('tsconfig.dev.json'),
      this.destinationPath('tsconfig.dev.json')
    );

    this.fs.copyTpl(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this.props
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app.config-dev.json'),
      this.destinationPath('app.config-dev.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app.config-prod.json'),
      this.destinationPath('app.config-prod.json'),
      this.props
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props.keywords.push('alfresco-component');

    var pkg = _.merge(
      currentPkg,
      {keywords: this.props.keywords}
    );

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
      this.templatePath('app/_theme.scss'),
      this.destinationPath('app/theme.scss'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_main.ts'),
      this.destinationPath('app/main.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_material.module.ts'),
      this.destinationPath('app/_material.module.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_polyfills.ts'),
      this.destinationPath('app/polyfills.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_vendor.ts'),
      this.destinationPath('app/vendor.ts'),
      this.props
    );


    this.fs.copyTpl(
      this.templatePath('app/components/_index.ts'),
      this.destinationPath('app/components/index.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/_index.ts'),
      this.destinationPath('app/components/index.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.module.ts'),
      this.destinationPath('app/app.module.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.component.ts'),
      this.destinationPath('app/app.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.component.html'),
      this.destinationPath('app/app.component.html'),
      this.props
    );

    this.fs.copy(
      this.templatePath('app/components/about/_about.component.css'),
      this.destinationPath('app/components/about/about.component.css')
    );

    this.fs.copy(
      this.templatePath('app/components/about/_about.component.html'),
      this.destinationPath('app/components/about/about.component.html')
    );

    this.fs.copyTpl(
      this.templatePath('app/components/about/_about.component.ts'),
      this.destinationPath('app/components/about/about.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/login/_login-demo.component.ts'),
      this.destinationPath('app/components/login/login-demo.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/login/_login-demo.component.html'),
      this.destinationPath('app/components/login/login-demo.component.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/login/_login-demo.component.css'),
      this.destinationPath('app/components/login/login-demo.component.css'),
      this.props
    );

    this.directory('public', 'public');
    this.directory('config', 'config');
    this.directory('resources', 'resources');
    this.directory('app/services', 'app/services');

    this.directory('app/components/form', 'app/components/form');

    if (this.props.licenseChecker) {
      this.fs.copy(
        this.templatePath('assets/_license_header.txt'),
        this.destinationPath('assets/license_header.txt')
      );
    }

    this.fs.copy(
      this.templatePath('app/components/home/_home.component.scss'),
      this.destinationPath('app/components/home/home.component.scss')
    );

    this.fs.copyTpl(
      this.templatePath('app/components/home/_home.component.html'),
      this.destinationPath('app/components/home/home.component.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/home/_home.component.spec.ts'),
      this.destinationPath('app/components/home/home.component.spec.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/home/_home.component.ts'),
      this.destinationPath('app/components/home/home.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_material.module.ts'),
      this.destinationPath('app/material.module.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.routes.ts'),
      this.destinationPath('app/app.routes.ts'),
      this.props
    );

    this.fs.copy(
      this.templatePath('app/components/search/_search.component.html'),
      this.destinationPath('app/components/search/search.component.html')
    );

    this.fs.copy(
      this.templatePath('app/components/search/_search.component.scss'),
      this.destinationPath('app/components/search/search.component.scss')
    );

    this.fs.copyTpl(
      this.templatePath('app/components/search/_search.component.ts'),
      this.destinationPath('app/components/search/search.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/search/_search-bar.component.ts'),
      this.destinationPath('app/components/search/search-bar.component.ts'),
      this.props
    );

    this.fs.copy(
      this.templatePath('app/components/search/_search-bar.component.html'),
      this.destinationPath('app/components/search/search-bar.component.html')
    );

    this.fs.copy(
      this.templatePath('app/components/setting/_settings.component.scss'),
      this.destinationPath('app/components/setting/settings.component.scss')
    );

    this.fs.copy(
      this.templatePath('app/components/setting/_settings.component.html'),
      this.destinationPath('app/components/setting/settings.component.html')
    );

    this.fs.copyTpl(
      this.templatePath('app/components/setting/_settings.component.ts'),
      this.destinationPath('app/components/setting/settings.component.ts'),
      this.props
    );

    if (this.props.contentPage) {
      this.directory('app/components/files', 'app/components/files');
    }

    if (this.props.bpmTaskPage) {
      this.directory('app/components/activiti', 'app/components/activiti');
    }

    this.fs.copyTpl(
      this.templatePath('app/components/app-layout/app-layout.component.ts'),
      this.destinationPath('app/components/app-layout/app-layout.component.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/app-layout/app-layout.component.scss'),
      this.destinationPath('app/components/app-layout/app-layout.component.scss'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('app/components/app-layout/app-layout.component.html'),
      this.destinationPath('app/components/app-layout/app-layout.component.html'),
      this.props
    );

    this.directory('app/components/file-view', 'app/components/file-view');

    this.directory('app/components/theme-picker', 'app/components/theme-picker');

  },

  install: function () {
    if (this.options.install) {
      this.npmInstall();
    }
  }
});
