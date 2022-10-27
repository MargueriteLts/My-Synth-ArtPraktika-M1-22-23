import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_11/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_11')
  ReactDOM.render(<Container />, container)
})
