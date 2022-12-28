import React, { PureComponent } from 'react'

export default class MelodyButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick } = this.props

    return (
      <div className="MelodyButton" onClick={handleClick}>
        {text}
      </div>
    )
  }
}
