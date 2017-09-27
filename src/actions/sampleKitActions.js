import audioBufferService from '../services/audioBufferService'
import * as fromAudioContext from '../reducers/audioContextReducer'
import * as fromSamples from '../reducers/samplesReducer'
import * as types from '../constants/actionTypes'

const fetchSampleKit = () => (dispatch, getState) => {
  const fetchSampleKitRequest = () => ({
    type: types.FETCH_SAMPLE_KIT_REQUEST,
  })

  const fetchSampleKitSuccess = (payload) => ({
    type: types.FETCH_SAMPLE_KIT_SUCCESS,
    payload,
  })

  const fetchSampleKitFailure = (error) => ({
    type: types.FETCH_SAMPLE_KIT_FAILURE,
    message: error.message || 'Something went wrong.',
  })

  const context = fromAudioContext.getAudioContext(getState())
  const defaultSampleKit = fromSamples.getAll(getState())

  dispatch(fetchSampleKitRequest())

  const sampleKit = defaultSampleKit
    .map(sample => {
      return audioBufferService
        .load(context, sample.url)
        .then(buffer => ({
          ...sample,
          buffer,
          start: audioBufferService.findStartGapDuration(buffer),
        }))
    })

  return Promise.all(sampleKit)
    .then(payload => dispatch(fetchSampleKitSuccess(payload)))
    .catch(error => dispatch(fetchSampleKitFailure(error)))
}

const playSample = (id) => (dispatch, getState) => {
  const playSampleStart = (id) => ({
    type: types.PLAY_SAMPLE_START,
    id,
  })

  const playSampleStop = (id) => ({
    type: types.PLAY_SAMPLE_STOP,
    id,
  })

  const context = fromAudioContext.getAudioContext(getState())
  const sample = fromSamples.getSample(getState(), id)

  dispatch(playSampleStart(id))

  return audioBufferService.play(context, sample, () => {
    dispatch(playSampleStop(id))
  })
}

export default {
  fetchSampleKit,
  playSample,
}

export {
  fetchSampleKit,
  playSample,
}
