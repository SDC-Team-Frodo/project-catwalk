import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app'));

axios.get('/api', {
  endpoint: 'products/69696',
  data: {
    count: 25,
    page: 2,
  },
});
