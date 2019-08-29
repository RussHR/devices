// Place reducers here.
import { combineReducers } from "redux";
import types from "./types";

/* State Shape
{
    deviceList: {
		eu: {
			[descriptorId]: {
				name: string,
				os: string ('ANDROID' || 'IOS'),
				osVersion: string,
				available: bool
			}
		},
		us: {
			[descriptorId]: {
				name: string,
				os: string ('ANDROID' || 'IOS'),
				osVersion: string,
				available: bool
			}
		}
	}
}
*/

const euDevicesReducer = (state = {}, action) => {
	switch (action.type) {
		case types.LIST_GET_EU.SUCCESS:
			return addDeviceListPayloadToState(state, action.payload);
		case types.AVAILABILITY_GET_EU.SUCCESS:
			return updateDeviceAvailability(state, action.payload);
		default:
			return state;
	}
}

const usDevicesReducer = (state = {}, action) => {
	switch (action.type) {
		case types.LIST_GET_US.SUCCESS:
			return addDeviceListPayloadToState(state, action.payload);
		case types.AVAILABILITY_GET_US.SUCCESS:
			return updateDeviceAvailability(state, action.payload);
		default:
			return state;
	}
}

const deviceList = combineReducers({
	eu: euDevicesReducer,
	us: usDevicesReducer
});

const reducer = combineReducers({
	deviceList
});

export default reducer;

/**
 * Adds devices from a device list fetch to the device list.
 * @param {object} oldState - old list of devices with descriptorId as key
 * @param {array} payload - list of devices returned from API, each an object
 * @returns {object} new list of devices combining the old list and the API results
 */
export const addDeviceListPayloadToState = (oldState, payload) => {
	const newState = payload.reduce((state, { descriptorId, name, os, osVersion }) => {
		return {
			...state,
			[descriptorId]: {
				name,
				os,
				osVersion,
				available: oldState[descriptorId] ? oldState[descriptorId].available : false
			}
		};
	}, {});

	return { ...oldState, ...newState };
};

/**
 * Adds devices from a device list fetch to the device list.
 * @param {object} oldState - old list of devices with descriptorId as key
 * @param {array} payload - list of devices returned from API, each an object
 * @returns {object} new list of devices combining the old list and the API results
 */
export const updateDeviceAvailability = (oldState, payload) => {
	// this sets the availability to false for all devices that have been fetched
	const newState = Object.entries(oldState).reduce((state, [descriptorId, { name, os, osVersion }]) => {
		return {
			...state,
			[descriptorId]: {
				name,
				os,
				osVersion,
				available: false
			}
		};
	}, {});

	payload.forEach(descriptorId => {
		if (newState[descriptorId]) {
			newState[descriptorId].available = true;
		}
	});

	return newState;
};
