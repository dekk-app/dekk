import React from 'react'
import {render} from 'react-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {vs as colorScheme} from 'react-syntax-highlighter/dist/styles'

import Deck from '../src'
import Notes from '../src/components/notes'
import SetTitle from '../src/setters/title'
import Text, {
  Bold
} from '../src/components/text'
import Title, {ChapterTitle, CoverTitle, DividerTitle, ContentTitle} from './elements/title'
import Subtitle from './elements/subtitle'

import Credits from './masters/credits'

import coverImage from './assets/cover.jpg'
import dotcssImage from './assets/dotcss.jpg'
import schackImage from './assets/schackstrasse.jpg'
import fractalImage from './assets/fractal.jpg'
import municssImage from './assets/municss.jpg'
import inyourheadImage from './assets/inyourhead.jpg'
import esperantoImage from './assets/esperanto.jpg'
import phantomcarImage from './assets/phantomcar.jpg'
import legoImage from './assets/lego.jpg'
import redImage from './assets/red.jpg'
import greenImage from './assets/green.jpg'
import blueImage from './assets/blue.jpg'

import styles from './styles.scss'
import animations from './animations.scss'

import * as masters from './masters'

const {
  Red,
  Green,
  Blue,
  RedChapter,
  GreenChapter,
  BlueChapter,
  RedDivider,
  GreenDivider,
  BlueDivider,
  RedCover,
  GreenCover,
  BlueCover
} = masters

const renderMaster = (master, cb, dark = false) => {
  const m = dark ? master.dark : master
  return cb(m)
}

const coverSlide = renderMaster(RedCover, Slide => (
  <Slide background={`url("${coverImage}")`}>
    <SetTitle/>
    <Slide.View><CoverTitle>Stiligita</CoverTitle></Slide.View>
    <Notes>
      Hello.<br/>
      I talked about animations at our Engineering Offsite.<br/>
      Every Component is an animation.<br/>
      Every View is a scene.<br/>
      In Kiev I will talk about "pushing user interfaces into the fourth dimension"<br/>
      I used a tool called react-overflow. It allows adding a timeline to our views.<br/>
      thus adding a fourth dimension.<br/>
      Other tools do the same thing. They use the same API and can therefore operate the same components.
    </Notes>
  </Slide>
), true)

const aboutMe1 = renderMaster(BlueChapter, Slide => (
  <Slide background={`url("${dotcssImage}")`}
         className={animations.cube}>
    <SetTitle/>
    <Slide.View><ChapterTitle>Gregor Adams</ChapterTitle></Slide.View>
    <Notes>
      I'm Gregor Adams<br/>
      My first lightning talk: dotCSS<br/>
      About functionality in CSS with checkbox hacks.<br/>
      Sponsored by SInnerSchrader.
    </Notes>
  </Slide>
), true)

const aboutMe2 = renderMaster(BlueDivider, Slide => (
  <Slide background={`url("${municssImage}")`}
         className={animations.cube}>
    <SetTitle>Gregor Adams</SetTitle>
    <Slide.Top>
      <DividerTitle>
        I love to talk about my work<br/> and encourage others
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>https://codepen.io/pixelass</Credits>
      <Credits>https://github.com/pixelass</Credits>
    </Slide.Bottom>
    <Notes>
      You can find works of me on github and codepen.<br/>
      Thanks to these platforms I have been able to allow others see my work.<br/>
      I am the creator of MuniCSS finest a poular meetup in Munich.
    </Notes>
  </Slide>
), true)

const aboutMe3 = renderMaster(BlueDivider, Slide => (
  <Slide background={`url("${schackImage}")`}
         className={animations.cube}>
    <SetTitle>Gregor Adams</SetTitle>
    <Slide.Top><DividerTitle>I wor da easte Techniker in Minga</DividerTitle></Slide.Top>
    <Slide.Bottom><Credits>No lang voa da Schackstrass’n</Credits></Slide.Bottom>
    <Notes>
      (talk in bavarian, nobdy will understand)<br/>
      I was the first developer in Munich<br/>
      I created a stylguide for Allianz.<br/>
      Nobody understood what I was doing but everybody loved it!<br/>
      Was I ahead of my time?<br/>
      No, I was not the first one, I just reimagined something I had seen and used before.
    </Notes>
  </Slide>
), true)

const esperantoJS = renderMaster(GreenChapter, Slide => (
  <Slide background={`url("${esperantoImage}")`}>
    <SetTitle/>
    <Slide.View>
      <ChapterTitle>Esperanto & JavaScript</ChapterTitle>
    </Slide.View>
    <Notes>
      So I guess only the fewest might have understood what I just said.<br/>
      I talked bavarian and this is even hard to understand for many Germans.<br/>
      But today I want to talk about something that will do the exact oposite.<br/>
    </Notes>
  </Slide>
))



