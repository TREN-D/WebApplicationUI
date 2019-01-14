import { render } from 'react-dom';
import React from 'react';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import App from './app/App';

render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
