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
			region: string ('EU' || 'US'),
			available: bool
		}
	}
}
*/

const devicesReducer = (state = {}, action) => {
	switch (action.type) {
		case types.DEVICES.ADD:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}

const reducer = combineReducers({
	deviceList: devicesReducer
});

export default reducer;
