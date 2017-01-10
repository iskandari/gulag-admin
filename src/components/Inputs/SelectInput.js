import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './SelectInput.css';

const SelectInput = (props) => {
  return (
    <Select {...props} />
  );
};

export default SelectInput;