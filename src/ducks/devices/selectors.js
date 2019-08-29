/**
 * Converts the object format of devices in the redux store to an array for components
 * @param {object} state - redux state, which has .devices.deviceList
 * @param {string} region - must be 'eu' or 'us'
 * @returns {array} objects that include all the data for a given device
 */
const selectDeviceList = (state, region = 'eu') => {
	return Object.entries(state.devices.deviceList[region]).map(([descriptorId, deviceData]) => ({
		descriptorId,
		...deviceData
	}));
};

export default {
	selectDeviceList
}
