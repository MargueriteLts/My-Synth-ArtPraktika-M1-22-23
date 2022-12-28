import * as Tone from 'tone'
import React, { Component } from 'react'

import imgTitle from '../../../assets/images/title.svg'

import * as bassSettings1 from './tunes/bass1.js'
import * as bassSettings2 from './tunes/bass2.js'
import * as melodySettings1 from './tunes/melody1.js'
import * as melodySettings2 from './tunes/melody2.js'

import ToneSynth from './modules/ToneSynth.jsx'
import PingPongDelayEffect from './modules/PingPongDelayEffect.jsx'
import ChorusEffect from './modules/ChorusEffect.jsx'
import Channel from './modules/Channel.jsx'
import ChannelStart from './modules/ChannelStart.jsx'

import SC_ToggleButtonSet from './components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from './components/SC_ToggleButton'
import SC_Button from './components/SC_Button'
import ButtonStartAgain from './components/ButtonStartAgain'
import ButtonStop from './components/ButtonStop'
import ButtonStopPlay from './components/ButtonStopPlay'
import SC_Slider from './components/SC_Slider'
import SC_Knob from './components/SC_Knob'
import Surface from './components/Surface'
import Select from './components/Select'

let bassSynth1
let bassPart1
let bassChannel1

let bassSynth2
let bassPart2
let bassChannel2

let melodySynth1
let melodyPart1
let melodyChannel1
let melodyPingPongDelay1

