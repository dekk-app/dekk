---
displayName: "Guide: Your first Dekk"
description: "Learn how to set up a Dekk in 3 simple steps"
tags: 
  - Guide
options:
  order: 1
---

# Getting started

## Installing node.js

Dekk requires node.js, so please make sure it is installed on your
machine. You can find the downloads [here](https://nodejs.org/en/download/).

This guide expects npm 5.2+ or higher.

## Creating a React App

To get started with Dekk you need a simple react project. 
In this guide we will use create-react-app to make easier.

*The next section is quoted from the github readme of create-react-app. (Thu Mar 01 2018 21:24:10 GMT+0100 (CET))*

> To create a new app, run a single command:
> 
> ```sh
> npx create-react-app my-app
> ```
> *(npx comes with npm 5.2+ and higher.)  
>
> It will create a directory called `my-app` inside the current folder.  
> [...]
> Once the installation is done, you can open your project folder:
> 
> ```sh
> cd my-app
> ```
> 
> [source](https://github.com/facebook/create-react-app)



## Your first Deck

Follow these 3 simple steps to build your first Deck.

### 1. Installing Dekk

While in your app folder `my-app`, run a single command:

```shell
npm install --save @dekk/dekk
```

### 2. Creating a Deck

Open the file `my-app/src/App.js` in your text editor and replace
the entire content with this code.

```jsx
import React from 'react'
import Dekk, {Slide} from '@dekk/dekk'

const App = () => {
  return (
    <Dekk>
      <Slide> Slide 1 </Slide>
      <Slide> Slide 2 </Slide>
      <Slide> Slide 3 </Slide>
    </Dekk>
  )
}

export default App
```

### 3. Starting the app

To start the app run a single command:

```
npm start
```

The browser should open the app. If it doesn't simply 
navigate to http://localhost:3000/ and you're good to go.

`@dekk/dekk` provides a preconfigured Deck. It provides all needed 
features to get started. 

Dekk provides 3 viewing modes:

1. default: with paging and URls
2. presenter: with previews
3. live: is controlled by a presenter Dekk

#### Explore your Deck

* Try using the "arrow right key" on your keyboard to go to the next slide.
* The "arrow left key" allows you to go back to the previous slide.
* Open the pages to get the speaker and live view:
  * http://localhost:3000?present=true
  * http://localhost:3000?live=true

You can now add more slides to your Deck.

Enjoy!


## Advanced usage

Dekk allows a lot more than just navigating through slides. If you are
familiar with React.js or are comfortable with your demo app and want
to add custom behaviour you can take a look at the
[Installation](https://sinnerschrader.github.io/dekk/manual/doc/manual/reference/installation/)
and [Usage](https://sinnerschrader.github.io/dekk/manual/doc/manual/reference/usage/)
manual and continue from there.

If anything is missing or seems unclear feel free to open an issue 
in our [github repo](https://github.com/sinnerschrader/dekk/issues).

**Thank you**