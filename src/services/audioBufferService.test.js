import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'
import audioBufferService from './audioBufferService'

const host = 'http://localhost'

const context = {}
const source = {}

const audioBuffer = {
  duration: 0.48036281179138324,
  length: 21184,
  numberOfChannels: 1,
  sampleRate: 44100,
}

// TODO: set this in a jest global setup
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

describe('audioBufferService', () => {
  beforeEach(() => {
    source.connect = jest.fn()
    source.start = jest.fn()

    context.currentTime = 0
    context.decodeAudioData = jest.fn().mockReturnValue(audioBuffer)
    context.createBufferSource = jest.fn().mockReturnValue(source)
  })

  afterEach(nock.cleanAll)

  describe('load', () => {
    it('loads an audio buffer correctly', async () => {
      nock(`${host}/samples`)
        .get('/sample-url')
        .reply(200, {})

      const buffer = await audioBufferService.load(context, '/sample-url')

      expect(buffer).toBe(audioBuffer)
      expect(context.decodeAudioData.mock.calls.length).toBe(1)
    })
  })

  describe('play', () => {
    it('plays an audio buffer correctly with start time', () => {
      const audio = { buffer:[], start: 1 }
      const onended = () => {}

      audioBufferService.play(context, audio, onended)

      expect(context.createBufferSource.mock.calls.length).toBe(1)
      expect(source.connect.mock.calls.length).toBe(1)
      expect(source.start.mock.calls.length).toBe(1)
      expect(source.start.mock.calls[0][0]).toBe(1)
      expect(typeof source.onended).toBe('function')
    })

    it('plays an audio buffer correctly without start time', () => {
      const audio = { buffer:[] }
      const onended = () => {}

      audioBufferService.play(context, audio, onended)

      expect(context.createBufferSource.mock.calls.length).toBe(1)
      expect(source.connect.mock.calls.length).toBe(1)
      expect(source.start.mock.calls.length).toBe(1)
      expect(source.start.mock.calls[0][0]).toBe(0)
      expect(typeof source.onended).toBe('function')
    })
  })
})
