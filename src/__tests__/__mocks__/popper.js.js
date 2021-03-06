// This is needed to remove a warning related to popper.js when testing reactstrap tooltips.
// More on this bug: https://github.com/react-bootstrap/react-bootstrap/issues/4997

import PopperJs from 'popper.js'

export default class Popper {
  static placements = PopperJs.placements

  constructor() {
    return {
      destroy: () => { },
      scheduleUpdate: () => { }
    }
  }
}
