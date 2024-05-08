import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SoftSelection({ onRegionChange }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <label 
        htmlFor="standard-basic" 
        style={{ position: 'absolute', fontSize: '14px',
        marginBottom: '4px', top: '-27px', left: '1px', cursor: 'pointer'}}
      >
        Enter Your Region
      </label>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 0, width: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" variant="standard" onChange={onRegionChange} />
      </Box>
    </Box>
  );
}

// Add propTypes validation
SoftSelection.propTypes = {
  onRegionChange: PropTypes.func.isRequired, // Validate that onRegionChange is a required function
};

export default SoftSelection;
