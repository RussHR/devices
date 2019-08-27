import reducer from "./index";
import { expect } from "chai";
import types from "./types";
import { addDevices } from "./actions";

describe('reducer - devices', () => {
	describe('deviceList', () => {
		it('should return the initial state', () => {
			expect(reducer(undefined, {})).to.deep.equal({ deviceList: {} });
		});

		it(`should handle ${types.DEVICES.ADD}`, () => {
			const action = addDevices({ device1: { name: 'device1' } });
			expect(reducer(undefined, action)).to.deep.equal({
				deviceList: { device1: { name: 'device1' } }
			});
		});
	});
});
