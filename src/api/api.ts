const axios = require('axios');
const baseUrl = 'http://localhost:8888';

export async function signIn(data: FormData) {
    return await axios.post(baseUrl + '/token', data);
}
