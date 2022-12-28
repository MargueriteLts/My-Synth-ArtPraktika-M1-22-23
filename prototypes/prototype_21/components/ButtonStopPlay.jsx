import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class ButtonStopPlay extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleClick, isRed } = this.props

    const classes = classnames({
      ButtonStopPlay: true,
      isPlaying: isRed
    })

    return <div className={classes} onClick={handleClick}></div>
  }
}
