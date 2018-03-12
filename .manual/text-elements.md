# Text elements

Dekk provides some basic text elements.

## Text

A simple Text wrapper.

## Title

An h1 title.
This component is required
for `@dekk/master-slides~Cover`
and `@dekk/master-slides~Chapter`


## Subtitle

An h2 title.
This component is required
for `@dekk/master-slides~Cover`
and `@dekk/master-slides~Chapter`

## Uppercase

Uppercases the text

## Bold

Boldens the text and optionally highlights it.

The highlight color is can be set using a CSS variable.

```css
:host {
  --highlight-color: inherit;
}
```

```jsx
import React from 'react'
import {Bold} from '@dekk/text'

export default (
  <Bold hightlight>Bold and beautiful</Bold>
)
```

## Center

Centers the text

## Code

A syntax highlighter

See [github](https://github.com/conorhastings/react-syntax-highlighter)
or [npm](https://www.npmjs.com/package/react-syntax-highlighter)
for more information and a full documentation.
Dekk simply passes all properties to `ReactSyntaxHighlighter`

### Example

```jsx
import React from 'react'
import {Code, colorSchemes} from '@dekk/text'

export default codeString =>  <Code language='javascript' style={colorSchemes.docco}>{codeString}</Code>
// <DoccoCode>`const a = 'A';`</DoccoCode>
// <DoccoCode>`
//  function hello(name) {
//    return `Hello ${name}`
// }
//`</DoccoCode>
```