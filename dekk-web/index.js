import React, {Children, cloneElement} from 'react'
import {render} from 'react-dom'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
// import Draggable from 'react-draggable'
import { DragSource } from 'react-dnd'
import Deck from '../src'
import Slide from '../src/components/slide'
import Text, {Title, Subtitle, Code} from '../src/components/text'
import * as reducers from './reducers'
import {goToPage, slideContent} from './actions'
import styles from './styles.scss'



import { DragDropContextProvider as Wrapper} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropArea from './components/dustbin'
import Droppable from './components/box'
import ItemTypes from './components/itemtypes'


const reducer = combineReducers({
  ...reducers
})

const store = createStore(
  reducer
)

const slideData = [
  {
    id: uuid()
  },
  {
    id: uuid()
  },
  {
    id: uuid()
  },
  {
    id: uuid()
  }
]

const slides = (content, page, className, goTo) => slideData.map((item, i) => {
  const data = (content[i] || {})
  const top = data[ItemTypes.TopBox] || []
  const bottom = data[ItemTypes.BottomBox] || []
  const handleClick = e => {
    if (goTo) {
      goTo(i)
    }
  }
  const topBox = !goTo ? (
    <DropArea className={styles.dropTop} name={ItemTypes.TopBox} accepts={[ItemTypes.Title, ItemTypes.Subtitle]}>
      {
        top.map(child => (
           <child.type {...child.props}/>
        ))
      }
    </DropArea>
  ) : (
  <div className={styles.dropTop}>
    {
      top.map(child => (
         <child.type {...child.props}/>
      ))
    }
  </div>
  )

  const bottomBox = !goTo ? (
    <DropArea className={styles.dropBottom} name={ItemTypes.BottomBox} accepts={[ItemTypes.Text, ItemTypes.Code]}>
      {
        bottom.map(child => (
           <child.type {...child.props}/>
        ))
      }
    </DropArea>
  ) : (
  <div className={styles.dropTop}>
    {
      bottom.map(child => (
         <child.type {...child.props}/>
      ))
    }
  </div>
  )

  return (
    <Slide className={classNames(className, {[styles.active]: page === i})} key={item.id}>
      <div className={styles.slideInner} onClick={handleClick}>
        {topBox}
        {bottomBox}
      </div>
    </Slide>
  )
})


let Dekk = props => {
  function nextPage() {
    props.goToPage(props.page + 1)
  }

  function previousPage() {
    props.goToPage(props.page - 1)
  }

  function handleClick(children, e){
    e.preventDefault()
    console.log(children.type.name, children.props)
  }

  function handleDrop(p, dropResult) {
    const {children} = p
    const {content, page} = props
    props.slideContent({
      type: children.type,
      props: {
        ...children.props,
        // contentEditable: true,
        onClick: handleClick.bind(this, children),
        key: uuid()
      },
    }, page, dropResult.name)
  }

  return (
    <Wrapper backend={HTML5Backend}>
      <div className={styles.artboard}>
        <header className={styles.header}/>
        <aside className={styles.sidebarLeft}>
          <div>
            <button onClick={previousPage} disabled={props.page === 0}>-</button>
            <button onClick={nextPage} disabled={props.page === slideData.length - 1}>+</button>
          </div>
          {slides(props.content, props.page, styles.sidebar, props.goToPage)}
        </aside>
        <aside className={styles.sidebarRight}>
          <Droppable name='Title'
                     type={ItemTypes.Title}
                     onDrop={handleDrop}>
            <Title children='Lorem ipsum'/>
          </Droppable>
          <Droppable name='Subtitle'
                     type={ItemTypes.Subtitle}
                     onDrop={handleDrop}>
            <Subtitle children='Lorem ipsum'/>
          </Droppable>
          <Droppable name='Text'
                     type={ItemTypes.Text}
                     onDrop={handleDrop}>
            <Text children='Lorem ipsum'/>
          </Droppable>
          <Droppable name='Code'
                     type={ItemTypes.Code}
                     onDrop={handleDrop}>
            <Code children='Lorem ipsum'/>
          </Droppable>
        </aside>
        <div className={styles.dekkWrapper}>
          <Deck className={styles.dekk}
                page={props.page}
                slave>
            {slides(props.content)}
          </Deck>
        </div>
      </div>
    </Wrapper>
  )
}

Dekk.propTypes = {
  page: PropTypes.number,
  goToPage: PropTypes.func
}


Dekk = connect(state => state, {goToPage, slideContent})(Dekk)


const App = () => {
  return (
    <Provider store={store}>
      <Dekk/>
    </Provider>
  )
}

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
