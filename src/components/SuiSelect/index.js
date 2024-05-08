import React from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import PropTypes from 'prop-types'; 

const SuiSelect = ({ placeholder, value, onChange, options, additionalText, labelText }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative'  }}>
      <InputLabel
        htmlFor="select-granularity"
        style={{
          position: 'absolute',
          fontSize: '14px',
          marginBottom: '4px',
          top: '-27px',
          left: '1px',
          cursor: 'pointer',
        }}
      >
        {labelText}
      </InputLabel>
      <InputLabel
        htmlFor="select-granularity"
        style={{
          position: 'absolute',
          fontSize: '14px',
          marginBottom: '4px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {additionalText}
      </InputLabel>
      <FormControl variant="outlined" style={{ width: '20ch' }}>
        <Select
          id="select-granularity"
          value={value}
          onChange={onChange}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SuiSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  additionalText: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired, // Prop type for the additional label (required)
};

export default SuiSelect;
