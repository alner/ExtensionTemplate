import Component from './component';

export const paint = ($element, layout) => {
  console.log('painted');
  Component($element, layout);

  if(module.hot) {
    module.hot.accept('./component', () => {
      console.log('hot update');
      const NextComponent = require('./component').default;
      NextComponent($element, layout);
    });
  }
};