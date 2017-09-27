import httpService from './httpService'

export const load = async (context, url) => {
  const response = await httpService.get(`/samples${url}`, { responseType: 'arraybuffer' })
  const data = await response.data
  const buffer = await context.decodeAudioData(data)

  return buffer
}

export const play = (context, audio, onended) => {
  const source = context.createBufferSource()
  source.buffer = audio.buffer
  source.connect(context.destination)
  source.onended = onended

  source.start(audio.start || context.currentTime)
}

export const findStartGapDuration = (buffer) => {
  const l = buffer.getChannelData(0)

  for (let i = 0, len = l.length; i < len; i++) {
    if (l[i]) {
      return i / buffer.sampleRate
    }
  }

  return buffer.duration
}

export default {
  load,
  play,
  findStartGapDuration,
}
