import axios from 'axios'
import httpService from './httpService'

describe('httpService', () => {
  beforeEach(() => {
    axios.get = jest.fn()
  })

  describe('get', () => {
    it('make an GET request', () => {
      httpService.get('/url')

      expect(axios.get.mock.calls.length).toEqual(1)
      expect(axios.get.mock.calls[0][0]).toEqual('/url')
    })
  })
})
