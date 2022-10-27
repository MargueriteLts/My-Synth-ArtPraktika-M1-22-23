import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'

export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const synthSettings = {
      volume: 10,
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
        type: 'triangle',
        modulationType: 'sine',
        //partialCount: 0.
        //partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    //DISTORTION

    // const distortionSettings = {
    //   wet: 1,
    //   distortion: 1,
    //   oversample: '4x'
    // }
    //
    // const distortion = new Tone.Distortion(distortionSettings).toDestination()


    //CHORUS

    // const chorusSettings = {
    //   wet: 1,
    //   type: 'sawtooth',
    //   frequency: 0.1,
    //   delayTime: 1,
    //   depth: 100,
    //   spread: 180
    // }
    //
    // const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start()

    //PINGPONG

    // const pingPongDelaySettings = {
    //   wet: 1,
    //   delayTime: 0.2,
    //   maxDelayTime: 5
    // }
    //
    // const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings).toDestination()

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
    // const freeverb = new Tone.Freeverb(freeverbSettings).toDestination()

    const synth = new Tone.Synth(synthSettings).connect(freeverb)
    // const synth = new Tone.Synth(synthSettings).toDestination()
    synth.triggerAttackRelease("C4", "1")
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