let melodySynth2
let melodyPart2
let melodyChannel2
let melodyPingPongDelay2

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStarted: false,
      isUIShown: false,
      isSurfaceShown: false,
      isBackgroundOn: false,
      bpm: 80,
      melodySettings1,
      melodySettings2,
      bassSettings1,
      bassSettings2
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)

    document.addEventListener(
      'click',
      this.handleMelodyChangeMeasureSelectClose
    )
  }

  handleKeydown = (e) => {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 49:
        this.handleMelodySequenceChange('', 'steps1')
        break
      case 50:
        this.handleMelodySequenceChange('', 'steps2')
        break
      case 81:
        sampler.triggerAttackRelease('A3', '1n')
        break
    }
  }

  handleStart = () => {
    const {
      melodySettings1,
      melodySettings2,
      bassSettings1,
      bassSettings2,
      isUIShown,
      isStarted,
      isBackgroundOn,
      isOn
    } = this.state

    //////////////////// BASS 1 ////////////////

    bassSynth1 = new Tone.Synth(bassSettings1.synth)

    bassChannel1 = new Tone.Channel(bassSettings1.channel).toDestination()

    bassSynth1.chain(bassChannel1)

    bassPart1 = new Tone.Part((time, note) => {
      bassSynth1.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings1.sequence.steps1).start(0)

    bassPart1.loopEnd = bassSettings1.sequence.duration
    bassPart1.loop = bassSettings1.sequence.loop

    //////////////////// BASS 2 ////////////////

    bassSynth2 = new Tone.Synth(bassSettings2.synth)

    bassChannel2 = new Tone.Channel(bassSettings2.channel).toDestination()

    bassSynth2.chain(bassChannel2)

    bassPart2 = new Tone.Part((time, note) => {
      bassSynth2.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings2.sequence.steps1).start(0)

    bassPart2.loopEnd = bassSettings2.sequence.duration
    bassPart2.loop = bassSettings2.sequence.loop

    /////////// MELODY1 /////////////////

    melodySynth1 = new Tone.Synth(melodySettings1.synth)
    melodyPingPongDelay1 = new Tone.PingPongDelay(melodySettings1.pingPongDelay)

    melodyChannel1 = new Tone.Channel(melodySettings1.channel).toDestination()

    melodySynth1.chain(melodyPingPongDelay1, melodyChannel1)

    melodyPart1 = new Tone.Part((time, note) => {
      melodySynth1.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings1.sequence[melodySettings1.sequence.current]).start(0)

    melodyPart1.loopEnd = melodySettings1.sequence.duration
    melodyPart1.loop = melodySettings1.sequence.loop

    /////////////////// MELODY2 /////////////////

    melodySynth2 = new Tone.Synth(melodySettings2.synth)
    melodyPingPongDelay2 = new Tone.PingPongDelay(melodySettings2.pingPongDelay)

    melodyChannel2 = new Tone.Channel(melodySettings2.channel).toDestination()

    melodySynth2.chain(melodyPingPongDelay2, melodyChannel2)

    melodyPart2 = new Tone.Part((time, note) => {
      melodySynth2.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings2.sequence[melodySettings2.sequence.current]).start(0)

    melodyPart2.loopEnd = melodySettings2.sequence.duration
    melodyPart2.loop = melodySettings2.sequence.loop

    ////////////////////////

    this.handleTransportChange('play', true)
    this.setState({
      isUIShown: !isUIShown,
      isStarted: true,
      isBackgroundOn: true,
      isOn: true
    })
  }

  handleStop = () => {
    this.handleTransportChangeAgain('stop', true)
  }

  handleStartAgain = () => {
    this.handleTransportChangeAgain('play', true)
  }

  handleTransportChangeAgain = (property, value) => {
    switch (property) {
      case 'play':
        Tone.Transport.start()
        this.setState({
          isOn: true
        })
        break
      case 'stop':
        Tone.Transport.stop()
        this.setState({
          isOn: false
        })
        break
    }
  }

  handleTransportChange = (property, value) => {
    const { bpm } = this.state

    switch (property) {
      case 'play':
        Tone.Transport.start()
        Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')

        this.setState({
          isStarted: true
        })
        break
      case 'bpm':
        Tone.Transport.bpm.value = value

        this.setState({
          bpm: value
        })
        break
    }
  }

  handleValueChange = (instrumentName, property, value) => {
    const {
      melodySettings1,
      melodySettings2,
      bassSettings1,
      bassSettings2
    } = this.state

    let instrument
    let settings

    if (instrumentName === 'bass1') {
      instrument = bassSynth1
      settings = bassSettings1
    } else if (instrumentName === 'bass2') {
      instrument = bassSynth2
      settings = bassSettings2
    } else if (instrumentName === 'melody1') {
      instrument = melodySynth1
      settings = melodySettings1
    } else if (instrumentName === 'melody2') {
      instrument = melodySynth2
      settings = melodySettings2
    }
    // else if (instrumentName === 'melodyChannel1') {
    //   instrument = melodyChannel1
    //   settings = melodySettings1
    // } else if (instrumentName === 'melodyChannel2') {
    //   instrument = melodyChannel2
    //   settings = melodySettings2
    // }

    switch (property) {
      case 'synthType':
        instrument.oscillator.type = value
        settings.synth.oscillator.type = value
        break
      case 'synthShowEnvelope':
        settings.synthUI.envelopeShow = value
        break
      case 'synthEnvelopeAttack':
        instrument.envelope.attack = value
        settings.synth.envelope.attack = value
        break
      case 'synthEnvelopeDecay':
        instrument.envelope.decay = value
        settings.synth.envelope.decay = value
        break
      case 'synthEnvelopeSustain':
        instrument.envelope.sustain = value
        settings.synth.envelope.sustain = value
        break
      case 'synthEnvelopeRelease':
        instrument.envelope.release = value
        settings.synth.envelope.release = value
        break
      // case 'channelVolume':
      //   instrument.volume.value = value
      //   settings.channel.volume = value
      //   break
      // case 'channelMute':
      //   instrument.mute = value
      //   settings.channel.mute = value
      //   break
    }

    this.setState({
      melodySettings1,
      melodySettings2,
      bassSettings1,
      bassSettings2
    })
  }

  handleChannel1 = (property, value) => {
    const { melodySettings1, bassSettings1 } = this.state

    if (property === 'channelVolume') {
      melodyChannel1.volume.value = value
      melodySettings1.channel.volume = value
      bassChannel1.volume.value = value
      bassSettings1.channel.volume = value
    } else if (property === 'channelMute') {
      melodyChannel1.mute = value
      melodySettings1.channel.mute = value
      bassChannel1.mute = value
      bassSettings1.channel.mute = value
    }

    this.setState({
      melodySettings1,
      bassSettings1
    })
  }

  handleChannel2 = (property, value) => {
    const { melodySettings2, bassSettings2 } = this.state

    if (property === 'channelVolume') {
      melodyChannel2.volume.value = value
      melodySettings2.channel.volume = value
      bassChannel2.volume.value = value
      bassSettings2.channel.volume = value
    } else if (property === 'channelMute') {
      melodyChannel2.mute = value
      melodySettings2.channel.mute = value
      bassChannel2.mute = value
      bassSettings2.channel.mute = value
    }

    this.setState({
      melodySettings2,
      bassSettings2
    })
  }

  handleBassValueChange1 = (property, value) => {
    const { bassSettings1 } = this.state

    if (property === 'channelVolume') {
      bassChannel1.volume.value = value
      bassSettings1.channel.volume = value
    } else if (property === 'channelMute') {
      bassChannel1.mute = value
      bassSettings1.channel.mute = value
    }

    this.setState({
      bassSettings1
    })
  }

  handleBassValueChange2 = (property, value) => {
    const { bassSettings2 } = this.state

    if (property === 'channelVolume') {
      bassChannel2.volume.value = value
      bassSettings2.channel.volume = value
    } else if (property === 'channelMute') {
      bassChannel2.mute = value
      bassSettings2.channel.mute = value
    }

    this.setState({
      bassSettings2
    })
  }

  handleMelodyEffectsValueChange = (property, value) => {
    const { melodySettings1, melodySettings2 } = this.state

    if (property === 'pingPongDelayWet') {
      melodyPingPongDelay1.wet.value = value
      melodySettings1.pingPongDelay.wet = value
      melodyPingPongDelay2.wet.value = value
      melodySettings2.pingPongDelay.wet = value
    } else if (property === 'melodyPingPongDelayDelayTime') {
      melodyPingPongDelay1.delayTime.value = value
      melodySettings1.pingPongDelay.delayTime = value
      melodyPingPongDelay2.delayTime.value = value
      melodySettings2.pingPongDelay.delayTime = value
    } else if (property === 'melodyPingPongDelayMaxDelayTime') {
      melodyPingPongDelay1.maxDelayTime = value
      melodySettings1.pingPongDelay.maxDelayTime = value
      melodyPingPongDelay2.maxDelayTime = value
      melodySettings2.pingPongDelay.maxDelayTime = value
    }

    this.setState({
      melodySettings1,
      melodySettings2
    })
  }

  handleMelodySequenceChange = (property, value) => {
    const { melodySettings1, melodySettings2 } = this.state
    const steps1 = melodySettings1.sequence[value]
    const steps2 = melodySettings2.sequence[value]

    if (property === 'melodySequence1') {
      melodySettings1.sequence.current = value
      melodyPart1.clear()

      steps1.forEach((step, i) => {
        melodyPart1.add(step)
      })
    } else if (property === 'melodySequence2') {
      melodySettings2.sequence.current = value
      melodyPart2.clear()

      steps2.forEach((step, i) => {
        melodyPart2.add(step)
      })
    }

    this.setState({
      melodySettings1,
      melodySettings2
    })
  }

  renderUI = () => {
    const {
      bpm,
      melodySettings1,
      melodySettings2,
      bassSettings1,
      bassSettings2,
      isOn
    } = this.state

    return (
      <div className="MelodiesContainer">
        {isOn ? this.renderStop() : this.renderStartAgain()}
        <div className="MelodyContainer">
          <ChannelStart
            melody1={true}
            melody2={false}
            settings={melodySettings1}
            handleValueChange={this.handleChannel1}
          />

          <SC_Slider
            name="BPM"
            min={0}
            max={300}
            step={1}
            value={bpm}
            property="bpm"
            handleChange={(property, value) => {
              this.handleTransportChange(property, value)
            }}
          />

          <ToneSynth
            instrumentName="melody1"
            settings={melodySettings1}
            handleValueChange={this.handleValueChange}
          />

          <SC_ToggleButtonSet
            name="Melody1 Sequence"
            options={['steps1', 'steps2']}
            value={melodySettings1.sequence.current}
            property="melodySequence1"
            handleChange={this.handleMelodySequenceChange}
          />

          <ToneSynth
            instrumentName="bass1"
            settings={bassSettings1}
            handleValueChange={this.handleValueChange}
          />
          <Channel
            instrumentName="Bass 1"
            settings={bassSettings1}
            handleValueChange={this.handleBassValueChange1}
          />
        </div>

        <div className="MelodyContainer">
          <ChannelStart
            melody1={false}
            melody2={true}
            settings={melodySettings2}
            handleValueChange={this.handleChannel2}
          />

          <SC_Slider
            name="BPM"
            min={0}
            max={300}
            step={1}
            value={bpm}
            property="bpm"
            handleChange={(property, value) => {
              this.handleTransportChange(property, value)
            }}
          />

          <ToneSynth
            instrumentName="melody2"
            settings={melodySettings2}
            handleValueChange={this.handleValueChange}
          />

          <SC_ToggleButtonSet
            name="Melody2 Sequence"
            options={['steps1', 'steps2']}
            value={melodySettings2.sequence.current}
            property="melodySequence2"
            handleChange={this.handleMelodySequenceChange}
          />

          <ToneSynth
            instrumentName="bass1"
            settings={bassSettings1}
            handleValueChange={this.handleValueChange}
          />
          <Channel
            instrumentName="Bass 2"
            settings={bassSettings2}
            handleValueChange={this.handleBassValueChange2}
          />
        </div>
      </div>
    )
  }

  renderStartAgain = () => {
    return <ButtonStopPlay isRed={false} handleClick={this.handleStartAgain} />
  }

  renderStop = () => {
    return <ButtonStopPlay isRed={true} handleClick={this.handleStop} />
  }

  renderStart = () => {
    return <div className="StartButton" onClick={this.handleStart} />
  }

  renderBackground = () => {
    return <div className="MusicContainerBackground" />
  }

  renderHeader = () => {
    return (
      <div className="Header">
        <div className="Title"></div>
        <div className="toggleUIButton" onClick={this.handleToggleUIShow}>
          Show/Hide UI to reveal other instruments
        </div>
      </div>
    )
  }

  handleToggleUIShow = () => {
    const { isUIShown, isSurfaceShown, isBackgroundOn } = this.state

    this.setState({
      isUIShown: !isUIShown,
      isSurfaceShown: !isSurfaceShown,
      isBackgroundOn: !isBackgroundOn
    })
  }

  renderSurface = () => {
    return (
      <div className="MySurface">
        <Surface
          minX="0"
          maxX="1"
          stepX="0.01"
          valueX={melodySettings1.pingPongDelay.delayTime}
          propertyX="melodyPingPongDelayDelayTime"
          minY="0"
          maxY="1"
          stepY="0.01"
          valueY={melodySettings1.pingPongDelay.maxDelayTime}
          propertyY="melodyPingPongDelayMaxDelayTime"
          handleValueChange={this.handleMelodyEffectsValueChange}
        />
      </div>
    )
  }

  render() {
    const { isStarted, isUIShown, isSurfaceShown, isBackgroundOn } = this.state

    return (
      <div className="Frame">
        {isSurfaceShown ? this.renderSurface() : ''}
        {isBackgroundOn ? this.renderBackground() : ''}
        <div className="MusicContainer">
          {isStarted ? this.renderHeader() : this.renderStart()}
          {isUIShown ? this.renderUI() : ''}
        </div>
      </div>
    )
  }
}
