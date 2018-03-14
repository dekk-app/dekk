import React from 'react'
import Code, {colorSchemes} from './'

const code = `function hello(name) {
  return \`hello \${name}!\`
}`

export default function() {
  return (
    <div>
      <Code style={colorSchemes.docco} languange="javascript">
        {code}
      </Code>
    </div>
  )
}
