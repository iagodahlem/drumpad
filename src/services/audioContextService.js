const AudioContext = window.AudioContext
  || window.webkitAudioContext
  || false

const create = () => {
  return AudioContext
    ? new AudioContext()
    : false
}

export default {
  create,
}

export {
  create,
}
