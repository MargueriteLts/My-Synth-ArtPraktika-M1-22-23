import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_15/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_15')
  ReactDOM.render(<Container />, container)
})
