// Place reducers here.
import { combineReducers } from "redux";
import types from "./types";
import constants from "./constants";

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
	},
	filterMode: string ('ALL' || 'ANDROID' || 'IOS'),
	fetching: {
		eu: {
			deviceList: false,
			availability: false
		},
		us: {
			deviceList: false,
			availability: false
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

const filterModeReducer = (state = constants.DEVICES_ALL, action) => {
	switch(action.type) {
		case types.FILTER.SET:
			return action.payload;
		default:
			return state;
	}
}

const euDeviceListFetchingReducer = (state = false, action) => {
	switch (action.type) {
		case types.LIST_GET_EU.REQUEST:
			return true;
		case types.LIST_GET_EU.SUCCESS:
		case types.LIST_GET_EU.FAILURE:
			return false;
		default:
			return state;
	}
};
const euDeviceAvailabilityFetchingReducer = (state = false, action) => {
	switch (action.type) {
		case types.AVAILABILITY_GET_EU.REQUEST:
			return true;
		case types.AVAILABILITY_GET_EU.SUCCESS:
		case types.AVAILABILITY_GET_EU.FAILURE:
			return false;
		default:
			return state;
	}
};
const usDeviceListFetchingReducer = (state = false, action) => {
	switch (action.type) {
		case types.LIST_GET_US.REQUEST:
			return true;
		case types.LIST_GET_US.SUCCESS:
		case types.LIST_GET_US.FAILURE:
			return false;
		default:
			return state;
	}
};
const usDeviceAvailabilityFetchingReducer = (state = false, action) => {
	switch (action.type) {
		case types.AVAILABILITY_GET_US.REQUEST:
			return true;
		case types.AVAILABILITY_GET_US.SUCCESS:
		case types.AVAILABILITY_GET_US.FAILURE:
			return false;
		default:
			return state;
	}
};

const euFetchingReducer = combineReducers({
	deviceList: euDeviceListFetchingReducer,
	availability: euDeviceAvailabilityFetchingReducer
});
const usFetchingReducer = combineReducers({
	deviceList: usDeviceListFetchingReducer,
	availability: usDeviceAvailabilityFetchingReducer
});
const fetchingReducer = combineReducers({
	eu: euFetchingReducer,
	us: usFetchingReducer
});

const deviceList = combineReducers({
	eu: euDevicesReducer,
	us: usDevicesReducer
});

const reducer = combineReducers({
	deviceList,
	filterMode: filterModeReducer,
	fetching: fetchingReducer
});

export default reducer;


// HELPERS

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
