import uuid from 'uuid/v4'
import { observable } from 'mobx'

export default class SlideModel {
  id = uuid()
  @observable title
  constructor(title) {
    this.title = title
  }
}
