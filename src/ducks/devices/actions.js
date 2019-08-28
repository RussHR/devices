import { createApiAction } from "../../utils/action";
import api from "./api";
import types from "./types";

// Place simple actions here.
const fetchEuDeviceList = createApiAction(types.LIST_GET_EU, (payload) => api.deviceListGet(payload));
const fetchUsDeviceList = createApiAction(types.LIST_GET_US, (payload) => api.deviceListGet(payload));

export default {
	fetchEuDeviceList,
	fetchUsDeviceList
};
