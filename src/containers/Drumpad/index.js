import Drumpad from './Drumpad'
import { connect } from 'react-redux'
import * as fromKeys from '../../reducers/keysReducer'
import * as fromSamples from '../../reducers/samplesReducer'
import * as sampleKitActions from '../../actions/sampleKitActions'

const mapStateToProps = (state) => ({
  keys: fromKeys.getAll(state),
  samples: fromSamples.getAll(state),
  isFetching: fromSamples.getIsFetching(state),
  errorMessage: fromSamples.getErrorMessage(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchSampleKit: () => dispatch(sampleKitActions.fetchSampleKit()),
  playSample: (id) => dispatch(sampleKitActions.playSample(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Drumpad)
