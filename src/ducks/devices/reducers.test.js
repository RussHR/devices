import reducer from "./index";
import { expect } from "chai";
import { addDeviceListPayloadToState, updateDeviceAvailability } from "./reducers";
import constants from "./constants";


describe('reducer - devices', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).to.deep.equal({
			deviceList: { us: {}, eu: {} },
			filterMode: constants.DEVICES_ALL
		});
	});

	describe('deviceList', () => {
		describe('addDeviceListPayloadToState', () => {
			let payload;
			let oldState = {
				descriptorId_0: {
					name: 'name 0',
					os: 'ANDROID',
					osVersion: '7.8.9',
					available: false
				},
			}

			beforeAll(() => {
				payload = [
					{
						descriptorId: 'descriptorId_1',
						name: 'name 1',
						os: 'ANDROID',
						osVersion: '1.2.3',
						available: false
					},
					{
						descriptorId: 'descriptorId_2',
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						available: false
					}
				];
			});

			it('should return a list of devices from a clean state', () => {
				expect(addDeviceListPayloadToState({}, payload)).to.deep.equal({
					descriptorId_1: {
						name: 'name 1',
						os: 'ANDROID',
						osVersion: '1.2.3',
						available: false
					},
					descriptorId_2: {
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						available: false
					}
				});
			});

			it('should add a list of devices to those already in the state', () => {
				expect(addDeviceListPayloadToState(oldState, payload)).to.deep.equal({
					descriptorId_0: {
						name: 'name 0',
						os: 'ANDROID',
						osVersion: '7.8.9',
						available: false
					},
					descriptorId_1: {
						name: 'name 1',
						os: 'ANDROID',
						osVersion: '1.2.3',
						available: false
					},
					descriptorId_2: {
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						available: false
					}
				});

			});
		});

		describe('updateDeviceAvailability', () => {
			it('should change the availability of a device to true if the device is in the list', () => {
				const deviceList = {
					descriptorId_0: {
						name: 'name 0',
						os: 'ANDROID',
						osVersion: '7.8.9',
						available: false
					}
				};
				const availabilityList = ['descriptorId_0'];
				expect(updateDeviceAvailability(deviceList, availabilityList)).to.deep.equal({
					descriptorId_0: {
						name: 'name 0',
						os: 'ANDROID',
						osVersion: '7.8.9',
						available: true
					},
				});
			});

			it('should change the availability of a device to false if the device is not in the list', () => {
				const deviceList = {
					descriptorId_0: {
						name: 'name 0',
						os: 'ANDROID',
						osVersion: '7.8.9',
						available: false
					}
				};
				const availabilityList = ['some_silly_device'];
				expect(updateDeviceAvailability(deviceList, availabilityList)).to.deep.equal({
					descriptorId_0: {
						name: 'name 0',
						os: 'ANDROID',
						osVersion: '7.8.9',
						available: false
					},
				});
			});
		});
	});
});
