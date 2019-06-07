const fsExtra = require('fs-extra')
const path = require('path')
const replace = require('replace-in-file')
const chalk = require('chalk')

const projectDir = path.join(__dirname, '..')

const APP_VERSION = process.env.npm_package_version

const sonarFile = 'sonar-project.properties'
const sourceFile = path.join(projectDir, sonarFile + '.default')
const targetFile = path.join(projectDir, sonarFile)

console.log(chalk.cyan('Starting post unit test script....'))

fsExtra.copySync(sourceFile, targetFile)

// replace string in file
const replaceOpts = {
  files: targetFile,
  from: '{{APP_VERSION}}',
  to: APP_VERSION
}
replace.sync(replaceOpts)

console.log(chalk.green('Post unit test script done.'))
