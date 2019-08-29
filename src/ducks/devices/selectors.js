const selectEuDeviceList = (state) => {
	return state.devices.deviceList.eu;
};
const selectUsDeviceList = (state) => {
	return state.devices.deviceList.us;
};

export default {
	selectEuDeviceList,
	selectUsDeviceList
}
