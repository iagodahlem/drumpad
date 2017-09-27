import React from 'react'
import { shallow } from 'enzyme'

import Key from './Key'

describe('Key', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<Key {...props} />)
  })

  it('should', () => {
    // expect(component).toMatchSnapshot()
  })
})
