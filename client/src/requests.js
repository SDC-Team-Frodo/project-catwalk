import axios from 'axios';

const request = {
  get: (endpoint, params) => {
    return axios.get('/api', {
      endpoint,
      params,
    });
  },
  post: (endpoint, data) => {
    return axios.post('/api', {
      endpoint,
      data,
    });
  },
  put: (endpoint, params) => {
    return axios.put('/api', {
      endpoint,
      params,
    });
  },
};

export default request;
