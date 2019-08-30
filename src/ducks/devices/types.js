import { createConstants, createApiConstants } from "../../utils/constant";

// Place action type constants here.

const NAMESPACE_EU = 'eu';
const NAMESPACE_US = 'us';
const LIST_GET_EU = createApiConstants(NAMESPACE_EU, 'device_list_get');
const LIST_GET_US = createApiConstants(NAMESPACE_US, 'device_list_get');
const AVAILABILITY_GET_EU = createApiConstants(NAMESPACE_EU, 'device_availability_get');
const AVAILABILITY_GET_US = createApiConstants(NAMESPACE_US, 'device_availability_get');

const NAMESPACE_UI = 'ui_only';
const FILTER = createConstants(NAMESPACE_UI, 'device_filter')('SET');

export default {
	LIST_GET_EU,
	LIST_GET_US,
	AVAILABILITY_GET_EU,
	AVAILABILITY_GET_US,
	FILTER,
	NAMESPACE_EU,
	NAMESPACE_US
};
