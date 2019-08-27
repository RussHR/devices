import { createConstants } from '../../utils/constant';
// import { createApiConstants } from '../../utils/constant';

// Place action type constants here.

const NAMESPACE_DEVICES = 'devices';
const DEVICES = createConstants(NAMESPACE_DEVICES, 'devices')(
	'ADD',
);

export default {
	DEVICES
};
