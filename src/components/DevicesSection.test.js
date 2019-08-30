import React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
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
					os: constants.DEVICES_ANDROID,
					osVersion: '1.2.3',
					region: types.NAMESPACE_EU,
					available: false
				},
				{
					descriptorId: 'unique_iphone',
					name: 'ios phone',
					os: constants.DEVICES_IOS,
					osVersion: '4.5.6',
					region: types.NAMESPACE_US,
					available: true
				}
			],
		};
	});

	it('renders without crashing', () => {
		const wrapper = shallow(<DevicesSection {...mockProps} />);
		const android = wrapper.find('[data-qa="device-unique_android"]');
		const ios = wrapper.find('[data-qa="device-unique_iphone"]');
		expect(android).to.have.lengthOf(1);
		expect(ios).to.have.lengthOf(1);
	});

	it('renders the correct image, name, os, and osVersion of two devices', () => {
		const wrapper = render(<DevicesSection {...mockProps} />);

		const android = wrapper.find('[data-qa="device-unique_android"]');
		expect(android.find('img').prop('src')).to.equal('https://d3ty40hendov17.cloudfront.net/device-pictures/unique_android.png');
		expect(android.text()).to.contain('android phone');
		expect(android.text()).to.contain(constants.DEVICES_ANDROID);
		expect(android.text()).to.contain('1.2.3');

		const ios = wrapper.find('[data-qa="device-unique_iphone"]');
		expect(ios.find('img').prop('src')).to.equal('https://d3ty40hendov17.cloudfront.net/device-pictures/unique_iphone.png');
		expect(ios.text()).to.contain('ios phone');
		expect(ios.text()).to.contain(constants.DEVICES_IOS);
		expect(ios.text()).to.contain('4.5.6');
	});

	it('renders the correct flag emoji based on the device region (data center)', () => {
		const wrapper = render(<DevicesSection {...mockProps} />);

		const android = wrapper.find('[data-qa="device-unique_android"]');
		expect(android.text()).to.contain('🇪🇺');

		const ios = wrapper.find('[data-qa="device-unique_iphone"]');
		expect(ios.text()).to.contain('🇺🇸');

	});

	it('renders whether the device is available', () => {
		const wrapper = render(<DevicesSection {...mockProps} />);
		const android = wrapper.find('[data-qa="device-unique_android"]');
		expect(android.text()).to.contain('not available');

		const ios = wrapper.find('[data-qa="device-unique_iphone"]');
		expect(ios.text()).to.not.contain('not available');
		expect(ios.text()).to.contain('available');
	});
});
