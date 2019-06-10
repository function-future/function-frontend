const fse = require('fs-extra')
const chalk = require('chalk')
const replace = require('replace-in-file')
const path = require('path')

console.log(chalk.cyan('Starting coverage file adjustment....'))

const sourceFile = 'tests/unit/coverage/lcov.info'
const backupFile = 'tests/unit/coverage/lcov.info.orig'
const sep = path.sep

fse.copySync(sourceFile, backupFile)

const regexStr = '^SF.+\\' + (sep === '/' ? '/' : '\\') + '(.+)\\.vue$'
const vueRegex = new RegExp(regexStr)
const capitalRegex = /[A-Z]/g
const toLowerCase = (i, idx) => (idx > 0 ? '-' : '') + i.toLowerCase()

// modify all SF with .vue extension with .js
const lines = fse.readFileSync(sourceFile).toString().split("\n")
for ( i in lines) {
  const line = lines[i]
  const match = line.match(vueRegex)
  if (!match) continue

  const name = match[1]
  const newName = name.replace(capitalRegex, toLowerCase)
  lines[i] = line.replace(name + '.vue', 'js' + sep + newName + '.js')
}
const fd = fse.openSync(sourceFile , 'w')
fse.writeFileSync(fd, lines.join("\n"))
fse.close(fd)

console.log(chalk.green('Coverage file adjustment completed.'))

// preparing sonar file
console.log(chalk.cyan('Prepare sonar properties file....'))

const APP_VERSION = process.env.npm_package_version

const sonarFile = 'sonar-project.properties'
const defaultFile = sonarFile + '.default'

fse.copySync(defaultFile, sonarFile)

// replace string in file
// replace prod url with env url
const replaceOpts = {
  files: sonarFile,
  from: '{{APP_VERSION}}',
  to: APP_VERSION
}
replace.sync(replaceOpts)

console.log(chalk.green('Sonar property file ready.'))
