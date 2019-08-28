import { createApiAction } from "../../utils/action";
import api from "./api";
import types from "./types";

// Place simple actions here.
const fetchDeviceList = createApiAction(types.LIST_GET, (payload) => api.deviceListGet(payload));

export default {
	fetchDeviceList
};
