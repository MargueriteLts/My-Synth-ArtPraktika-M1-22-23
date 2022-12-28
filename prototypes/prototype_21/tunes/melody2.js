const channel = {
  volume: -15,
  mute: true
}

const synth = {
  volume: -15,
  mute: true,
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
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

const synthUI = {
  envelopeShow: false
}

const chorus = {
  wet: 0.3,
  type: 'sine',
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180
}

const pingPongDelay = { wet: 0.6, delayTime: 0.25, maxDelayTime: 1 }

const sequence = {
  steps1: [
    {
      //1
      time: '0:0:0',
      noteName: 'A#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //2
      time: '0:0:2',
      noteName: 'F#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //3
      time: '0:1:0',
      noteName: 'C#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //4
      time: '0:1:2',
      noteName: 'A#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //5
      time: '0:2:0',
      noteName: 'B5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //6
      time: '0:2:2',
      noteName: 'D#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //7
      time: '0:3:0',
      noteName: 'G#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //8
      time: '0:3:2',
      noteName: 'B5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //9
      time: '1:0:0',
      noteName: 'C#6',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    //////////////////////
    {
      //10
      time: '1:0:2',
      noteName: 'B5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //11
      time: '1:1:0',
      noteName: 'C#6',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //12
      time: '1:1:2',
      noteName: 'D#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //13
      time: '1:2:0',
      noteName: 'G#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //14
      time: '1:2:2',
      noteName: 'D#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //15
      time: '1:3:0',
      noteName: 'C#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //16
      time: '1:3:2',
      noteName: 'D#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    }
  ],
  steps2: [
    {
      //1
      time: '0:0:0',
      noteName: 'A#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //2
      time: '0:0:2',
      noteName: 'F#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //3
      time: '0:1:0',
      noteName: 'C#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //4
      time: '0:1:2',
      noteName: 'A#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //5
      time: '0:2:0',
      noteName: 'B4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //6
      time: '0:2:2',
      noteName: 'D#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //7
      time: '0:3:0',
      noteName: 'G#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //8
      time: '0:3:2',
      noteName: 'B4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //9
      time: '1:0:0',
      noteName: 'C#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    //////////////////////
    {
      //10
      time: '1:0:2',
      noteName: 'B4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //11
      time: '1:1:0',
      noteName: 'C#5',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //12
      time: '1:1:2',
      noteName: 'D#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //13
      time: '1:2:0',
      noteName: 'G#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //14
      time: '1:2:2',
      noteName: 'D#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //15
      time: '1:3:0',
      noteName: 'C#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    },
    {
      //16
      time: '1:3:2',
      noteName: 'D#4',
      // duration: '1m',
      duration: '16n',
      velocity: 1
    }
  ],
  duration: '2m',
  loop: true,
  current: 'steps1'
}

export { channel, synth, synthUI, chorus, pingPongDelay, sequence }
