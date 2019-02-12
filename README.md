# Dekk

<p align="center"><img width="300" src="https://raw.githubusercontent.com/pixelass/dekk/master/resources/logo.png" alt="Dekk logo"/></p>

**Dekk is a modular presentation library written in React.js.**

[![Travis branch](https://img.shields.io/travis/pixelass/dekk/master.svg?style=for-the-badge)](https://travis-ci.org/pixelass/dekk)

[![npm](https://img.shields.io/npm/v/@dekk/dekk.svg?style=for-the-badge)](https://www.npmjs.com/org/dekk)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/pixelass/dekk/master/LICENSE)

[![Patternplate](https://img.shields.io/badge/manual-patternplate-3399ff.svg?style=for-the-badge)](https://pixelass.github.io/dekk/manual/)


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Demos](#demos)
	* [Default mode](#default-mode)
	* [Presenter mode](#presenter-mode)
	* [Live mode](#live-mode)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [Developing Dekk](#developing-dekk)

<!-- /code_chunk_output -->


## Demos

The demo can be viewed as a default or live deck or speaker deck

### Default mode
  * [Dekk demo](https://pixelass.github.io/dekk/)
  * Includes: URLs and Paging.
  * This viewmode is a standalone version.
### Presenter mode
  * [Presenter demo](https://pixelass.github.io/dekk/?present=true)
  * includes URLs, Paging and LocalStorage as publisher.
  * This viewmode controls a live deck.
### Live mode
  * [Live demo](https://pixelass.github.io/dekk/?live=true)
  * Includes LocalStorage as subscriber.
  * Paging and URLs are disabled.
  * This viewmode is controlled from a speaker deck.

## Getting Started

To create your first Deck we recommend reading the
[Getting started](https://pixelass.github.io/dekk/manual/doc/manual/guide/getting-started/)
guide. It will show you how to use a precofugured `Dekk` to create your
presentation.

If you want to use your own logic, you can start from here and just follow along:

* [Installation](https://pixelass.github.io/dekk/manual/doc/manual/reference/installation/)
* [Usage](https://pixelass.github.io/dekk/manual/doc/manual/reference/usage/)

## Examples

There are a few copy & paste examples which you can use. They show some configuration
options of Dekk.

* [Basic Examples](https://pixelass.github.io/dekk/manual/doc/manual/example/basic/)
* [Fragment Examples](https://pixelass.github.io/dekk/manual/doc/manual/example/fragmernts/)
* [Master Slide Examples](https://pixelass.github.io/dekk/manual/doc/manual/example/master-slides/)
* [Transition Examples](https://pixelass.github.io/dekk/manual/doc/manual/example/transitions/)


## Developing Dekk

You are welcome to help develop Dekk. to contribute please follow these steps:

Prepare:

Please take the time and read our
[contributing guidelines](https://github.com/pixelass/dekk/blob/master/.github/CONTRIBUTING.md)
and the [code of conduct](https://github.com/pixelass/dekk/blob/master/.github/CODE_OF_CONDUCT.md)

1. Node.js, npm

Please ensure that you are running the correct node version.
The supported engines are listed in [`package.json~engines`](https://github.com/pixelass/dekk/blob/master/package.json#L5).

2. Clone Dekk

```shell
git clone git@github.com:pixelass/dekk.git
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

5. open your browser. The hosted content is defined in [`gh/pages/gh-pages.js`](https://github.com/pixelass/dekk/blob/master/gh-pages/gh-pages.js)



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


© Copyright 2018 [Gregor Adams](https://pixelass.com)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/1148334?v=4" width="48px;"/><br /><sub><b>Gregor Adams</b></sub>](http://pixelass.com)<br />[💻](https://github.com/pixelass/dekk/commits?author=pixelass "Code") [📖](https://github.com/pixelass/dekk/commits?author=pixelass "Documentation") [🤔](#ideas-pixelass "Ideas, Planning, & Feedback") [🚇](#infra-pixelass "Infrastructure (Hosting, Build-Tools, etc)") [✅](#tutorial-pixelass "Tutorials") | [<img src="https://avatars1.githubusercontent.com/u/4248851?v=4" width="48px;"/><br /><sub><b>Mario Nebl</b></sub>](https://github.com/marionebl)<br />[🤔](#ideas-marionebl "Ideas, Planning, & Feedback") [🔧](#tool-marionebl "Tools") | [<img src="https://avatars3.githubusercontent.com/u/492378?v=4" width="48px;"/><br /><sub><b>Tim Pietrusky</b></sub>](http://timpietrusky.com)<br />[🐛](https://github.com/pixelass/dekk/issues?q=author%3ATimPietrusky "Bug reports") [🤔](#ideas-TimPietrusky "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
