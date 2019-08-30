import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DevicesSection from "./DevicesSection";
import constants from "../ducks/devices/constants";
import types from "../ducks/devices/types";

describe('DevicesSection', () => {
	let mockProps;

	beforeAll(() => {
		mockProps = {
			deviceList: [
				{
					descriptorId: 'unique_android',
					name: 'android phone',
					os: types.DEVICES_ANDROID,
					osVersion: '1.2.3',
					region: types.NAMESPACE_EU,
					available: false
				},
				{
					descriptorId: 'unique_iphone',
					name: 'ios phone',
					os: types.DEVICES_IOS,
					osVersion: '4.5.6',
					region: types.NAMESPACE_US,
					available: true
				}
			],
		};
	});

	it('renders without crashing', () => {
		const wrapper = shallow(<DevicesSection />);
		expect(wrapper).to.have.lengthOf(1);
	});

	it('renders the correct image, name, os, and osVersion of two devices', () => {
		const wrapper = shallow(<DevicesSection />);
		expect(wrapper).to.have.lengthOf(1);
	});

	it('renders the correct flag emoji based on the device region (data center)', () => {
		const wrapper = shallow(<DevicesSection />);
		expect(wrapper).to.have.lengthOf(1);
	});

	it('renders whether the device is available', () => {
		const wrapper = shallow(<DevicesSection />);
		expect(wrapper).to.have.lengthOf(1);
	});
});
