const utils = require('./utils');
const alflogo = require('alfresco-logo');
const CLIGenerator = require('generator-alfresco-common').cli_generator;
const filters = require('generator-alfresco-common').prompt_filters;

module.exports = class extends CLIGenerator {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    this.state = {};
    this.blueprints = await utils.getBlueprints();

    this.prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
        option: {
          name: 'name',
          config: {
            name: 'name',
            alias: 'n',
            required: true,
            type: String
          }
        },
        commonFilter: filters.requiredTextFilter
      },
      {
        type: 'list',
        name: 'blueprint',
        message: 'Application blueprint',
        choices: this.blueprints.map(bp => {
          return {
            name: bp.displayName,
            value: bp.name
          };
        }),
        option: {
          name: 'blueprint',
          config: {
            alias: 'b',
            required: true,
            type: String
          }
        },
        commonFilter: filters.chooseOneFilterFactory(this.blueprints.map(bp => bp.name))
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Would you like to install dependencies now?',
        option: {
          name: 'install',
          config: {
            alias: 'i',
            required: false,
            type: Boolean
          }
        },
        commonFilter: filters.booleanFilter
      }
    ];

    this.setupArgumentsAndOptions(this.prompts);
  }

  prompting() {
    this.log(alflogo(
      'ADF Angular app generator for Alfresco\n Version ' + this.rootGeneratorVersion() + '\n',
      {'left-pad': '     '}));

    return this.subgeneratorPrompt(this.prompts, '', props => {
      this.state.name = props.name;
      console.log(props.blueprint);
      this.state.blueprint = this.blueprints.find(bp => bp.name === props.blueprint);
      this.state.install = props.install;

      if (props.name !== this.appname) {
        this.destinationRoot(this.destinationPath(props.name));
      }
    });
  }

  writing() {
    this.fs.copy(
      this.state.blueprint.path + '/**/*',
      this.destinationPath(),
      { globOptions: { dot: true } }
    );
  }

  install() {
    if (this.options.install || this.state.install) {
      this.npmInstall();
    }
  }
};
