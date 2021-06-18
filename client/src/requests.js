import { get, post, put } from 'axios';

const request = {
  get: (endpoint, params) => (
    get('/api', {
      params: {
        endpoint,
        params,
      },
    })
  ),
  post: (endpoint, data) => (
    post('/api', {
      endpoint,
      data,
    })
  ),
  put: (endpoint, params) => (
    put('/api', {
      endpoint,
      params,
    })
  ),
  postPhotos: (fileData) => (
    post('/photos', {
      fileData,
    })
  ),
};

export default request;
