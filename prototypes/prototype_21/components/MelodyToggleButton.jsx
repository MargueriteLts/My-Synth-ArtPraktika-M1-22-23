import classnames from 'classnames'
import React, { PureComponent } from 'react'

// const classes = classnames({})

export default class MelodyToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleClick, isOn, class1, class2 } = this.props

    const classes = classnames({
      MelodyToggleButton: true,
      active: isOn,
      ButtonMelody1: class1,
      ButtonMelody2: class2
    })

    return <div className={classes} onClick={handleClick}></div>
  }
}
