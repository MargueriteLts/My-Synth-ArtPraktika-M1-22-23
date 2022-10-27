import React, { PureComponent } from 'react'

export default class SC_ButtonBig extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick } = this.props

    return (
      <div className="SC_ButtonBig" onClick={handleClick}>
        {text}
      </div>
    )
  }
}
