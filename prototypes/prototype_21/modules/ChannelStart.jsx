import React, { Component } from 'react'

import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import MelodyToggleButton from '../components/MelodyToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ChannelStart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, melody1, melody2, settings, handleValueChange } = this.props

    return (
      <div className="ChannelStart">
        <MelodyToggleButton
          isOn={settings.channel.mute}
          class1={melody1}
          class2={melody2}
          handleClick={() =>
            handleValueChange('channelMute', !settings.channel.mute)
          }
        />
        <SC_Slider
          name={name}
          min={-60}
          max={10}
          step={1}
          value={settings.channel.volume}
          property="channelVolume"
          handleChange={handleValueChange}
        />
      </div>
    )
  }
}
