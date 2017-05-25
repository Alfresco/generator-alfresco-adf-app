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
      drawerBar: false,
      userInfo: false,
      contentPage: false,
      searchBar: false,
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
      'Welcome to the awesome\nAngular 2 app generator\nfor Alfresco!\n',
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
          name: 'UI: Drawer Bar',
          value: 'drawerBar',
          checked: true
        },
        {
          name: 'ADF: UserInfo Component',
          value: 'userInfo'
        },
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
      this.templatePath('_favicon-96x96.png'),
      this.destinationPath('favicon-96x96.png')
    );

    this.fs.copy(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copyTpl(
      this.templatePath('config/_helpers.js'),
      this.destinationPath('config/helpers.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_karma-test-shim.js'),
      this.destinationPath('config/karma-test-shim.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_karma.conf.js'),
      this.destinationPath('config/karma.conf.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_webpack.common.js'),
      this.destinationPath('config/webpack.common.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_webpack.dev.js'),
      this.destinationPath('config/webpack.dev.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_webpack.prod.js'),
      this.destinationPath('config/webpack.prod.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/_webpack.test.js'),
      this.destinationPath('config/webpack.test.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/loaders/_debug.js'),
      this.destinationPath('config/loaders/debug.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('config/loaders/_system.js'),
      this.destinationPath('config/loaders/system.js'),
      this.props
    );

    this.fs.copy(
      this.templatePath('config/loaders/_license-check.js'),
      this.destinationPath('config/loaders/license-check.js')
    );

    this.fs.copyTpl(
      this.templatePath('_karma.conf.js'),
      this.destinationPath('karma.conf.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      this.props
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
      this.templatePath('app/_main.ts'),
      this.destinationPath('app/main.ts'),
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
      this.templatePath('app/_app.routes.ts'),
      this.destinationPath('app/app.routes.ts'),
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

    this.fs.copyTpl(
      this.templatePath('app/_app.component.css'),
      this.destinationPath('app/app.component.css'),
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

    this.fs.copyTpl(
      this.templatePath('public/css/_angular-material.css'),
      this.destinationPath('public/css/angular-material.css'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('public/css/_app.css'),
      this.destinationPath('public/css/app.css'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('public/css/_material.orange-blue.min.css'),
      this.destinationPath('public/css/material.orange-blue.min.css'),
      this.props
    );

    this.fs.copy(
      this.templatePath('public/css/_muli-font.css'),
      this.destinationPath('public/css/muli-font.css')
    );

    this.fs.copy(
      this.templatePath('public/fonts/_Muli-Italic.ttf'),
      this.destinationPath('public/fonts/Muli-Italic.ttf')
    );

    this.fs.copy(
      this.templatePath('public/fonts/_Muli-Light.ttf'),
      this.destinationPath('public/fonts/Muli-Light.ttf')
    );

    this.fs.copy(
      this.templatePath('public/fonts/_Muli-LightItalic.ttf'),
      this.destinationPath('public/fonts/Muli-LightItalic.ttf')
    );

    this.fs.copy(
      this.templatePath('public/fonts/_Muli-Regular.ttf'),
      this.destinationPath('public/fonts/Muli-Regular.ttf')
    );

    this.fs.copy(
      this.templatePath('public/js/_Blob.js'),
      this.destinationPath('public/js/Blob.js')
    );

    this.fs.copy(
      this.templatePath('public/js/_formdata.js'),
      this.destinationPath('public/js/formdata.js')
    );

    this.fs.copy(
      this.templatePath('public/js/_promisePolyfill.js'),
      this.destinationPath('public/js/promisePolyfill.js')
    );

    this.fs.copy(
      this.templatePath('public/js/_typedarray.js'),
      this.destinationPath('public/js/typedarray.js')
    );

    if (this.props.licenseChecker) {
      this.fs.copy(
        this.templatePath('assets/_license_header.txt'),
        this.destinationPath('assets/license_header.txt')
      );
    }

    this.fs.copy(
      this.templatePath('resources/i18n/_en.json'),
      this.destinationPath('resources/i18n/en.json')
    );

    this.fs.copy(
      this.templatePath('resources/i18n/_it.json'),
      this.destinationPath('resources/i18n/it.json')
    );

    this.fs.copy(
      this.templatePath('app/components/home/_home.component.css'),
      this.destinationPath('app/components/home/home.component.css')
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

    if (this.props.searchBar) {
      this.fs.copy(
        this.templatePath('app/components/search/_search.component.html'),
        this.destinationPath('app/components/search/search.component.html')
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
    }

    this.fs.copy(
      this.templatePath('app/components/setting/_setting.component.css'),
      this.destinationPath('app/components/setting/setting.component.css')
    );

    this.fs.copy(
      this.templatePath('app/components/setting/_setting.component.html'),
      this.destinationPath('app/components/setting/setting.component.html')
    );

    this.fs.copyTpl(
      this.templatePath('app/components/setting/_setting.component.ts'),
      this.destinationPath('app/components/setting/setting.component.ts'),
      this.props
    );

    if (this.props.contentPage) {
      this.fs.copy(
        this.templatePath('app/components/files/_files.component.html'),
        this.destinationPath('app/components/files/files.component.html')
      );

      this.fs.copy(
        this.templatePath('app/components/files/_files.component.css'),
        this.destinationPath('app/components/files/files.component.css')
      );

      this.fs.copyTpl(
        this.templatePath('app/components/files/_files.component.ts'),
        this.destinationPath('app/components/files/files.component.ts'),
        this.props
      );
    }

    if (this.props.bpmTaskPage) {

      this.fs.copyTpl(
        this.templatePath('app/components/activiti/_activiti-demo.component.ts'),
        this.destinationPath('app/components/activiti/activiti-demo.component.ts'),
        this.props
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_activiti-demo.component.css'),
        this.destinationPath('app/components/activiti/activiti-demo.component.css')
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_activiti-demo.component.html'),
        this.destinationPath('app/components/activiti/activiti-demo.component.html')
      );

      this.fs.copyTpl(
        this.templatePath('app/components/activiti/_form-node-viewer.component.ts'),
        this.destinationPath('app/components/activiti/form-node-viewer.component.ts'),
        this.props
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_form-node-viewer.component.css'),
        this.destinationPath('app/components/activiti/form-node-viewer.component.css')
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_form-node-viewer.component.html'),
        this.destinationPath('app/components/activiti/form-node-viewer.component.html')
      );

      this.fs.copyTpl(
        this.templatePath('app/components/activiti/_apps.view.ts'),
        this.destinationPath('app/components/activiti/apps.view.ts'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('app/components/activiti/_form-viewer.component.ts'),
        this.destinationPath('app/components/activiti/form-viewer.component.ts'),
        this.props
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_form-viewer.component.css'),
        this.destinationPath('app/components/activiti/form-viewer.component.css')
      );

      this.fs.copy(
        this.templatePath('app/components/activiti/_form-viewer.component.html'),
        this.destinationPath('app/components/activiti/form-viewer.component.html')
      );

      this.fs.copyTpl(
        this.templatePath('app/components/activiti/custom-editor/_custom-editor.component.ts'),
        this.destinationPath('app/components/activiti/custom-editor/custom-editor.component.ts'),
        this.props
      );

    }
  },

  install: function () {
    if (this.options.install) {
      this.npmInstall();
    }
  }
});
