import React from 'react';
import { render } from 'react-dom';
import Component from './component';

export const paint = ($element, layout) => {
  console.log('Painted', $element);
  render(<Component layout={layout} />, $element[0]);

  if(module.hot) {
    module.hot.accept('./component', () => {
      console.log('hot update');
      const NextComponent = require('./component').default;
      render(<NextComponent layout={layout} />, $element[0]);
    });
  }
};