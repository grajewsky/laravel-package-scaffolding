'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  async prompting() {
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
      this.templatePath('composerfile.template'),
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
    this.fs.copyTpl(
      this.templatePath('helpers.php.template'),
      this.destinationPath('src/helpers.php'),
      {
        name: this.props.project_name
      }
    );
    this.fs.copyTpl(
      this.templatePath('helpers.php.template'),
      this.destinationPath('tests/Unit/GeneratePackageTest.php'),
      {
        name: this.props.project_name
      }
    );
    this.fs.copy(
      this.templatePath('phpunit.xml'),
      this.destinationPath('phpunit.xml')
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        name: this.props.project_name
      }
    );
    this.fs.copy(
      this.templatePath('APACHE20-LICENSE'),
      this.destinationPath('LICENSE')
    );

    this.fs.copy(
      this.templatePath('APACHE20-LICENSE'),
      this.destinationPath('LICENSE')
    );
  }

  install() {
    this.installDependencies();
  }
};
