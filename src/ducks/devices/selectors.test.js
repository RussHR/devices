import { expect } from "chai";
import selectors from "./selectors";

describe('selectors', () => {
	describe('selectDeviceList', () => {
		let mockState;

		beforeAll(() => {
			mockState = {
				devices: {
					deviceList: {
						eu: {
							descriptorId_0: {
								name: 'name 0',
								os: 'ANDROID',
								osVersion: '7.8.9',
								available: false
							}
						},
						us: {
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
						}
					}
				}
			};
		});

		it('should get devices from eu as default', () => {
			expect(selectors.selectDeviceList(mockState)).to.deep.equal([{
				descriptorId: 'descriptorId_0',
				name: 'name 0',
				os: 'ANDROID',
				osVersion: '7.8.9',
				region: 'eu',
				available: false
			}]);
		});
		it('should get devices from us when passed the correct region param', () => {
			expect(selectors.selectDeviceList(mockState, 'us')).to.deep.equal([
				{
					descriptorId: 'descriptorId_1',
					name: 'name 1',
					os: 'ANDROID',
					osVersion: '1.2.3',
					region: 'us',
					available: false
				},
				{
					descriptorId: 'descriptorId_2',
					name: 'name 2',
					os: 'IOS',
					osVersion: '4.5.6',
					region: 'us',
					available: false
				}
			]);
		});
	});

	describe('selectFilterMode', () => {
		let mockState;

		beforeAll(() => {
			mockState = {
				devices: {
					filterMode: 'asdf'
				}
			};
		});

		it('should return the current filter mode as a string', () => {
			expect(selectors.selectFilterMode(mockState)).to.equal('asdf');
		});
	});

	describe('selectFetchingStatuses', () => {
		let mockState;

		beforeAll(() => {
			mockState = {
				devices: {
					fetching: {
						eu: {
							availability: false,
							deviceList: true
						},
						us: {
							availability: true,
							deviceList: false
						}
					}
				}
			};
		});

		it('should return the current filter mode as a string', () => {
			expect(selectors.selectFetchingStatuses(mockState)).to.deep.equal({
				eu: {
					availability: false,
					deviceList: true
				},
				us: {
					availability: true,
					deviceList: false
				}
			});
		});
	});
});
