#!/usr/bin/env node

const cmd = require('commander')
const colors = require('colors')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
require('shelljs/global')

const types = ['api', 'admin', 'weapp', 'h5']
const modes = ['dev', 'build']
const package = fs.readFileSync(path.join(__dirname, 'bin/config/package.json'))
const babelrc = fs.readFileSync(path.join(__dirname, 'bin/config/.babelrc'))
const gitignore = fs.readFileSync(path.join(__dirname, 'bin/config/.gitignore'))
const nodemon = fs.readFileSync(path.join(__dirname, 'bin/config/nodemon.json'))

cmd
  .version('0.0.1')
  .option('-t, --type [value]', 'project type, available for api, admin, h5 and weapp', 'api')

cmd 
  .command('new')
  .description('create a new project')
  .action(project => {
    echo(`project ${project} is creating...`.green)
    if (!types.includes(cmd.type)) {
      echo(`${cmd.type} option is unknow, available for ${types.join(',').green}`.red)
      shell.exec('newteo -h')
      exit(1)
    }
    mkdir('-p', project)
    echo(`adding working dirs...`.green)
    cd(project)
    mkdir('-p', 'build')
    mkdir('-p', 'src')
    mkdir('-p', 'uploads')
    mkdir('-p', 'logs')
    mkdir('-p', 'public')
    echo(`adding config files...`.green)
    fs.writeFileSync('package.json', package)
    fs.writeFileSync('nodemon.json', nodemon)
    fs.writeFileSync('.babelrc', babelrc)
    fs.writeFileSync('.gitignore', gitignore)
    echo(ls('-A').join(' ').magenta)
    echo(`now installing dependencies...`.green)
    shell.exec('npm i')
    echo(`project is ready to run`.green)
    echo(`try 'cd ${pwd()} && newteo run dev'`.cyan)
  })

cmd
  .command('run')
  .description('run the server')
  .action(mode => {
    echo(`project is running on ${mode} mode...`.green)
    if (!modes.includes(mode)) {
      echo(`${mode} mode is unknow, available for ${modes.join(',').green}`.red)
      shell.exec('newteo -h')
      exit(1)
    }
    shell.exec(`npm run ${mode}`)
  })

cmd
  .parse(process.argv)




// cmd
//   .version('0.0.1')
//   .option('-C, --chdir <path>', 'change the working directory')
//   .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
//   .option('-T, --no-tests', 'ignore test hook')

// cmd
//   .command('setup [env]')
//   .description('run setup commands for all envs')
//   .option("-s, --setup_mode [mode]", "Which setup mode to use")
//   .action(function (env, options) {
//     var mode = options.setup_mode || "normal";
//     env = env || 'all';
//     console.log('setup for %s env(s) with %s mode', env, mode);
//   });

// cmd
//   .command('exec <cmd>')
//   .alias('ex')
//   .description('execute the given remote cmd')
//   .option("-e, --exec_mode <mode>", "Which exec mode to use")
//   .action(function (cmd, options) {
//     console.log('exec "%s" using %s mode', cmd, options.exec_mode);
//   }).on('--help', function () {
//     console.log('  Examples:');
//     console.log();
//     console.log('    $ deploy exec sequential');
//     console.log('    $ deploy exec async');
//     console.log();
//   });

// cmd
//   .command('*')
//   .action(function (env) {
//     console.log('deploying "%s"', env);
//   });

// cmd.parse(process.argv);