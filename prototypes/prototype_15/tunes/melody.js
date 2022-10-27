const synth = {
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
    type: 'triangle',
    modulationType: 'sine',
    //partialCount: 0.
    //partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

/////////////////////////////CHANNEL//////////////////////
//
// const channel = {
//   volume: 0,
//   pan: 0,
//   mute: false,
//   solo: false
// }

/////////////////////////////SEQUENCE//////////////////////

const sequence = {
  steps:[
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
  ],
  duration: '2m',
  loop: true
}

export { synth, channel, sequence }
