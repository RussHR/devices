import axios from 'axios';

// Place API calls here.
const listGet = () => (axios.get('http://localhost:3004/eu-devices'));

export default {
	listGet
};
