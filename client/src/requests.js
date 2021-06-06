import axios from 'axios';

const request = {
  get: (endpoint, params) => {
    axios.get('/api', {
      endpoint,
      params,
    });
  },
  post: (endpoint, data) => {
    axios.post('/api', {
      endpoint,
      data,
    });
  },
  put: (endpoint, params) => {
    axios.put('/api', {
      endpoint,
      params,
    });
  },
};

export default request;
