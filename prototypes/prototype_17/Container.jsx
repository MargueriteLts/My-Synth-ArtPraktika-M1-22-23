import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import Channel from './modules/Channel.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'

let bassSynth
let bassChorus
let bassPingPongDelay
let bassChannel

let melodySynth
let melodyChorus
let melodyPingPongDelay
let melodyChannel

let samplerChannel

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      melodySettings,
      drumsSettings
    }
  }

  handleStart = () => {
    const { bassSettings, melodySettings, drumsSettings } = this.state


    //////BASS/////////////////////

    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()

    bassPingPongDelay = new Tone.PingPongDelay(
      bassSettings.pingPongDelay
    )

    bassChannel = new Tone.Channel(bassSettings.channel).toDestination()

    bassSynth.chain(bassChorus, bassPingPongDelay, bassChannel)

    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = bassSettings.sequence.loop


    //////MELODY///////////////

    melodySynth = new Tone.Synth(melodySettings.synth)
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start()

    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    )

    melodyChannel = new Tone.Channel(melodySettings.channel).toDestination()

    melodySynth.chain(melodyChorus, melodyPingPongDelay, melodyChannel)

    const melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings.sequence.steps).start(0)

    melodyPart.loopEnd = melodySettings.sequence.duration
    melodyPart.loop = melodySettings.sequence.loop


    //////DRUMS////////////////////

    const sampler = new Tone.Sampler({
      urls: {
        A1: '00001-Linn-9000-BassDrumrum1.mp3',
        A2: '00017-Linn-9000-Snare.mp3'
      },
      baseUrl: 'http://localhost:3000/samples/'
    })

    samplerChannel = new Tone.Channel(drumsSettings.channel).toDestination()

    sampler.chain(samplerChannel)

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, drumsSettings.sequence.steps).start(0)

    drumsPart.loopEnd = drumsSettings.sequence.duration
    drumsPart.loop = drumsSettings.sequence.loop

    Tone.Transport.start()
  }

  handleBassValueChange = (property, value) => {
    const { bassSettings } = this.state

    if (property === 'synthType') {
      bassSynth.oscillator.type = value
      bassSettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      bassSynth.envelope.attack = value
      bassSettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      bassSynth.envelope.decay = value
      bassSettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      bassSynth.envelope.sustain = value
      bassSettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      bassSynth.envelope.release = value
      bassSettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    } else if (property === 'channelVolume') {
      bassChannel.volume.value = value
      drumsSettings.channel.volume = value
    } else if (property === 'channelMute') {
      bassChannel.mute = value
      bassSettings.channel.mute = value
    }

    this.setState({
      bassSettings
    })
  }

  handleMelodyValueChange = (property, value) => {
    const { melodySettings } = this.state

    if (property === 'synthType') {
      melodySynth.oscillator.type = value
      melodySettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      melodySynth.envelope.attack = value
      melodySettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      melodySynth.envelope.decay = value
      melodySettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      melodySynth.envelope.sustain = value
      melodySettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      melodySynth.envelope.release = value
      melodySettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      melodyPingPongDelay.wet.value = value
      melodySettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      melodyChorus.wet.value = value
      melodySettings.chorus.wet = value
    } else if (property === 'channelVolume') {
      melodyChannel.volume.value = value
      melodySettings.channel.volume = value
    } else if (property === 'channelMute') {
      melodyChannel.mute = value
      melodySettings.channel.mute = value
    }

    this.setState({
      melodySettings
    })
  }

  handleDrumsValueChange = (property, value) => {
    const { drumsSettings } = this.state

    if (property === 'channelVolume') {
      samplerChannel.volume.value = value
      drumsSettings.channel.volume = value
    } else if (property === 'channelMute') {
      samplerChannel.mute = value
      drumsSettings.channel.mute = value
    }

    this.setState({
      drumsSettings
    })
  }

  render() {
    const { bassSettings, melodySettings, drumsSettings } = this.state

    return (
        <div className="Frame">
          <div className="title">
            <img src={"../.././assets/images/title.svg"} alt="Title" />
          </div>
          <div className="Container">
            <SC_Button
              text="1"
              handleClick={this.handleStart}
            />
            <Channel
              text="Bass Volume 1"
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <SC_Slider
              name="Delay Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.pingPongDelay.wet}
              property="pingPongDelayWet"
              handleChange={this.handleValueChange}
            />
            <SC_Slider
              name="Chorus Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.chorus.wet}
              property="chorusWet"
              handleChange={this.handleValueChange}
            />
            <Channel
              text="Melody Volume"
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <Channel
              text="Drums Volume"
              settings={drumsSettings}
              handleValueChange={this.handleDrumsValueChange}
            />
          </div>
          <div className="Container">
            <SC_Button
              text="2"
              handleClick={this.handleStart}
            />
            <Channel
              text="Bass Volume 2"
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <SC_Slider
              name="Delay Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.pingPongDelay.wet}
              property="pingPongDelayWet"
              handleChange={this.handleValueChange}
            />
            <SC_Slider
              name="Chorus Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.chorus.wet}
              property="chorusWet"
              handleChange={this.handleValueChange}
            />
            <Channel
              text="Melody Volume"
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <Channel
              text="Drums Volume"
              settings={drumsSettings}
              handleValueChange={this.handleDrumsValueChange}
            />
          </div>
          <div className="Container">
            <SC_Button
              text="3"
              handleClick={this.handleStart}
            />
            <Channel
              text="Bass Volume 3"
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <SC_Slider
              name="Delay Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.pingPongDelay.wet}
              property="pingPongDelayWet"
              handleChange={this.handleValueChange}
            />
            <SC_Slider
              name="Chorus Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.chorus.wet}
              property="chorusWet"
              handleChange={this.handleValueChange}
            />
            <Channel
              text="Melody Volume"
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <Channel
              text="Drums Volume"
              settings={drumsSettings}
              handleValueChange={this.handleDrumsValueChange}
            />
          </div>
          <div className="Container">
            <SC_Button
              text="4"
              handleClick={this.handleStart}
            />
            <Channel
              text="Bass Volume 4"
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <SC_Slider
              name="Delay Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.pingPongDelay.wet}
              property="pingPongDelayWet"
              handleChange={this.handleValueChange}
            />
            <SC_Slider
              name="Chorus Wet"
              min={0}
              max={1}
              step={0.01}
              value={bassSettings.chorus.wet}
              property="chorusWet"
              handleChange={this.handleValueChange}
            />
            <Channel
              text="Melody Volume"
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <Channel
              text="Drums Volume"
              settings={drumsSettings}
              handleValueChange={this.handleDrumsValueChange}
            />
          </div>
        </div>
    )
  }
}

// <Channel
//   settings={drumsSettings}
//   handleValueChange={this.handleDrumsValueChange}
// />

// <Channel
//   text="All Channel"
//   settings={drumsSettings, melodySettings, bassSettings}
//   handleValueChange={this.handleDrumsValueChange, this.handleMelodyValueChange, this.handleBassValueChange}
// />

//<Channel
//   settings={drumsSettings}
//   handleValueChange={this.handleDrumsValueChange}
// />
// <Channel
//   settings={melodySettings}
//   handleValueChange={this.handleMelodyValueChange}
// />
// <Channel
//   settings={bassSettings}
//   handleValueChange={this.handleBassValueChange}
// />
