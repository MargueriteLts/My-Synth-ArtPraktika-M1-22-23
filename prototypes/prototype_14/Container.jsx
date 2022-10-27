import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as myMelodySettings from './tunes/myMelody.js'

import ToneSynth from './modules/ToneSynth.jsx'
import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'

let bassSynth
let bassChannel
let bassPingPongDelay
let bassFreeverb
let bassJcReverb
let bassChorus

let myMelodySynth
let myMelodyChannel


export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      myMelodySettings
    }
  }

  handleStart = () => {
    const {
      bassSettings,
      myMelodySettings
    } = this.state

    //
    //

    //BASS///

    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChannel = new Tone.Channel(bassSettings.channel).toDestination()

    bassPingPongDelay = new Tone.PingPongDelay(bassSettings.pingPongDelay)
    bassFreeverb = new Tone.Freeverb(bassSettings.freeverb)
    bassJcReverb = new Tone.JCReverb(bassSettings.jcReverb)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()

    bassSynth.chain(
      bassPingPongDelay,
      bassFreeverb,
      bassJcReverb,
      bassChorus,
      bassChannel
    )


    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = true

    //
    //

    //MYMELODY

    myMelodySynth = new Tone.Synth(myMelodySettings.synth)
    myMelodyChannel = new Tone.Channel(myMelodySettings.channel).toDestination()

    myMelodySynth.chain(
      myMelodyChannel
    )


    const myMelodyPart = new Tone.Part((time, note) => {
      myMelodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, myMelodySettings.sequence.steps).start(0)

    myMelodyPart.loopEnd = myMelodySettings.sequence.duration
    myMelodyPart.loop = true

    //
    //


    Tone.Transport.start()

  }

  // handleMute = () => {
  //   const { channelSettings } = this.state
  //   channel.mute = true
  //   channelSettings.mute = true
  //
  //   this.setState({
  //     channelSettings
  //   })
  // }

  handleBassChangeParam = (property, value) => {
    const {
      bassSettings
    } = this.state

    if (property === "synthType") {
      bassSynth.oscillator.type = value
      bassSettings.synth.oscillator.type = value
    }
    if (property === "synthEnvelopeAttack") {
      bassSynth.envelope.attack = value
      bassSettings.synth.envelope.attack = value
    }
    if (property === "synthEnvelopeDecay") {
      bassSynth.envelope.decay = value
      bassSettings.synth.envelope.decay = value
    }
    if (property === "synthEnvelopeSustain") {
      bassSynth.envelope.sustain = value
      bassSettings.synth.envelope.sustain = value
    }
    if (property === "synthEnvelopeRelease") {
      bassSynth.envelope.release = value
      bassSettings.synth.envelope.release = value
    }
    if (property === "wetDelay") {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    }
    if (property === "wetFreeverb") {
      bassFreeverb.wet.value = value
      bassSettings.freeverb.wet = value
    }
    if (property === "wetjcReverb") {
      bassJcReverb.wet.value = value
      bassSettings.jcReverb.wet = value
    }
    if (property === "wetchorus") {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    }

    this.setState({
      bassSettings
    })
  }

  handleMelodyChangeParam = (property, value) => {
    const {
      myMelodySettings
    } = this.state

    if (property === "type") {
      myMelodySynth.oscillator.type = value
      myMelodySettings.synth.oscillator.type = value
    }
    if (property === "synthEnvelopeAttack") {
      myMelodySynth.envelope.attack = value
      myMelodySettings.synth.envelope.attack = value
    }
    if (property === "synthEnvelopeDecay") {
      myMelodySynth.envelope.decay = value
      myMelodySettings.synth.envelope.decay = value
    }
    if (property === "synthEnvelopeSustain") {
      myMelodySynth.envelope.sustain = value
      myMelodySettings.synth.envelope.sustain = value
    }
    if (property === "synthEnvelopeRelease") {
      myMelodySynth.envelope.release = value
      myMelodySettings.synth.envelope.release = value
    }

    this.setState({
      myMelodySettings
    })
  }

  render() {
    const {
      bassSettings,
      myMelodySettings
    } = this.state

    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="Container">
        <SC_Button
          text="Sound"
          handleClick={this.handleStart}
        />
        <SC_Button
          text="Mute"
          handleClick={this.handleMute}
        />
        <ToneSynth
          settings={bassSettings}
          handleChangeParam={this.handleBassChangeParam}
        />
        <ToneSynth
          settings={myMelodySettings}
          handleChangeParam={this.handleMelodyChangeParam}
        />
        <SC_Slider
          name="PingPongDelay"
          min={0}
          max={1}
          step={0.01}
          value={bassSettings.pingPongDelay.wet}
          property="wetDelay"
          handleChange={this.handleBassChangeParam}
        />
        <SC_Slider
          name="Freeverb"
          min={0}
          max={1}
          step={0.01}
          value={bassSettings.jcReverb.wet}
          property="wetjcReverb"
          handleChange={this.handleBassChangeParam}
        />
        <SC_Slider
          name="Chorus"
          min={0}
          max={1}
          step={0.01}
          value={bassSettings.chorus.wet}
          property="wetchorus"
          handleChange={this.handleBassChangeParam}
        />
      </div>

    )
  }
}
