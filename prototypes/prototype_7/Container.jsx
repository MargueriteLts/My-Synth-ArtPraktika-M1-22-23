import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'
import SC_ButtonBig from './SC_ButtonBig'

export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {

//SYNTH

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
        type: 'sine',
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

    // const chorusSettings = {
    //   wet: 1,
    //   type: 'triangle',
    //   frequency: 10,
    //   delayTime: 1,
    //   depth: 100,
    //   spread: 180
    // }
    //
    // const chorus = new Tone.Chorus(chorusSettings).start()

//PINGPONG

    // const pingPongDelaySettings = {
    //   wet: 1,
    //   delayTime: 0.2,
    //   maxDelayTime: 5
    // }
    //
    // const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)

//JCREVERB #ILIKEIT

    // const jcReverbSettings = {
    //   wet: 1,
    //   roomSize: 0.9
    // }
    //
    // const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()


//FREEVERB - ok

    // const freeverbSettings = {
    //   wet: 1,
    //   roomSize: 0.9,
    //   dampening: 100
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

//AUTOFILTER

    const autoFilterSettings = {
      wet: 1,
      type: 'sine',
      frequency: 1,
      depth: 1,
      baseFrequency: 500,
      octaves: 1.6,
      filter: {
        type: 'lowpass',
        frequency: 700,
        //rolloff can only be -12, -24, -48, -96
        rolloff: -12,
        Q: 1
      }
    }

    const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()

//CHANNEL

    const channelSettings = {
      volume: 0,
      pan: 0,
      mute: false,
      solo: false
    }
    const channel = new Tone.Channel(channelSettings).toDestination()

//SYNTH

    // synth.chain(chorus, freeverb, pingPongDelay, channel)
    synth.chain(autoFilterNode, channel)

    // synth.triggerAttackRelease("C4", "1")

//MELODY

    const sequence = [
      {//1
        time: '0:0:0',
        noteName: 'A#4',
        // duration: '1m',
        duration: '8n',
        // duration: '4n',
        velocity: 1
      },
      // {//2
      //   time: '0:0:1',
      //   noteName: 'F#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   // duration: '4n',
      //   velocity: 1
      // },
      {//3
        time: '0:0:2',
        noteName: 'C#4',
        // duration: '1m',
        duration: '8n',
        // duration: '4n',
        velocity: 1
      },
      // {//4
      //   time: '0:0:3',
      //   noteName: 'A#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   // duration: '4n',
      //   velocity: 1
      // },
      {//5
        time: '0:1:0',
        noteName: 'B4',
        // duration: '1m',
        duration: '8n',
        // duration: '4n',
        velocity: 1
      },
      // {//6
      //   time: '0:1:1',
      //   noteName: 'D#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   // duration: '4n',
      //   velocity: 1
      // },
      {//7
        time: '0:1:2',
        noteName: 'G#4',
        // duration: '1m',
        duration: '8n',
        // duration: '4n',
        velocity: 1
      },
      // {//8
      //   time: '0:1:3',
      //   noteName: 'B5',
      //   // duration: '1m',
      //   duration: '8n',
      //   // duration: '4n',
      //   velocity: 1
      // },
      {//9
        time: '0:2:0',
        noteName: 'C#5',
        // duration: '1m',
        duration: '8n',
        velocity: 1
      },
      //////////////////////
      // {//10
      //   time: '0:2:1',
      //   noteName: 'B5',
      //   // duration: '1m',
      //   duration: '8n',
      //   velocity: 1
      // },
      {//11
        time: '0:2:2',
        noteName: 'C#5',
        // duration: '1m',
        duration: '8n',
        velocity: 1
      },
      // {//12
      //   time: '0:2:3',
      //   noteName: 'D#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   velocity: 1
      // },
      {//13
        time: '0:3:0',
        noteName: 'G#4',
        // duration: '1m',
        duration: '8n',
        velocity: 1
      },
      // {//14
      //   time: '0:3:1',
      //   noteName: 'D#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   velocity: 1
      // },
      {//15
        time: '0:3:2',
        noteName: 'A#4',
        // duration: '1m',
        duration: '8n',
        velocity: 1
      }
      // {//16
      //   time: '0:3:3',
      //   noteName: 'F#5',
      //   // duration: '1m',
      //   duration: '8n',
      //   velocity: 1
      // }
      ///////////////////
      //
      // 0:0:0
      // 0:0:1
      // 0:0:2
      // 0:0:3
      //
      // 0:1:0
      // 0:1:1
      // 0:1:2
      // 0:1:3
      //
      // 0:2:0
      // 0:2:1
      // 0:2:2
      // 0:2:3
      //
      // 0:3:0
      // 0:3:1
      // 0:3:2
      // 0:3:3
      //
      // 1:0:0
      // 1:0:1
      // 1:0:2
      // 1:0:3
      //
      // 1:1:0
      // 1:1:1
      // 1:1:2
      // 1:1:3
      //
      // 1:2:0
      // 1:2:1
      // 1:2:2
      // 1:2:3
      //
      // 1:3:0
      // 1:3:1
      // 1:3:2
      // 1:3:3

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
    part.loopEnd = '1m'

    //включаем зацикливание
    part.loop = true

    //включаем звук в браузере
    // sampler.context.resume()

    //включаем отсчёт времени в Tone.js
    Tone.Transport.start()

  }

  render() {
    return (
      <div className="main-container">
        <div className="Frame">
          <div className="Container verticalFlex">
            <SC_Button
              text="S"
              handleClick={this.handleClick}
            />
            <SC_Button
              text="O"
              handleClick={this.handleClick}
            />
            <SC_Button
              text="U"
              handleClick={this.handleClick}
            />
            <SC_Button
              text="N"
              handleClick={this.handleClick}
            />
            <SC_Button
              text="D"
              handleClick={this.handleClick}
            />
          </div>
        </div>
        <div className="Frame">
          <div className="Container verticalFlex">
            <SC_ButtonBig
              text=""
              handleClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
