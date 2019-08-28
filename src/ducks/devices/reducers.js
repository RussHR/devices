// Place reducers here.
import { combineReducers } from "redux";
import types from "./types";

/* State Shape
{
    deviceList: {
		[descriptorId]: {
			name: string,
			os: string ('ANDROID' || 'IOS'),
			osVersion: string,
			dataCenterId: string ('EU' || 'US'),
			available: bool
		}
	}
}
*/

const devicesReducer = (state = {}, action) => {
	switch (action.type) {
		case types.LIST_GET.SUCCESS:
			return addDeviceListPayloadToState(state, action.payload);
		default:
			return state;
	}
}

const reducer = combineReducers({
	deviceList: devicesReducer
});

export default reducer;

/**
 * 
 * @param {object} oldState - old list of devices with descriptorId as key
 * @param {array} payload - list of devices returned from API, each an object
 * @returns {object} new list of devices combining the old list and the API results
 */
export const addDeviceListPayloadToState = (oldState, payload) => {
	const newState = payload.reduce((state, { descriptorId, name, os, osVersion, dataCenterId }) => {
		return {
			...state,
			[descriptorId]: {
				name,
				os,
				osVersion,
				dataCenterId,
				available: false
			}
		};
	}, {});

	return { ...oldState, ...newState };
};
