import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './employees/Employee';

it('renders without crashing', () => {
  const router = document.createElement('Grid');
  ReactDOM.render(<Employee />, router);
  ReactDOM.unmountComponentAtNode(router);
});
