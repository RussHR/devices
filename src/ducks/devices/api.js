import axios from 'axios';

// Place API calls here.
const deviceListGet = (region = 'eu') => (axios.get(`http://localhost:3004/${region}-devices`));

export default {
	deviceListGet
};
