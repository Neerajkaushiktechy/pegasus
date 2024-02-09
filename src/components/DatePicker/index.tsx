import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function DatePickerComponent({ maxDate, label, onChange, value, disabled, showButton, padding, setshow ,onClick }: any) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={padding ? { padding: "30px" } : {}}
                    label={label}
                    format="MM/DD/YYYY"
                    onChange={onChange}
                    value={value}
                    maxDate={maxDate}
                    disabled={disabled}
                    className='custom-datepicker'
                />
            </LocalizationProvider>
            {showButton === true ? (
                <Stack direction={"row"} mt={3} sx={{ padding: "10px" }} >
                    <Button
                        onClick={() => setshow(false)}
                        sx={{ mr: "10px", mb: "10px", padding: "5px", left: "14px" }}
                        variant="contained"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    {
                        onClick!==undefined &&   <Button
                        onClick={onClick}
                       sx={{ mr: "10px", mb: "10px", padding: "5px", left: "14px" }}
                       variant="contained"
                       color="secondary"
                       type="submit"
                   >
                       Update
                   </Button>
                    }
                  
                </Stack>
            ) : null}
        </>
    );
}