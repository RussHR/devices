import { createAction, createApiAction } from "../../utils/action";
import api from "./api";
import types from "./types";

// Place simple actions here.
const fetchEuDeviceList = createApiAction(types.LIST_GET_EU, (payload) => api.deviceListEuGet(payload));
const fetchUsDeviceList = createApiAction(types.LIST_GET_US, (payload) => api.deviceListUsGet(payload));
const fetchEuDeviceAvailability = createApiAction(types.AVAILABILITY_GET_EU, (payload) => api.deviceAvailabilityEuGet(payload));
const fetchUsDeviceAvailability = createApiAction(types.AVAILABILITY_GET_US, (payload) => api.deviceAvailabilityUsGet(payload));

// Usage of the utility
const filterSet = createAction(types.FILTER.SET);

export default {
	fetchEuDeviceList,
	fetchUsDeviceList,
	fetchEuDeviceAvailability,
	fetchUsDeviceAvailability,
	filterSet
};
