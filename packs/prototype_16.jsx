import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_16/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_16')
  ReactDOM.render(<Container />, container)
})
