import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Key from '../../components/Key'
import keycode from 'keycode'
import './Drumpad.css'

class Drumpad extends Component {
  static propTypes = {
    keys: PropTypes.array.isRequired,
    samples: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    fetchSampleKit: PropTypes.func.isRequired,
    playSample: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { fetchSampleKit } = this.props

    fetchSampleKit()
    window.addEventListener('keydown', this.handlePress)
  }

  play = (sample) => {
    const { playSample } = this.props

    playSample(sample)
  }

  handleClick = (e, sample) => {
    this.play(sample)
  }

  handlePress = (e) => {
    const { keys } = this.props
    const letter = keycode(e).toLowerCase()
    const key = keys.find(key => key.letter === letter)

    if (!key) {
      return
    }

    this.play(key.sample)
  }

  render() {
    const { keys } = this.props

    return (
      <div className='Drumpad'>
        {keys.map(key => (
          <Key
            key={key.letter}
            isPlaying={key.isPlaying}
            letter={key.letter}
            sample={key.sample}
            onClick={this.handleClick}
          />
        ))}
      </div>
    )
  }
}

export default Drumpad
