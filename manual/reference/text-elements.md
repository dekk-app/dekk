---
displayName: "Reference: Using Text Elements"
description: "A simple overview of Text Elements"
tags: 
  - Reference
options:
  order: 8
---

# Text elements

Dekk provides some basic text elements.

## Text

A simple Text wrapper.

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="text" />;
```

## Title

An h1 title.
This component is required
for `@dekk/master-slides~Cover`
and `@dekk/master-slides~Chapter`

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="title" />;
```

## Subtitle

An h2 title.
This component is required
for `@dekk/master-slides~Cover`
and `@dekk/master-slides~Chapter`

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="subtitle" />;
```


## Uppercase

Uppercases the text

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="uppercase" />;
```


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

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="bold" />;
```


## Center

Centers the text

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="center" />;
```


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

export default ({code}) =>
  <Code language='javascript'
        style={colorSchemes.docco}>
    {code}
  </Code>
```

### Demo:

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="code" />;
```
