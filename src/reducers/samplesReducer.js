import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'

const byId = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.FETCH_SAMPLE_KIT_SUCCESS:
      const nextState = { ...state }
      payload.forEach(sample => nextState[sample.id] = sample)
      return nextState
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case types.FETCH_SAMPLE_KIT_SUCCESS:
      return [
        ...state,
        payload.map(sample => sample.id),
      ]
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  const { type } = action

  switch (type) {
    case types.FETCH_SAMPLE_KIT_REQUEST:
      return true
    case types.FETCH_SAMPLE_KIT_SUCCESS:
    case types.FETCH_SAMPLE_KIT_FAILURE:
      return false
    default:
      return state
  }
}

const errorMessage = (state = null, action) => {
  const { type } = action

  switch (type) {
    case types.FETCH_SAMPLE_KIT_FAILURE:
      return action.message
    case types.FETCH_SAMPLE_KIT_REQUEST:
    case types.FETCH_SAMPLE_KIT_SUCCESS:
      return null
    default:
      return state
  }
}

const samplesReducer = combineReducers({
  byId,
  allIds,
  isFetching,
  errorMessage,
})

export default samplesReducer

export const getAll = (state) => state.samples.allIds.map(id => state.samples.byId[id])
export const getSample = (state, id) => state.samples.byId[id]
export const getIsFetching = (state) => state.samples.isFetching
export const getErrorMessage = (state) => state.samples.errorMessage
