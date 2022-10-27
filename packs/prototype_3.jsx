import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_3/Container'

let contexteAudio
let oscillator
let container

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_3')
  ReactDOM.render(<Container />, container)
})
