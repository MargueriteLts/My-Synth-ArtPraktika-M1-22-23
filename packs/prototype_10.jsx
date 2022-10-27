import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_10/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_10')
  ReactDOM.render(<Container />, container)
})
