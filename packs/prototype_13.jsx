import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_13/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_13')
  ReactDOM.render(<Container />, container)
})
