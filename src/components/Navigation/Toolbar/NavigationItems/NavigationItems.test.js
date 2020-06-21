import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

//takes two arguments: the first is the description of the test bundle which you will see in console,
//the second is the testing function
describe('<NavigationItems />', () => {
	    let wrapper
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)
	})
	it('should render two NavigationItem components if not authenticated', () => {
	    expect(wrapper.find(NavigationItem)).toHaveLength(2)
	})
	it('should render three NavigationItem components if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
	    expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render NavigationItem with logount button if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
	    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
	})
})
