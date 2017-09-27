import { combineReducers } from 'redux'
import keysReducer from './keysReducer'
import samplesReducer from './samplesReducer'

const rootReducer = combineReducers({
  audioContext: (state = null) => state,
  keys: keysReducer,
  samples: samplesReducer,
})

export default rootReducer
