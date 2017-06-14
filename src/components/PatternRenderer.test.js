import React from 'react';
import ReactDOM from 'react-dom';

import PatternRenderer from './PatternRenderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatternRenderer text="test" />, div);
});
