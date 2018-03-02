# Dekk

<p align="center"><img width="300" src="https://raw.githubusercontent.com/sinnerschrader/dekk/master/resources/logo.png" alt="Dekk logo"/></p>

Dekk is a presentation tool written in React.js.
It is developed as a monorepo and provides several packages.

This file does not explain how Dekk works. Please take a look at the [Manual](https://sinnerschrader.github.io/dekk/api/manual/) instead.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/sinnerschrader/dekk.svg?style=flat-square)](https://github.com/sinnerschrader/dekk/issues)

[![Esdoc](https://sinnerschrader.github.io/dekk/api/badge.svg)](https://sinnerschrader.github.io/dekk/api)

[![Travis branch](https://img.shields.io/travis/sinnerschrader/dekk/master.svg?style=flat-square)](https://travis-ci.org/sinnerschrader/dekk)
[![bitHound](https://img.shields.io/bithound/code/github/sinnerschrader/dekk.svg?style=flat-square)](https://www.bithound.io/github/sinnerschrader/dekk)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/sinnerschrader/dekk.svg?style=flat-square)](https://www.bithound.io/github/sinnerschrader/dekk)

[![yarn](https://img.shields.io/badge/yarn-friendly-2c8ebb.svg?style=flat-square)](https://yarnpkg.com/)
[![commitlint](https://img.shields.io/badge/commitlint-enabled-44aa44.svg?style=flat-square)](https://github.com/marionebl/commitlint)


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Demos](#demos)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [API Reference](#api-reference)
* [Developing Dekk](#developing-dekk)
* [Dependencies](#dependencies)
* [Special thanks.](#special-thanks)

<!-- /code_chunk_output -->

## Demos

The demo can be viewed as a default or live deck or speaker deck

* [Demo](https://sinnerschrader.github.io/dekk/)
  * includes: URLs, Paging
  * This viewmode is a standalone version
* [Demo (presenter mode)](https://sinnerschrader.github.io/dekk/?present=true)
  * includes URLs, Paging, LocalStorage as publisher
  * This viewmode controls from a live deck
* [Demo (live mode)](https://sinnerschrader.github.io/dekk/?live=true)
  * LocalStorage as subscriber
  * This viewmode is controlled from a speaker deck

## Getting Started

If you need examples or more information about a component or usage you
will most likely find it here.

[Manual](https://sinnerschrader.github.io/dekk/api/manual/index.html)

Here's the most important information to for advanced usage.

* [Installation](https://sinnerschrader.github.io/dekk/api/manual/installation.html)
* [Usage](https://sinnerschrader.github.io/dekk/api/manual/usage.html)

## Examples

There are a few copy & paste examples which you can use. They show the
basic usage of Dekk.

[Examples](https://sinnerschrader.github.io/dekk/api/manual/examples.html)

## API Reference

Dekk is fully documented. Feel free to look through the reference.
If something is missing it has probably not been generated.
Take a look at the source comments instead.

[Reference](https://sinnerschrader.github.io/dekk/api/identifiers.html)


## Developing Dekk

You are welcome to help develop Dekk. to contribute please follow these steps:

Prepare:

Please take the time and read our
[contribution guiidelines](https://github.com/sinnerschrader/dekk/blob/master/.github/CONTRIBUTING.md)
and the [code of conduct](https://github.com/sinnerschrader/dekk/blob/master/.github/CODE_OF_CONDUCT.md)

1. Node.js & npm

Please ensure that you are running the correct node version.
The supported engines are listed in `package.json~enines`.

```json
{
  "engines" : {
    "node" : ">=6 <9",
    "npm" : ">=3"
  }
}
```

2. Clone Dekk

```shell
git clone git@github.com:sinnerschrader/dekk.git
cd dekk
```

3. Install and bootstrap

```shell
yarn
lerna bootstrap
```

4. start development mode

This opens a webpack-dev-server on port 8080

http://localhost:8080

```shell
yarn develop
```

5. open your browser. The hosted content is defined in 
  `gh/pages/gh-pages.js`



## Dependencies

Without the work of these amazing libraries Dekk would not work.
So let's thank the creators and contributers of these projects.

* [react](https://github.com/facebook/react)
* [react-motion](https://github.com/chenglou/react-motion)
* [mobx-react](https://github.com/mobxjs/mobx-react)
* [styled-components](https://github.com/styled-components/styled-components)

## Special thanks.

To develop Dekk a lot more than just those 4 packages were needed 😱 

`npx thanks` (top 10)

| Author | Where to Donate | Dependencies |
|---|---|---|
| sindresorhus              | patreon.com/sindresorhus              | eslint-config-xo-react + 195 more |
| feross                    | patreon.com/feross                    | safe-buffer, resolve + 10 more |
| mafintosh                 | patreon.com/mafintosh                 | safe-buffer, resolve + 7 more |
| mikeal                    | patreon.com/mikeal                    | request, form-data + 6 more |
| nzakas                    | paypal.me/nczonline                   | eslint, estraverse + 6 more |
| juliangruber              | patreon.com/juliangruber              | isarray, balanced-match + 6 more |
| hughsk                    | hughsk.io/donate                      | resolve, is-typedarray + 5 more |
| thlorenz                  | patreon.com/thlorenz                  | resolve + 5 more |
| hueniverse                | patreon.com/eranhammer                | qs, boom, hoek, hawk, sntp + 1 more |
| yoshuawuyts               | patreon.com/yoshuawuyts               | resolve, timers-browserify + 1 more |


© Copyright 2018 [Gregor Adams](https://github.com/pixelass)  
Proudly powered by [Sinnerschrader](https://sinnerschrader.com)
