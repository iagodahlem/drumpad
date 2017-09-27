import React from 'react'
import PropTypes from 'prop-types'
import './Key.css'

const toggleClass = (isPlaying) => isPlaying ? 'Key isPlaying' : 'Key'

const Key = ({ isPlaying, letter, sample, onClick }) => (
  <div className={toggleClass(isPlaying)} onClick={(e) => onClick(e, sample)}>
  </div>
)

Key.propTypes = {
  sample: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Key
