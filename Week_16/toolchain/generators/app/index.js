var Generator = require('yeoman-generator');

module.exports = class extends (
  Generator
) {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async initPackage() {
    let answer = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname,
      },
    ]);

    const pkgJson = {
      name: answer.name,
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      dependencies: {},
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    this.npmInstall(['vue'], { 'save-dev': false });
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'copy-webpack-plugin',
        '@babel/core',
        'babel-loader',
        'vue-loader',
        'vue-template-compiler',
        'vue-style-loader',
        'css-loader',
      ],
      {
        'save-dev': true,
      }
    );

    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue')
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answer.name }
    );
  }
};
