import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_17/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_17')
  ReactDOM.render(<Container />, container)
})
