import { createApiConstants } from '../../utils/constant';

// Place action type constants here.

export const NAMESPACE = 'devices';
export const LIST_GET = createApiConstants(NAMESPACE, 'list_get');

export default {
	LIST_GET
};
