# Dekk

<p align="center"><img width="300" src="https://raw.githubusercontent.com/sinnerschrader/dekk/master/resources/logo.png" alt="Dekk logo"/></p>

**Dekk is a modular presentation library written in React.js.**

[![Travis branch](https://img.shields.io/travis/sinnerschrader/dekk/master.svg?style=for-the-badge)](https://travis-ci.org/sinnerschrader/dekk)

[![npm](https://img.shields.io/npm/v/@dekk/dekk.svg?style=for-the-badge)](https://www.npmjs.com/org/dekk)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/sinnerschrader/dekk.svg?style=for-the-badge)](https://github.com/sinnerschrader/dekk/issues)

[![bitHound](https://img.shields.io/bithound/code/github/sinnerschrader/dekk.svg?style=for-the-badge)](https://www.bithound.io/github/sinnerschrader/dekk)
[![bitHound](https://img.shields.io/bithound/dependencies/github/sinnerschrader/dekk.svg?style=for-the-badge)](https://www.bithound.io/github/sinnerschrader/dekk)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/sinnerschrader/dekk.svg?style=for-the-badge)](https://www.bithound.io/github/sinnerschrader/dekk)

[![Esdoc](https://img.shields.io/badge/documentation-all_star-8bc300.svg?style=for-the-badge)](https://sinnerschrader.github.io/dekk/api/identifiers.html)
[![commitlint](https://img.shields.io/badge/commitlint-enabled-8bc300.svg?style=for-the-badge)](https://github.com/marionebl/commitlint)
[![convetional-changelog](https://img.shields.io/badge/changelog-conventional-8bc300.svg?style=for-the-badge)](https://github.com/marionebl/commitlint)


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Demos](#demos)
	* [Default mode](#default-mode)
	* [Presenter mode](#presenter-mode)
	* [Live mode](#live-mode)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [API Reference](#api-reference)
* [Developing Dekk](#developing-dekk)

<!-- /code_chunk_output -->

## Demos

The demo can be viewed as a default or live deck or speaker deck

### Default mode
  * [Dekk demo](https://sinnerschrader.github.io/dekk/)
  * Includes: URLs and Paging.
  * This viewmode is a standalone version.
### Presenter mode
  * [Presenter demo](https://sinnerschrader.github.io/dekk/?present=true)
  * includes URLs, Paging and LocalStorage as publisher.
  * This viewmode controls from a live deck.
### Live mode
  * [Live demo](https://sinnerschrader.github.io/dekk/?live=true)
  * Includes LocalStorage as subscriber.
  * Paging and URLs are disabled.
  * This viewmode is controlled from a speaker deck.

## Getting Started

To create your first Deck we recommend reading the
[Getting started](https://sinnerschrader.github.io/dekk/api/index.html)
guide. It will show you how to use a precofugured `Dekk` to create your
presentation.

If you want to use your own logic, you can start from here and just follow along:

* [Installation](https://sinnerschrader.github.io/dekk/api/manual/installation.html)
* [Usage](https://sinnerschrader.github.io/dekk/api/manual/usage.html)

## Examples

There are a few copy & paste examples which you can use. They show some configuration
options of Dekk.

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
[contributing guidelines](https://github.com/sinnerschrader/dekk/blob/master/.github/CONTRIBUTING.md)
and the [code of conduct](https://github.com/sinnerschrader/dekk/blob/master/.github/CODE_OF_CONDUCT.md)

1. Node.js, npm

Please ensure that you are running the correct node version.
The supported engines are listed in [`package.json~engines`](https://github.com/sinnerschrader/dekk/blob/master/package.json#L5).

2. Clone Dekk

```shell
git clone git@github.com:sinnerschrader/dekk.git
cd dekk
```

3. Install and bootstrap

```shell
yarn
npx lerna bootstrap
```

4. start development mode

This opens a webpack-dev-server on [localhost (port 8080)](http://localhost:8080)


```shell
yarn develop
```

5. open your browser. The hosted content is defined in [`gh/pages/gh-pages.js`](https://github.com/sinnerschrader/dekk/blob/master/gh-pages/gh-pages.js)



**Dependencies**

Without the work of these amazing libraries Dekk would not work.
So let's thank the creators and contributers of these projects.

* [react](https://github.com/facebook/react)
* [react-motion](https://github.com/chenglou/react-motion)
* [mobx-react](https://github.com/mobxjs/mobx-react)
* [styled-components](https://github.com/styled-components/styled-components)

**Special thanks**

To develop Dekk a lot more than just those 4 packages were needed 😱 

`npx thanks` (top 10)

| Author       | Where to Donate          | Dependencies |
|--------------|--------------------------|--------------|
| sindresorhus | patreon.com/sindresorhus | eslint-config-xo-react + 195 more |
| feross       | patreon.com/feross       | safe-buffer, resolve + 10 more |
| mafintosh    | patreon.com/mafintosh    | safe-buffer, resolve + 7 more |
| mikeal       | patreon.com/mikeal       | request, form-data + 6 more |
| nzakas       | paypal.me/nczonline      | eslint, estraverse + 6 more |
| juliangruber | patreon.com/juliangruber | isarray, balanced-match + 6 more |
| hughsk       | hughsk.io/donate         | resolve, is-typedarray + 5 more |
| thlorenz     | patreon.com/thlorenz     | resolve + 5 more |
| hueniverse   | patreon.com/eranhammer   | qs, boom, hoek, hawk, sntp + 1 more |
| yoshuawuyts  | patreon.com/yoshuawuyts  | resolve, timers-browserify + 1 more |


© Copyright 2018 [Gregor Adams](https://github.com/pixelass)  
Proudly powered by [Sinnerschrader](https://sinnerschrader.com)
