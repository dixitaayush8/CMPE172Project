import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './employees/DepartmentInfo';

it('renders without crashing', () => {
  const router = document.createElement('TableRow');
  ReactDOM.render(<TableRow />, tableRow);
  ReactDOM.unmountComponentAtNode(tableRow);
});
