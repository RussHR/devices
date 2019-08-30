import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DevicesSection from './DevicesSection';

describe('DevicesSection', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<DevicesSection />);
		expect(wrapper).to.have.lengthOf(1);
	});
});
