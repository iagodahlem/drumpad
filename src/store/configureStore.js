import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import audioContextService from '../services/audioContextService'
import keys from '../constants/keys'
import sampleKit808 from '../constants/sampleKit808'
import defaultSampleKit from '../constants/defaultSampleKit'

const initialState = {
  keys,
  samples: defaultSampleKit(sampleKit808),
  audioContext: audioContextService.create(),
}

const configureStore = () => {
  const middlewares = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

  return store
}

export default configureStore
