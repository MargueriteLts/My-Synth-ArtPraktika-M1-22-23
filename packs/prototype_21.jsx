import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_21/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_21')
  ReactDOM.render(<Container />, container)
})
