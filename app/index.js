const Generator = require('yeoman-generator');
const utils = require('./utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    this.blueprints = await utils.getBluprints();
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'list',
        name: 'blueprint',
        message: 'Application blueprint',
        choices: this.blueprints.map(bp => {
          return {
            name: `${bp.name} (${bp.version})`,
            value: bp
          };
        })
      }])
      .then((answers) => {
        if (answers.name !== this.appname) {
          this.destinationRoot(this.destinationPath(answers.name));
        }
        this.targetBlueprint = answers.blueprint;
      });
  }

  writing() {
    this.fs.copy(this.targetBlueprint.path + '/**/*', this.destinationPath());
  }

  install() {
    if (this.options.install) {
      this.npmInstall();
    }
  }
};
