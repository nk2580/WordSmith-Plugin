'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');


module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
                'Welcome to the ' + chalk.red('Wordsmith plugin') + ' generator!'
                ));

        var prompts = [
            {
                type: 'input',
                name: 'plugin',
                message: 'Plugin Name',
                default: "Sample plugin" // Default to current folder name
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author',
                default: "Sample Person <sample@sampe.com>" // Default to current folder name
            },
            {
                type: 'input',
                name: 'package',
                message: 'Package Name ' + chalk.red('(Letters only)') + ' ',
                default: "SamplePackage" // Default to current folder name
            },
            {
                type: 'input',
                name: 'vendor',
                message: 'Vendor Name ' + chalk.red('(Letters only)') + ' ',
                default: "SampleVendor" // Default to current folder name
            },
            {
                type: 'confirm',
                name: 'cool',
                message: 'Ready to install?'
            }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },
    writing: function () {
        this.fs.copy(
                this.templatePath('Structure'),
                this.destinationPath(this.props.package)
                );
        this.fs.copyTpl(
                this.templatePath('plugin.php'),
                this.destinationPath(this.props.package + '/' + this.props.package + '.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package,
                    plugin: this.props.plugin,
                    author: this.props.author
                }
        );
        this.fs.copyTpl(
                this.templatePath('Instance.php'),
                this.destinationPath(this.props.package + '/Instance.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath(this.props.package + '/bower.json'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copy(
                this.templatePath('_cache'),
                this.destinationPath(this.props.package + '/_cache')
                );
        this.fs.copyTpl(
                this.templatePath('composer.json'),
                this.destinationPath(this.props.package + '/composer.json'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath(this.props.package + '/package.json'),
                {
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('Environment/Views/View.php'),
                this.destinationPath(this.props.package + '/Environment/Views/View.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
    },
    install: function () {
        // Change working directory to 'gulp' for dependency install
        var npmdir = process.cwd() + '/' + this.props.package;
        process.chdir(npmdir);
        this.installDependencies({
            callback: function () {
                this.spawnCommand('composer', ['install']);
            }.bind(this) // bind the callback to the parent scope
        });
    }
});
