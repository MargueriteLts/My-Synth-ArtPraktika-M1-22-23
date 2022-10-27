let contexteAudio
let oscillator
let container


function createOurOscillator() {
  // crée un contexteaudio
  contexteAudio = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  oscillator = contexteAudio.createOscillator();
  oscillator.connect(contexteAudio.destination);
  oscillator.type = 'square';
  oscillator.frequency.value = 440; // valeur en hertz

  oscillator.start();
}

function changeOscillatorFrequency() {
  const slider = document.getElementById('slider')
  oscillator.frequency.value = slider.value;
}

function changeOscillatorType(type) {
  oscillator.type = type
}

function createSlider() {
  // container = document.getElementById('prototype_2')
  const slider = document.createElement('input')
  slider.type = 'range'
  slider.min = 0
  slider.max = 1000
  slider.value = 440
  slider.id = 'slider'
  container.appendChild(slider)

  slider.addEventListener('input', () => {
    changeOscillatorFrequency()
  })
}

function createButton(text, callback, parameter) {
  const button = document.createElement('div')
  button.innerText = text
  button.classList.add('button')
  container.appendChild(button)

  button.addEventListener('click', () => {
    callback(parameter)
  })
}

function createOscillatorTypeButtons() {
  const types = ['sine', 'square', 'sawtooth', 'triangle']
  types.forEach((type, i) => {
    createButton(type, changeOscillatorType, type)
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const frame = document.createElement('div')
  frame.innerText = 'Art Design & Coding Community'
  frame.classList.add('frame')

  container = document.getElementById('prototype_2')
  container.appendChild(frame)

  frame.addEventListener('click', () => {
    createOurOscillator()
      // console.log('working')
    createSlider()
    createOscillatorTypeButtons()
  })

})
