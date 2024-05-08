import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system'; // Import styled from @mui/system

const StyledDatePickerWrapper = styled('div')(({ orientation }) => ({
  display: 'flex',
  flexDirection: orientation === 'vertical' ? 'column' : 'row',
  marginBottom: orientation === 'vertical' ? '10px' : '0', // Add some space between the DatePickers if vertical
  '& > div': {
    marginRight: orientation === 'horizontal' ? '10px' : '0', // Add space between DatePickers when horizontal
    marginBottom: orientation === 'vertical' ? '10px' : '0', // Add space between DatePickers when vertical
  },
}));

const StyledLabel = styled('div')({
  fontSize: '14px',
  marginBottom: '4px', // Add some space between the label and the DatePicker
});

const StyledDatePicker = styled(DatePicker)({
  // Add any custom styles for the DatePicker component here
});

export default function DatePickerValue({ orientation = 'vertical', onStartChange, onEndChange }) {
  const [startDate, setStartDate] = React.useState(dayjs('2024-01-01'));
  const [endDate, setEndDate] = React.useState(dayjs('2024-01-31'));

  // Update start date and end date via props
  React.useEffect(() => {
    onStartChange(startDate);
    onEndChange(endDate);
  }, [startDate, endDate, onStartChange, onEndChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <StyledDatePickerWrapper orientation={orientation}>
          <StyledLabel>Start Date</StyledLabel>
          <StyledDatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="YYYY/MM/DD" // Set the format prop
          />
        </StyledDatePickerWrapper>
        <StyledDatePickerWrapper orientation={orientation}>
          <StyledLabel>End Date</StyledLabel>
          <StyledDatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="YYYY/MM/DD" // Set the format prop
          />
        </StyledDatePickerWrapper>
      </DemoContainer>
    </LocalizationProvider>
  );
}

DatePickerValue.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
};
