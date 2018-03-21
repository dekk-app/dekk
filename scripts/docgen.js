const path = require('path')
const {writeFileSync} = require('fs')
const documentation = require('documentation')
const globby = require('globby')

const addHeader = (md, file) => {
  const prettyName = file.replace(/@dekk\//g, '').replace(/\/src\//g, '/')
  return `---
displayName: "Docs: ${prettyName}"
tags: 
  - Docs
---

${md}
`
}

const handleOutput = (output, file) => {
  const filename = file
    .replace(/@dekk\//g, '')
    .replace(/\/src\//g, '/')
    .replace(/\//g, '_')
    .replace(/\.js$/, '.md')

  const cleanOutput = output.replace(/<!--.*?-->/g, '').trim()

  if (cleanOutput !== '') {
    const text = addHeader(cleanOutput, file)
    writeFileSync(
      path.resolve(__dirname, `../manual/jsdoc/${filename}`),
      text,
      err => {
        if (err) {
          console.error(err)
        }
      }
    )
  }
}

const handleFiles = files => {
  files.forEach(file => {
    documentation
      .build([file], {shallow: true})
      .then(documentation.formats.md)
      .then(output => handleOutput(output, file))
  })
}

globby([
  '@dekk/*/src/**/*.js',
  '!@dekk/*/src/**/demo.js',
  '!@dekk/**/node_modules'
])
  .then(handleFiles)
  .catch(console.error)
