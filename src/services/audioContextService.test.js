import audioContextService from './audioContextService'

describe('audioContextService', () => {
  describe('createAudioContext', () => {
    it('returns false when AudioContext is not available', () => {
      expect(audioContextService.create()).toBe(false)
    })
  })
})
