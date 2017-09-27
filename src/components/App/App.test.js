import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  let component
  let props

  beforeEach(() => {
    props = {}
    component = shallow(<App {...props} />)
  })

  it('renders', () => {
    // expect(component).toMatchSnapshot()
  })
})
