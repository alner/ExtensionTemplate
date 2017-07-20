import React from 'react';
import PropTypes from 'prop-types';
import qlik from 'qlik';
import './styles.css';

const Component = ({ layout }) => {
  console.log(qlik, layout);
  return (
    <h1 className='qv-object-test-extension'>Hello Qlik!</h1>
  );
};

Component.propTypes = {
  layout: PropTypes.object.isRequired,
};

export default Component;