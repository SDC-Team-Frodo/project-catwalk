import axios from 'axios';

const request = {
  get: (endpoint, params) => (
    axios.get('/api', {
      params: {
        endpoint,
        params,
      },
    })
  ),
  post: (endpoint, data) => (
    axios.post('/api', {
      endpoint,
      data,
    })
  ),
  put: (endpoint, params) => (
    axios.put('/api', {
      endpoint,
      params,
    })
  ),
  postPhotos: (fileData) => (
    axios.post('/photos', {
      fileData,
    })
  ),
};

export default request;
