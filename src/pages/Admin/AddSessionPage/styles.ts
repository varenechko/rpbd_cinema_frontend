import styled from "@emotion/styled";
import { Box, Select} from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const SelectStyled = styled(Select)({
    color: "#D5D5D5",
    marginBottom: '15px',
    minWidth: '150px',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '.MuiSvgIcon-root ': {
      fill: "#00b021 !important",
    }
});

export const DateTimePickerStyled = styled(DateTimePicker)({
    '.myDatePicker MuiInputBase-inputAdornedEnd': {
        borderColor: 'green',
        border: '1px',
      },
      
      '.myDatePicker .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
        border: '1px',
        borderColor: 'red',
      },
      '& .MuiPickerStaticWrapper-root': {
        border: '1px',
        borderColor: '#00b021',
      },
      color: "#D5D5D5",
    marginBottom: '15px',
    border: '1px',
        borderColor: '#00b021',
    minWidth: '150px',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00b021',
    },
    '.MuiSvgIcon-root ': {
      fill: "#00b021 !important",
    }
});

export const AddSessionPageWrapper = styled(Box)`
width: 100%;
min-height: calc(100vh - 200px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
padding-top: 15px;
`;