const esperantoInspiration = renderMaster(GreenDivider, Slide => (
  <Slide>
    <SetTitle>Esperanto & JavaScript</SetTitle>
    <Slide.Top>
      <DividerTitle>
        <Bold highlight>Esperanto</Bold> inspired me<br/>
        to create a styling API
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>https://github.com/pixelass/stiligita</Credits>
    </Slide.Bottom>
    <Notes>
      As mentioned in the beginning I have a tendency to develop bits of software that have a strong focus on
      interaction and communication.<br/>
      Without communication interaction will get harder and we need to improvise.<br/>
      If we create software that in certain patterns we can prevent having to do this.<br/>
      And that is why I created Stiligita<br/>
      Even I can't rememebr or pronounce that name.<br/>
    </Notes>
  </Slide>
), true)

const dekkIdea = renderMaster(RedChapter, Slide => (
  <Slide className={animations.drop}>
    <SetTitle/>
    <Slide.View>
      <ChapterTitle>
        Dekk<br/>
        a presentation tool
      </ChapterTitle>
    </Slide.View>
    <Notes>
      After the last Product Engineering Offsite I started to develop Dekk.<br/>
      I have been wanting to develop something like this for a long time and actually have.<br/>
      I have spoken at several conferences and very often included a self-written online-editor with a lice view.<br/>
      I want to present live examples and be able to modify them while explaing a certain topic<br/>
      In one talk I rendered fractals (mandelbrot set, barnsley fern, ...) using libsass via ecmascripten in the browser.
    </Notes>
  </Slide>
))

const dekkCompatible = renderMaster(RedDivider, Slide => (
  <Slide className={animations.drop}>
    <SetTitle>
      Dekk<br/>
      a presentation tool
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        Dekk is built on <Bold highlight>React.js</Bold><br/>
        and can host other React.js components.
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>https://github.com/sinnerschrader/dekk</Credits>
    </Slide.Bottom>
    <Notes>
      I wanted to be able to focus on my content and my experiments.<br/>
      A good slide goes a long way.<br/>
      Let's look at Esperanto. It is inspired by many different languages to create a new language with words
      or grammar that seems natural. (or is it?)<br/>
      Not only have I written my own Presantation tools but also used several others.<br/>
      Let's not hate, but rather see the good parts and use them as inspiration.
    </Notes>
  </Slide>
))

const dekkEditing = renderMaster(RedDivider, Slide => (
  <Slide className={animations.drop}>
    <SetTitle>
      Dekk<br/>
      a presentation tool
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        Dekk allows <Bold highlight>several ways</Bold><br/>
        to create and edit slides.
      </DividerTitle>
    </Slide.Top>
    <Notes>
      Dekk can be installed from npm.<br/>
      You can write code to create slides. But there is also a GUI.<br/>
      Dekk desktop, Dekk web (native-app via electron, web-app)
    </Notes>
  </Slide>
))

const modularSoftware = renderMaster(BlueChapter, Slide => (
  <Slide>
    <SetTitle/>
    <Slide.View>
      <ChapterTitle>
        <Bold highlight>Modular</Bold><br/>
        software development
      </ChapterTitle>
    </Slide.View>
    <Notes>
      We expect our components to be fully modular.<br/>
      It should be easy to use 3rd party component libraries as modules.<br/>
      This is still a very big problem.
    </Notes>
  </Slide>
))

const modularJavaScript = renderMaster(BlueDivider, Slide => (
  <Slide>
    <SetTitle>
        <Bold highlight>Modular</Bold><br/>
        software development
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        JavaScript allows modularity.
      </DividerTitle>
    </Slide.Top>
    <Notes>
      It is easy to manage dependencies in Javascript.<br/>
      There are several tools that help us and have even inspired the native
      language to change.
    </Notes>
  </Slide>
))

const modularCSS = renderMaster(GreenDivider, Slide => (
  <Slide className={animations.zoom}>
    <SetTitle>
        <Bold highlight>Modular</Bold><br/>
        software development
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        CSS can be a <Bold highlight>pain</Bold>
      </DividerTitle>
    </Slide.Top>
    <Notes>
      When we develop UI libraries it is hard to keep the CSS modular.<br/>
    </Notes>
  </Slide>
), true)

const cssModulesButton = `
.Button {
  padding: 0.5em 1em;
  font-size: 1em;
  background: tomato;
  color: white;
}
`

const cssModulesButtonJS = `
import './styles.css'
const Button = props =>
  <button {...props} className='Button'/>
`

const cssModulesIcon = `
.Icon {
  height: 1em;
  width: 1em;
}
`

