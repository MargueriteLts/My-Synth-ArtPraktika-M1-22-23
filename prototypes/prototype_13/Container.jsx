import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'
import SC_ToggleButtonSet from './SC_ToggleButtonSet'
import SC_Slider from './SC_Slider'

let synth1
let channel1
let synth2
let channel2
let pingPongDelay
let freeverb
let jcReverb
let chorus
let vibrato


export default class Container extends Component {
  constructor(props) {
    super(props)

    const synthSettings1 = {
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
        type: 'sine',
        modulationType: 'sine',
        //partialCount: 0.
        //partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synthSettings2 = {
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
        type: 'sine',
        modulationType: 'sine',
        //partialCount: 0.
        //partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const channelSettings1 = {
      volume: 0,
      pan: 0,
      mute: false,
      solo: false
    }
    const channelSettings2 = {
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

    const vibratoSettings = {
      wet: 1,
      maxDelay: 0.05,
      frequency: 50,
      depth: 0.1,
      type: 'sine'
    }



    this.state = {
      synthSettings1,
      channelSettings1,
      synthSettings2,
      channelSettings2,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings,
      vibratoSettings
    }
  }

  handleStart = () => {
    const {
      synthSettings1,
      channelSettings1,
      synthSettings2,
      channelSettings2,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings,
      vibratoSettings
    } = this.state

    synth1 = new Tone.Synth(synthSettings1)
    synth2 = new Tone.Synth(synthSettings2)
    channel1 = new Tone.Channel(channelSettings1).toDestination()
    channel2 = new Tone.Channel(channelSettings2).toDestination()

    pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)
    freeverb = new Tone.Freeverb(freeverbSettings)
    jcReverb = new Tone.JCReverb(jcReverbSettings)
    chorus = new Tone.Chorus(chorusSettings).start()
    vibrato = new Tone.Vibrato(vibratoSettings)

    synth1.chain(
      pingPongDelay,
      freeverb,
      jcReverb,
      chorus,
      vibrato,
      channel1
    )
    synth2.chain(
      pingPongDelay,
      freeverb,
      jcReverb,
      chorus,
      // vibrato,
      channel2
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

///////////          POUR 2 SYNTH COMMENT FAIRE????            /////////////////////
    const part1 = new Tone.Part((time, note) => {
      synth1.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    const part2 = new Tone.Part((time, note) => {
      synth2.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    part1.loopEnd = '2m'
    part2.loopEnd = '2m'
    part1.loop = true
    part2.loop = true
    Tone.Transport.start()
///////////////////////////////////////////////////////////////////////////
  }

/////////////////// SI JUSTE BOUTON
  // handleMute = () => {
  //   const { channelSettings1, channelSettings2 } = this.state
  //   channel1.mute = true
  //   channelSettings1.mute = true
  //   channel2.mute = true
  //   channelSettings2.mute = true
  //
  //   this.setState({
  //     channelSettings1,
  //     channelSettings2
  //   })
  // }

  handleMute = (property, value) => {
    const { channelSettings1, channelSettings2 } = this.state

    channel1.mute = value
    channelSettings1.mute = value
    channel2.mute = value
    channelSettings2.mute = value

    this.setState({
      channelSettings1,
      channelSettings2
    })
  }

  HandleChangeParam = (property, value) => {
    const {
      synthSettings1,
      synthSettings2,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings,
      vibratoSettings
    } = this.state

    if (property === "type") {
      synth1.oscillator.type = value
      synthSettings1.oscillator.type = value
    }
    if (property === "type") {
      synth2.oscillator.type = value
      synthSettings2.oscillator.type = value
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
    if (property === "wetvibrato") {
      vibrato.wet.value = value
      vibratoSettings.wet = value
    }

    this.setState({
      synthSettings1,
      synthSettings2,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings,
      vibratoSettings
    })
  }

  render() {
    const {
      synthSettings1,
      synthSettings2,
      channelSettings1,
      pingPongDelaySettings,
      freeverbSettings,
      jcReverbSettings,
      chorusSettings,
      vibratoSettings
    } = this.state

    const options = ['sine', 'square', 'sawtooth', 'triangle']
    const playState = ['true', 'false']

    return (
      <div className="Frame">
        <div className="Container">
          <SC_Button
            text="Sound"
            handleClick={this.handleStart}
          />
          <SC_ToggleButtonSet
            name="Mute"
            options={playState}
            value={channelSettings1.mute}
            property="state"
            handleChange={this.handleMute}
          />
          <SC_ToggleButtonSet
            name="Etape2: Choose wave type"
            options={options}
            value={synthSettings1.oscillator.type}
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
            value={vibratoSettings.wet}
            property="wetvibrato"
            handleChange={this.HandleChangeParam}
          />
        </div>
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
            value={synthSettings2.oscillator.type}
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
            value={vibratoSettings.wet}
            property="wetvibrato"
            handleChange={this.HandleChangeParam}
          />
        </div>
      </div>
    )
  }
}
