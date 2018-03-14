---
displayName: "Reference: Installing Dekk"
description: "An overview of available packages and imports"
tags: 
  - Reference
options:
  order: 0
---


# Installation

Dekk is a monorepo and all of its packages can be found under the namespace
[@dekk](https://www.npmjs.com/org/dekk).
You can find all public packages and their provided exports below.

## Deck (preconfigured)

```shell
yarn add @dekk/dekk
```

```jsx
import Deck, {Plugins, Elements, Slide} from '@dekk/dekk'
```

## Deck (root)

```shell
yarn add @dekk/slide
```

```jsx
import Slide from '@dekk/slide'
```


```shell
yarn add @dekk/deck
```

```jsx
import Deck, {Plugins, Elements} from '@dekk/dekk'
```

## SpeakerDeck (root)

```shell
yarn add @dekk/speaker-deck
```

```jsx
import SpeakerDeck from '@dekk/speaker-dekk'
```

## Master Slides

```shell
yarn add @dekk/master
```

```jsx
import createMaster, {
  Master,
  Slot,
  Static,
  createStyledMaster
} from '@dekk/master'
```

## Plugins

```shell
yarn add @dekk/autoplay
yarn add @dekk/listener
yarn add @dekk/paging
yarn add @dekk/url
```

```jsx
import Autoplay from '@dekk/autoplay'
import Listener from '@dekk/listener'
import Paging from '@dekk/paging'
import Url, {search} from '@dekk/url'
```

## Text Elements

```shell
yarn add @dekk/text
```

```jsx
import Text, {
  Bold,
  Center,
  Code,
  Quote,
  Subtitle,
  Title,
  Uppercase
} from '@dekk/text'
```

## Image Elements

```shell
yarn add @dekk/image
```

```jsx
import MaskedImage, {FitImage} from '@dekk/image'
```

## Fragments

```shell
yarn add @dekk/fragment
```

```jsx
import Fragment, {FragmentRoot, FitFragment} from '@dekk/fragment'
```

## Speaker notes

```shell
yarn add @dekk/speaker-notes
```

```jsx
import Notes from '@dekk/speaker-notes'
```


## Tools

```shell
yarn add @dekk/countdown
```

```jsx
import Countdown from '@dekk/countdown'
```

## Icons

```jsx
import Icon from '@dekk/icon'
// SVG icons
import action from '@dekk/icon/lib/action'
import alert from '@dekk/icon/lib/alert'
import av from '@dekk/icon/lib/av'
import communication from '@dekk/icon/lib/communication'
import content from '@dekk/icon/lib/content'
import device from '@dekk/icon/lib/device'
import file from '@dekk/icon/lib/file'
import hardware from '@dekk/icon/lib/hardware'
import image from '@dekk/icon/lib/image'
import maps from '@dekk/icon/lib/maps'
import navigation from '@dekk/icon/lib/navigation'
import notification from '@dekk/icon/lib/notification'
import social from '@dekk/icon/lib/social'
import toggle from '@dekk/icon/lib/toggle'
// or 
// @warn this is a huge file. Use single imports instead
import * from '@dekk/icon/lib/icons'
```
