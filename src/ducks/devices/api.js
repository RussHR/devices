import axios from 'axios';

// Place API calls here.

/**
 * @param {string} region - MUST be 'eu' or 'us'
 * @returns {Promise} promise encapsulating result of the API call
 */
const deviceListGet = (region = 'eu') => (axios.get(`http://localhost:3004/${region}-devices`));

export default {
	deviceListGet
};
