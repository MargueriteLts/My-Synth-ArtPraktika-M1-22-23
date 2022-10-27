import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'

export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const synthSettings = {
      volume: 0,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'sawtooth',
        modulationType: 'sine',
        //partialCount: 0.
        //partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synth = new Tone.Synth(synthSettings)

//DISTORTION

    // const distortionSettings = {
    //   wet: 1,
    //   distortion: 1,
    //   oversample: '4x'
    // }
    //
    // const distortion = new Tone.Distortion(distortionSettings).toDestination()


//CHORUS

    const chorusSettings = {
      wet: 1,
      type: 'sine',
      frequency: 0.1,
      delayTime: 1,
      depth: 100,
      spread: 180
    }

    const chorus = new Tone.Chorus(chorusSettings).start()

//PINGPONG

    const pingPongDelaySettings = {
      wet: 1,
      delayTime: 0.01,
      maxDelayTime: 5
    }

    const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)

//JCREVERB #ILIKEIT

    // const jcReverbSettings = {
    //   wet: 1,
    //   roomSize: 0.9
    // }
    //
    // const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()


//FREEVERB

    // const freeverbSettings = {
    //   wet: 1,
    //   roomSize: 0.2,
    //   dampening: 100
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

//CHANNEL

    const channelSettings = {
      volume: 0,
      pan: 0,
      mute: false,
      solo: false
    }
    const channel = new Tone.Channel(channelSettings).toDestination()

//SYNTH

    synth.chain(chorus, pingPongDelay, channel)

    // synth.triggerAttackRelease("C4", "1")

//MELODY

    const sequence = [
      {
        time: '0:0:0',
        noteName: 'F3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:0:2',
        noteName: 'C4',
        duration: '1n',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'A3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'B3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:1',
        noteName: 'D4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:2',
        noteName: 'B3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:0',
        noteName: 'A#5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:2',
        noteName: 'F#5',
        duration: '4n',
        velocity: 0.7
      },
      {
        time: '1:1:3',
        noteName: 'C#5',
        duration: '4n',
        velocity: 0.8
      },
      {
        time: '1:2:0',
        noteName: 'A#5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:0',
        noteName: 'B5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:2',
        noteName: 'D#5',
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

    //длительность партии
    part.loopEnd = '2m'

    //включаем зацикливание
    part.loop = true

    //включаем звук в браузере
    // sampler.context.resume()

    //включаем отсчёт времени в Tone.js
    Tone.Transport.start()

  }

  render() {
    return (
      <div className="Container">
        <SC_Button
          text="Sound"
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}