const cssModulesIconJS = `
import './styles.css'
const Icon = props =>
  <span {...props} className='Icon'/>
`

const cssModulesIconButton = `
.Button {
  padding: 0.5em 1em;
  font-size: 1em;
  background: tomato;
  color: white;
}
.Icon {
  height: 1em;
  width: 1em;
}
.Button .Icon {
  margin-right: 0.5em;
}
`

const cssModulesIconButtonJS = `
import Icon from '../Icon'
import Button from '../Button'
const IconButton = props =>
  <Button {...props}>
    <Icon icon={props.icon}/>{props.children}
  </Button>
`
const cssModules1 = renderMaster(Green, Slide => (
  <Slide className={animations.flip}>
    <SetTitle>
        CSS can be a <Bold highlight>pain</Bold>
    </SetTitle>
    <Slide.View>
      <ContentTitle>Button</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='css' style={colorScheme}>{cssModulesButton}</SyntaxHighlighter>
          <SyntaxHighlighter language='html' style={colorScheme}>{cssModulesButtonJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
      We can easily import atoms.<br/>
    </Notes>
  </Slide>
), true)

const cssModules2 = renderMaster(Green, Slide => (
  <Slide className={animations.flip}>
    <Slide.View>
      <ContentTitle>Icon</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='css' style={colorScheme}>{cssModulesIcon}</SyntaxHighlighter>
          <SyntaxHighlighter language='html' style={colorScheme}>{cssModulesIconJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
  </Slide>
), true)

const cssModules3 = renderMaster(Green, Slide => (
  <Slide className={animations.flip}>
    <SetTitle>
        CSS can be a <Bold highlight>pain</Bold>
    </SetTitle>
    <Slide.View>
      <ContentTitle>IconButton</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='css' style={colorScheme}>{cssModulesIconButton}</SyntaxHighlighter>
          <SyntaxHighlighter language='html' style={colorScheme}>{cssModulesIconButtonJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
      When we import molecules we do not know which styles we need.<br/>
      Each molecule must brin its required CSS.<br/>
      Let's use the Button too, now we have duplicated the CSS.<br/>
      Or we import the entire css bundle.<br/>
    </Notes>
  </Slide>
), true)

const modulesStyled = renderMaster(RedDivider, Slide => (
  <Slide className={animations.zoom}>
    <SetTitle>
        <Bold highlight>Modular</Bold><br/>
        software development
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        CSS modules<br/>
        vs <Bold highlight>styled</Bold> components
      </DividerTitle>
    </Slide.Top>
    <Notes>

    </Notes>
  </Slide>
))

const styledComponentsButton = `
const Button = styled.button\`
  padding: 0.5em 1em;
  font-size: 1em;
  background: tomato;
  color: white;
\`
`

const styledComponentsIcon = `
const Button = styled.span\`
  height: 1em;
  width: 1em;
\`
`

const styledComponentsIconButton = `
const IconButton = Button.extend\`
> span {
  margin-right: 0.5em;
}
\`
`
const styledComponents1 = renderMaster(Red, Slide => (
  <Slide className={animations.flip}>
    <SetTitle>
        CSS modules<br/>
        vs <Bold highlight>styled</Bold> components
    </SetTitle>
    <Slide.View>
      <ContentTitle>Button</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{styledComponentsButton}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
      We can easily import atoms.<br/>
      When we import molecules we do not know which styles we need.<br/>
     Each molecule must brin its required CSS.<br/>
     Let's use the Button too, now we have duplicated the CSS.<br/>
    </Notes>
  </Slide>
))

const styledComponents2 = renderMaster(Red, Slide => (
  <Slide className={animations.flip}>
    <Slide.View>
      <ContentTitle>Icon</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{styledComponentsIcon}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
      We can easily import atoms.<br/>
      When we import molecules we do not know which styles we need.<br/>
     Each molecule must brin its required CSS.<br/>
     Let's use the Button too, now we have duplicated the CSS.<br/>
    </Notes>
  </Slide>
))

const styledComponents3 = renderMaster(Red, Slide => (
  <Slide className={animations.flip}>
    <Slide.View>
      <ContentTitle>IconButton</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{styledComponentsIconButton}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
      We can easily import atoms.<br/>
      When we import molecules we do not know which styles we need.<br/>
     Each molecule must brin its required CSS.<br/>
     Let's use the Button too, now we have duplicated the CSS.<br/>
    </Notes>
  </Slide>
))

const wheresCSS = renderMaster(RedDivider, Slide => (
  <Slide background={`url("${inyourheadImage}")`}
         className={animations.zoom}>
    <SetTitle>
        CSS modules<br/>
        vs <Bold >styled</Bold> components
    </SetTitle>
    <Slide.Top>
      <DividerTitle>
        Where's the CSS?
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>It’s all in your &lt;head&gt;</Credits>
    </Slide.Bottom>
    <Notes>

    </Notes>
  </Slide>
), true)


const stiligitaCover = renderMaster(BlueChapter, Slide => (
  <Slide>
    <SetTitle/>
    <Slide.View>
      <ChapterTitle>
        Stiligita
      </ChapterTitle>
    </Slide.View>
    <Notes>
    </Notes>
  </Slide>
))

const stiligitaEsperanto = renderMaster(BlueDivider, Slide => (
  <Slide background={`url("${phantomcarImage}")`}
         className={animations.cube}>
    <SetTitle>Stiligita</SetTitle>
    <Slide.Top>
      <DividerTitle>
        Esperanto:<br/>
        <Bold>styled</Bold>, streamlined
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>It streamlines styles</Credits>
    </Slide.Bottom>
    <Notes>

    </Notes>
  </Slide>
), true)


const stiligitaStyled = renderMaster(BlueDivider, Slide => (
  <Slide background={`url("${legoImage}")`}
         className={animations.cube}>
    <Slide.Top>
      <DividerTitle>
        Like <Bold>styled</Bold> components
      </DividerTitle>
    </Slide.Top>
    <Slide.Bottom>
      <Credits>but more modular</Credits>
    </Slide.Bottom>
    <Notes>

    </Notes>
  </Slide>
), true)



const extendStiligitaJS = `
import styled from 'stiligita'
import {PROCESSOR} from 'stiligita/lib/constants'
import renderReact from 'stiligita-react'
import Stylis from 'stylis'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

styled
  .use(renderReact)
  .use(stylis)
`
const extendStiligita = renderMaster(Blue, Slide => (
  <Slide className={animations.cube}>
    <Slide.View>
      <ContentTitle>Stiligita is not tied to <Bold highlight>React.js</Bold></ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{extendStiligitaJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
     Stiligita can be extended with plugins<br/>
    </Notes>
  </Slide>
))


const stiligitaVueJS = `
const todoItem = styled.li({
  name: 'todo-item',
  props: ['todo']
})\`
  background: red;
  color: white;
\`
`
const stiligitaVue = renderMaster(Blue, Slide => (
  <Slide className={animations.cube}>
    <SetTitle>Stiligita</SetTitle>
    <Slide.View>
      <ContentTitle>Stiligita could create<br/><Bold highlight>Vue.js</Bold> components</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{stiligitaVueJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
     Stiligita can be extended with plugins<br/>
    </Notes>
  </Slide>
))

const promiseJS = `
AgencyDay.next().then(Dekk => {
  Dekk.use(Stiligita)
    .present()
}).catch(err => {
  for (const agencyDay in Date().getFullYear()) {
    try {
      Dekk.use(Stiligita)
        .present()
    }
  }
})
`

const nextAD = renderMaster(Green, Slide => (
  <Slide>
    <SetTitle/>
    <Slide.View>
      <ContentTitle>More on the <Bold>next</Bold> Agency day</ContentTitle>
        <div className={styles.codeBox}>
          <SyntaxHighlighter language='javascript' style={colorScheme}>{promiseJS}</SyntaxHighlighter>
        </div>
    </Slide.View>
    <Notes>
     Stiligita can be extended with plugins<br/>
    </Notes>
  </Slide>
))


const thankYou = renderMaster(GreenChapter, Slide => (
  <Slide>
    <SetTitle/>
    <Slide.View>
      <ChapterTitle>Thank You</ChapterTitle>
    </Slide.View>
    <Notes>
     Thank you<br/>
    </Notes>
  </Slide>
))


const pubnub = {
  publishKey: 'pub-c-361b8f9d-5d80-44aa-883e-efdf98350d09',
  subscribeKey: 'sub-c-9bee7be6-cac3-11e7-be55-4e84f57698c8'
}

const App = () => (
  <Deck className={styles.dekk} pubnub={pubnub}>
    {coverSlide}
    {aboutMe1}
    {aboutMe2}
    {aboutMe3}
    {esperantoJS}
    {esperantoInspiration}
    {dekkIdea}
    {dekkCompatible}
    {dekkEditing}
    {modularSoftware}
    {modularJavaScript}
    {modularCSS}
    {cssModules1}
    {cssModules2}
    {cssModules3}
    {modulesStyled}
    {styledComponents1}
    {styledComponents2}
    {styledComponents3}
    {wheresCSS}
    {stiligitaCover}
    {stiligitaEsperanto}
    {stiligitaStyled}
    {extendStiligita}
    {stiligitaVue}
    {nextAD}
    {thankYou}
  </Deck>
)

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
