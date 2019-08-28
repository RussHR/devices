import axios from 'axios';

// Place API calls here.

/**
 * API call for the list of devices from the EU data center.
 * @returns {Promise} promise encapsulating result of the API call
 */
const deviceListEuGet = () => (axios.get('http://localhost:3004/eu-devices'));

/**
 * API call for the list of devices from the US data center.
 * @returns {Promise} promise encapsulating result of the API call
 */
const deviceListUsGet = () => (axios.get('http://localhost:3004/us-devices'));

/**
 * API call for the device availability from the EU data center.
 * @returns {Promise} promise encapsulating result of the API call
 */
const deviceAvailabilityEuGet = () => (axios.get('http://localhost:3004/eu-availability'));

/**
 * API call for the device availability from the US data center.
 * @returns {Promise} promise encapsulating result of the API call
 */
const deviceAvailabilityUsGet = () => (axios.get('http://localhost:3004/us-availability'));


export default {
	deviceListEuGet,
	deviceListUsGet,
	deviceAvailabilityEuGet,
	deviceAvailabilityUsGet
};
