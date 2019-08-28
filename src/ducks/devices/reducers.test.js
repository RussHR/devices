import reducer from "./index";
import { expect } from "chai";
import { addDeviceListPayloadToState } from "./reducers";

describe('reducer - devices', () => {
	describe('deviceList', () => {
		it('should return the initial state', () => {
			expect(reducer(undefined, {})).to.deep.equal({ deviceList: {} });
		});

		describe('addDeviceListPayloadToState', () => {
			let payload;
			let oldState = {
				descriptorId_0: {
					name: 'name 0',
					os: 'ANDROID',
					osVersion: '7.8.9',
					dataCenterId: 'US',
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
						dataCenterId: 'EU',
						available: false
					},
					{
						descriptorId: 'descriptorId_2',
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						dataCenterId: 'US',
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
						dataCenterId: 'EU',
						available: false
					},
					descriptorId_2: {
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						dataCenterId: 'US',
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
						dataCenterId: 'US',
						available: false
					},
					descriptorId_1: {
						name: 'name 1',
						os: 'ANDROID',
						osVersion: '1.2.3',
						dataCenterId: 'EU',
						available: false
					},
					descriptorId_2: {
						name: 'name 2',
						os: 'IOS',
						osVersion: '4.5.6',
						dataCenterId: 'US',
						available: false
					}
				});

			});
		});
	});
});
