let contexteAudio
let oscillator

function createOscillator() {
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

function createSlider() {
  const container = document.getElementById('prototype_101')
  const slider = document.createElement('input')
  slider.type = 'range'
  slider.min = 0
  slider.max = 100
  slider.value = 440
  slider.id = 'slider'
  container.appendChild(slider)

  slider.addEventListener('input', () => {
    changeOscillatorFrequency()
  })
}


document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('prototype_101')
  const container_1 = document.createElement('div')
  const frame3 = document.createElement('div')
  const container_2 = document.createElement('div')
  const frame = document.createElement('div')
  const frame2 = document.createElement('div')
  const container_3 = document.createElement('div')

  container_1.classList.add('container')
  frame3.classList.add('square')
  container_2.classList.add('container')
  frame.innerText = 'Click to make some sound'
  frame.classList.add('frame-round')
  frame2.innerText = 'No need to click'
  frame2.classList.add('frame')
  container_3.classList.add('container')

  container.appendChild(container_1)
  container_1.appendchild(frame3)
  container.appendChild(container_2)
  container_2.appendChild(frame)
  container_2.appendChild(frame2)
  container.appendChild(container_3)

  createSlider()

  frame.addEventListener('click', () => {
    createOscillator()
      console.log('working')
  })

})
