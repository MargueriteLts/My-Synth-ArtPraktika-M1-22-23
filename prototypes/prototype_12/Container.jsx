import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'
import SC_ToggleButtonSet from './SC_ToggleButtonSet'
import SC_Slider from './SC_Slider'

let synth
let channel
let pingPongDelay
let freeverb
let jcReverb
let chorus


export default class Container extends Component {
  constructor(props) {
    super(props)

    const synthSettings = {
      volume: 0,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.1,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'square',
        modulationType: 'sine',
        //partialCount: 0.
        //partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const channelSettings = {
      volume: 0,
      pan: 0,
      mute: false,
      solo: false
    }

    const pingPongDelaySettings = {
      wet: 0,
      delayTime: 0.1,
      maxDelayTime: 5
    }

    const freeverbSettings = {
      wet: 0,
      roomSize: 0.2,
      dampening: 100
    }

    const jcReverbSettings = {
      wet: 0,
      roomSize: 0.5
    }

    const chorusSettings = {
      wet: 0,
      type: 'sine',
      frequency: 0.1,
      delayTime: 1,
      depth: 100,
      spread: 180
    }

    this.state = {
      channelSettings,
      synthSettings,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings
    }
  }

  handleStart = () => {
    const {
      synthSettings,
      channelSettings,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings
    } = this.state

    synth = new Tone.Synth(synthSettings)
    channel = new Tone.Channel(channelSettings).toDestination()

    pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)
    freeverb = new Tone.Freeverb(freeverbSettings)
    jcReverb = new Tone.JCReverb(jcReverbSettings)
    chorus = new Tone.Chorus(chorusSettings).start()

    synth.chain(
      pingPongDelay,
      freeverb,
      jcReverb,
      chorus,
      channel
    )


//DISTORTION

    // const distortionSettings = {
    //   wet: 1,
    //   distortion: 1,
    //   oversample: '4x'
    // }
    //
    // const distortion = new Tone.Distortion(distortionSettings).toDestination()

//MELODY

    const sequence = [
      {
        time: '0:0:0',
        noteName: 'F3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'C4',
        duration: '1n',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'A3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'B3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:0',
        noteName: 'D4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:2:0',
        noteName: 'B3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:0',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      }
    ]

    const part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    part.loopEnd = '2m'
    part.loop = true
    Tone.Transport.start()

  }

  handleMute = () => {
    const { channelSettings } = this.state
    channel.mute = true
    channelSettings.mute = true

    this.setState({
      channelSettings
    })
  }

  HandleChangeParam = (property, value) => {
    const {
      synthSettings,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings
    } = this.state

    if (property === "type") {
      synth.oscillator.type = value
      synthSettings.oscillator.type = value
    }
    if (property === "wetDelay") {
      pingPongDelay.wet.value = value
      pingPongDelaySettings.wet = value
    }
    if (property === "wetFreeverb") {
      freeverb.wet.value = value
      freeverbSettings.wet = value
    }
    if (property === "wetjcReverb") {
      jcReverb.wet.value = value
      jcReverbSettings.wet = value
    }
    if (property === "wetchorus") {
      chorus.wet.value = value
      chorusSettings.wet = value
    }

    this.setState({
      synthSettings,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings
    })
  }

  render() {
    const {
      synthSettings,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings
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
        <SC_ToggleButtonSet
          name="Etape2: Choose wave type"
          options={options}
          value={synthSettings.oscillator.type}
          property="type"
          handleChange={this.HandleChangeParam}
        />
        <SC_Slider
          name="PingPongDelay"
          min={0}
          max={1}
          step={0.01}
          value={pingPongDelaySettings.wet}
          property="wetDelay"
          handleChange={this.HandleChangeParam}
        />
        <SC_Slider
          name="Freeverb"
          min={0}
          max={1}
          step={0.01}
          value={jcReverbSettings.wet}
          property="wetjcReverb"
          handleChange={this.HandleChangeParam}
        />
        <SC_Slider
          name="Chorus"
          min={0}
          max={1}
          step={0.01}
          value={chorusSettings.wet}
          property="wetchorus"
          handleChange={this.HandleChangeParam}
        />
      </div>

    )
  }
}
