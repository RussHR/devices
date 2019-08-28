import { createApiConstants } from '../../utils/constant';

// Place action type constants here.

export const NAMESPACE_EU = 'eu';
export const NAMESPACE_US = 'us';
export const LIST_GET_EU = createApiConstants(NAMESPACE_EU, 'device_list_get');
export const LIST_GET_US = createApiConstants(NAMESPACE_US, 'device_list_get');
export const AVAILABILITY_GET_EU = createApiConstants(NAMESPACE_EU, 'device_availability_get');
export const AVAILABILITY_GET_US = createApiConstants(NAMESPACE_US, 'device_availability_get');

export default {
	LIST_GET_EU,
	LIST_GET_US,
	AVAILABILITY_GET_EU,
	AVAILABILITY_GET_US
};
