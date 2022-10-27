import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as myMelodySettings from './tunes/myMelody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import Channel from './modules/Channel.jsx'

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

let samplerChannel


export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      myMelodySettings,
      drumsSettings
    }
  }

  handleStart = () => {
    const {
      bassSettings,
      myMelodySettings,
      drumsSettings
    } = this.state

    ///////////////////////////////
    /////////////////////////////

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

    /////////////////////////
    ///////////////////////

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

    /////////////////////////
    /////////////////////////

    //DRUMS

    const sampler = new Tone.Sampler({
    	urls: {
    		A1: "00016-Linn-9000-Snare-2.mp3",
    		A2: "00009-Linn-9000-Kick.mp3",
    	},
    	baseUrl: "http://localhost:3000/samples/",
    	// onload: () => {
    	// 	sampler.triggerAttackRelease(["A1", "A2", "A1", "A2"], 0.5);
    	// }
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
    drumsPart.loop = true

    ////////////////////////////////////

    Tone.Transport.start()

  }//END HANDLE START

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

  handleDrumsChangeParam = (property, value) => {
    const {
      drumsSettings
    } = this.state

    if (property === "ChannelVolume") {
      samplerChannel.volume.value = value
      drumsSettings.channel.volume = value
    }
    if (property === "ChannelMute") {
      samplerChannel.mute = value
      drumsSettings.channel.mute = value
    }

    this.setState({
      drumsSettings
    })
  }



  render() {
    const {
      bassSettings,
      myMelodySettings,
      drumsSettings
    } = this.state


    return (
      <div className="Container">
        <SC_Button
          text="Sound"
          handleClick={this.handleStart}
        />

        <ToneSynth
          settings={bassSettings}
          handleChangeParam={this.handleBassChangeParam}
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
        
        <ToneSynth
          settings={myMelodySettings}
          handleChangeParam={this.handleMelodyChangeParam}
        />


        <Channel
          settings={drumsSettings}
          handleChangeParam={this.handleDrumsChangeParam}
        />
      </div>
    )
  }
}
