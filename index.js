#!/usr/bin/env node

const cmd = require('commander')
const colors = require('colors')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
require('shelljs/global')

const types = ['api', 'admin', 'weapp', 'h5']
const modes = ['dev', 'build']
const package = fs.readFileSync(path.join(__dirname, 'bin/api/package.json'))
const nodemon = fs.readFileSync(path.join(__dirname, 'bin/api/nodemon.json'))
const app = fs.readFileSync(path.join(__dirname, 'bin/api/app.js'))
const config = fs.readFileSync(path.join(__dirname, 'bin/api/config.js'))
const router = fs.readFileSync(path.join(__dirname, 'bin/api/router.js'))
const babelrc = fs.readFileSync(path.join(__dirname, 'bin/api/.babelrc'))
const gitignore = fs.readFileSync(path.join(__dirname, 'bin/api/.gitignore'))
const env = fs.readFileSync(path.join(__dirname, 'bin/api/.env'))

cmd
  .version('0.0.1')
  .option('-t, --type [value]', 'project type, available for api, admin, h5 and weapp', 'api')

cmd 
  .command('new')
  .description('create a new project')
  .action(project => {
    echo(`creating project ${project}...`.green)

    if (!types.includes(cmd.type)) {
      echo(`${cmd.type} option is unknow, available for ${types.join(',').green}`.red)
      shell.exec('newteo -h')
      exit(1)
    }

    mkdir('-p', project)
    echo(`adding working dirs...`.green)
    cd(project)
    mkdir('-p', 'build')
    mkdir('-p', 'src/decorators')
    mkdir('-p', 'uploads')
    mkdir('-p', 'logs')
    mkdir('-p', 'public')

    echo(`adding config files...`.green)
    fs.writeFileSync('package.json', package)
    fs.writeFileSync('nodemon.json', nodemon)
    fs.writeFileSync('./src/app.js', app)
    fs.writeFileSync('./src/decorators/router.js', router)
    fs.writeFileSync('./src/config.js', config)
    fs.writeFileSync('.babelrc', babelrc)
    fs.writeFileSync('.env', env)
    fs.writeFileSync('.gitignore', gitignore)

    echo(ls('-A').join(' ').magenta)
    echo(`now installing dependencies...`.green)
    shell.exec('npm i')
    echo(`project is ready to run`.green)
    echo(`try 'cd ${pwd()} && newteo run dev'`.cyan)
  })

cmd
  .command('run <dev|build>')
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
  .command('*')
  .action(command => {
    echo(`unknow command ${command}`.red)
    shell.exec('newteo -h')
  })

cmd
  .parse(process.argv)


