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
    type: 'sine',
    modulationType: 'sine',
    //partialCount: 0.
    //partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

/////////////////////////////EFFECTS///////////////////////

const pingPongDelay = {
  wet: 0,
  delayTime: 0.1,
  maxDelayTime: 5
}

const freeverb = {
  wet: 0,
  roomSize: 0.2,
  dampening: 100
}

const jcReverb = {
  wet: 0,
  roomSize: 0.5
}

const chorus = {
  wet: 0,
  type: 'sine',
  frequency: 0.1,
  delayTime: 1,
  depth: 100,
  spread: 180
}

/////////////////////////////CHANNEL//////////////////////

const channel = {
  volume: 0,
  pan: 0,
  mute: false,
  solo: false
}

/////////////////////////////SEQUENCE//////////////////////

const sequence = {steps:[
  {
    time: '0:0:0',
    noteName: 'B2',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:2:0',
    noteName: 'E2',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:0:0',
    noteName: 'A2',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:2:0',
    noteName: 'C2',
    duration: '4n',
    velocity: 1
  }
], duration: '2m'}

export {
  synth,
  pingPongDelay,
  freeverb,
  jcReverb,
  chorus,
  sequence,
  channel
 }
