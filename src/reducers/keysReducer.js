import * as types from '../constants/actionTypes'

const keyReducer = (state = {}, action) => {
  const { type, id } = action

  switch (type) {
    case types.PLAY_SAMPLE_START:
      if (state.sample !== id) {
        return state
      }

      return {
        ...state,
        isPlaying: true,
      }
    case types.PLAY_SAMPLE_STOP:
      if (state.sample !== id) {
        return state
      }

      return {
        ...state,
        isPlaying: false,
      }
    default:
      return state
  }
}

const keysReducer = (state = [], action) => {
  const { type } = action

  switch (type) {
    case types.PLAY_SAMPLE_START:
    case types.PLAY_SAMPLE_STOP:
      return state.map(key => keyReducer(key, action))
    default:
      return state
  }
}

export default keysReducer

export const getAll = (state) => state.keys
export const getKey = (state, id) => state.keys.find(key => key.sample === id)
