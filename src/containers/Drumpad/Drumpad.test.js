import React from 'react'
import { shallow } from 'enzyme'

import Drumpad from './Drumpad'

describe('Drumpad', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<Drumpad {...props} />)
  })

  it('should', () => {
    // expect(component).toMatchSnapshot()
  })
})
