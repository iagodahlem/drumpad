const byId = (kit) => kit
  .reduce((samples, sample) => {
    samples[sample.id] = sample
    return samples
  },{})

const allIds = (kit) => kit.map(sample => sample.id)

const defaultSampleKit = (kit) => ({
  byId: byId(kit),
  allIds: allIds(kit),
})

export default defaultSampleKit
