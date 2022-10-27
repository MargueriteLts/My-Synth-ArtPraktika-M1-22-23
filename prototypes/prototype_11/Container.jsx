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
      volume: -5,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.1,
        attackCurve: 'exponential',
        decay: 1,
        decayCurve: 'exponential',
        sustain: 1,
        release: 0.1,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'triangle',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synth = new Tone.Synth(synthSettings)


/////EFFECTS///////

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
    //   dampening: 30
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

//AUTOFILTER

    // const autoFilterSettings = {
    //   wet: 1,
    //   type: 'sine',
    //   frequency: 1,
    //   depth: 1,
    //   baseFrequency: 200,
    //   octaves: 2.6,
    //   filter: {
    //     type: 'lowpass',
    //     frequency: 100,
    //     rolloff: -12,
    //     Q: 1
    //   }
    // }
    //
    // const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()

//AUTOWAH

    const autoWahSettings = {
      wet: 1,
      baseFrequency: 300,
      octaves: 4,
      sensitivity: 10,
      Q: 5,
      gain: 6,
      follower: 0.8
    }

    const autoWahNode = new Tone.AutoWah(autoWahSettings)

//VIBRATO

    const vibratoSettings = {
      wet: 1,
      maxDelay: 0.05,
      frequency: 50,
      depth: 0.5,
      type: 'sine'
    }

    const vibrato = new Tone.Vibrato(vibratoSettings)

///////CHANNEL/////////////////////

    const channelSettings = {
      volume: 0,
      pan: 0,
      mute: false,
      solo: false
    }

    const channel = new Tone.Channel(channelSettings).toDestination()

//SYNTH////////////////

    synth.chain(
      autoWahNode,
      // autoFilterNode,
      // chorus,
      // freeverb,
      // pingPongDelay,
      // vibrato,
      channel
    )

    // synth.triggerAttackRelease("C4", "1")

//MELODY

    const sequence = [
      {//1
        time: '0:0:0',
        noteName: 'C4',
        duration: '8n',
        velocity: 1
      },
      // {//2
      //   time: '0:0:1',
      //   noteName: 'C4',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//3
        time: '0:0:2',
        noteName: 'C4',
        duration: '16n',
        velocity: 1
      },
      // {//4
      //   time: '0:0:3',
      //   noteName: 'A3',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//5
        time: '0:1:0',
        noteName: 'B3',
        duration: '8n',
        velocity: 1
      },
      // {//6
      //   time: '0:1:1',
      //   noteName: 'B3',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//7
        time: '0:1:2',
        noteName: 'A3',
        duration: '4n',
        velocity: 1
      },
      // {//8
      //   time: '0:1:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      // {//9
      //   time: '0:2:0',
      //   noteName: 'C4',
      //   duration: '16n',
      //   velocity: 1
      // },
      // {//10
      //   time: '0:2:1',
      //   noteName: 'B3',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//11
        time: '0:2:2',
        noteName: 'B3',
        duration: '16n',
        velocity: 1
      },
      // {//12
      //   time: '0:2:3',
      //   noteName: 'D4',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//13
        time: '0:3:0',
        noteName: 'D4',
        duration: '16n',
        velocity: 1
      },
      // {//14
      //   time: '0:3:1',
      //   noteName: 'A3',
      //   duration: '16n',
      //   velocity: 1
      // },
      // {//15
      //   time: '0:3:2',
      //   noteName: 'C4',
      //   duration: '16n',
      //   velocity: 1
      // },
      // {//16
      //   time: '0:3:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // }

      //////////////////////////////////////
      {//1
        time: '1:0:0',
        noteName: 'C4',
        duration: '16n',
        velocity: 1
      },
      // {//2
      //   time: '1:0:1',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//3
        time: '1:0:2',
        noteName: 'B3',
        duration: '16n',
        velocity: 1
      },
      // {//4
      //   time: '1:0:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//5
        time: '1:1:0',
        noteName: 'C4',
        duration: '16n',
        velocity: 1
      },
      // {//6
      //   time: '1:1:1',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//7
        time: '1:1:2',
        noteName: 'D4',
        duration: '16n',
        velocity: 1
      },
      // {//8
      //   time: '1:1:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//9
        time: '1:2:0',
        noteName: 'B3',
        duration: '16n',
        velocity: 1
      },
      // {//10
      //   time: '1:2:1',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//11
        time: '1:2:2',
        noteName: 'A3',
        duration: '16n',
        velocity: 1
      },
      // {//12
      //   time: '1:2:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      {//13
        time: '1:3:0',
        noteName: 'C4',
        duration: '16n',
        velocity: 1
      },
      // {//14
      //   time: '1:3:1',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // },
      // {//15
      //   time: '1:3:2',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // }
      // {//16
      //   time: '0:3:3',
      //   noteName: '',
      //   duration: '16n',
      //   velocity: 1
      // }
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
      <div className="main-container">
        <div className="Frame">
          <div className="Container verticalFlex">
            <SC_ButtonBig
              text=""
              handleClick={this.handleClick}
            />
          </div>
        </div>
        <div className="Frame">
          <div className="Container horizontalFlex">
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
          <div className="Container horizontalFlex">
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
      </div>
    )
  }
}
