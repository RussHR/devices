import { createApiAction } from "../../utils/action";
import api from "./api";
import types from "./types";

// Place simple actions here.
const fetchList = createApiAction(types.LIST_GET, (payload) => api.listGet(payload));

export default {
	fetchList
};
