import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'
import Select from '../components/Select.jsx'

export default class ToneSynthWithDropDown extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  renderEnvelopeControls = () => {
    const { settings, handleValueChange } = this.props

    return (
      <div>
        <SC_Slider
          name="Synth Envelope Attack"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.attack}
          property="synthEnvelopeAttack"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Decay"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.decay}
          property="synthEnvelopeDecay"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }

  render() {
    const {
      settings,
      instrumentName,
      selectWaveTypeOpen,
      waveType
    } = this.props

    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="ToneSynth">
        <Select
          name={`${instrumentName} synth wave type`}
          options={options}
          isOpened={selectWaveTypeOpen}
          value={waveType}
          property="synthType"
          handleSelectOpen={this.handleSelectOpen}
          handleChange={this.handleChangeWaveType}
        />

        <br />

        <SC_ToggleButton
          text="Envelope"
          isOn={settings.synthUI.envelopeShow}
          handleClick={() =>
            this.handleValueChange(
              'synthShowEnvelope',
              !settings.synthUI.envelopeShow
            )
          }
        />

        {settings.synthUI.envelopeShow ? this.renderEnvelopeControls() : ''}
      </div>
    )
  }
}
