import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as sampleKitActions from './sampleKitActions'
import * as types from '../constants/actionTypes'
import audioBufferService from '../services/audioBufferService'

const host = 'http://localhost'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const sample = { id: 'sample', name: 'sample', url: '/sample-url', start: 0 }
const state = {
  allIds: ['sample'],
  byId: { sample },
}

const audioBuffer = {
  duration: 0.48036281179138324,
  length: 21184,
  numberOfChannels: 1,
  sampleRate: 44100,
}

// TODO: set this in a jest global setup
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

describe('sampleKitActions', () => {
  beforeEach(() => {
    audioBufferService.findStartGapDuration = jest.fn()
      .mockReturnValue(0)
  })

  afterEach(nock.cleanAll)

  describe('fetchSamples', () => {
    it('success', async () => {
      audioBufferService.load = jest.fn()
        .mockReturnValue(Promise.resolve(audioBuffer))

      nock(host)
        .get('/sample-url')
        .reply(200, { buffer: [] })

      const payload = [{ ...sample, buffer: audioBuffer }]
      const store = mockStore({ samples: state })
      const expectedActions = [
        { type: types.FETCH_SAMPLE_KIT_REQUEST },
        { type: types.FETCH_SAMPLE_KIT_SUCCESS, payload },
      ]

      await store.dispatch(sampleKitActions.fetchSampleKit())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
