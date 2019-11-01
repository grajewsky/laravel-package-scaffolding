'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to ${chalk.red('generator-laravel-package-scaffolding')} generator!`)
    );

    const prompts = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your name",
        default: ""
      },
      {
        type: "input",
        name: "email",
        message: "Your email",
        default: ""
      },
      {
        type: "input",
        name: "project_name",
        message: "Your project name",
        default: "awesome-package"
      },
      {
        type: "input",
        name: "project_desc",
        message: "Your project description",
        default: "Laravel package"
      },
      {
        type: "input",
        name: "php_version",
        message: "PHP version",
        default: "7.2"
      },
      {
        type: "input",
        name: "license",
        message: "Your project license",
        default: "Apache 2.0"
      },
    ]);

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('templates/composerfile.template'),
      this.destinationPath('composer.json'),
      {
        author: this.props.name,
        author_email: this.props.email,
        name: this.props.project_name,
        desc: this.props.project_desc,
        license: this.props.license,
        php_version: this.props.php_version,
      }
    );
    this.fs.copy(
      this.templatePath('files/helpers.php'),
      this.destinationPath('src/helpers.php')
    );
    this.fs.copy(
      this.templatePath('files/phpunit.xml'),
      this.destinationPath('phpunit.xml')
    );
    this.fs.copyTpl(
      this.templatePath('templates/README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('files/APACHE20-LICENSE'),
      this.destinationPath('LICENSE')
    );
  }

  install() {
    this.installDependencies();
  }
};
