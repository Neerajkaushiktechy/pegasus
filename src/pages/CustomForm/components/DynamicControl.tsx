
import { useFormContext, Controller } from "react-hook-form";
import { DynamicFieldData } from "../dynamic-control-types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect, useState } from 'react'
import { decrypt } from "../../../utils/encryptDecrypt";
import {
  Checkbox,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  Input
} from "@mui/material";
import { getRoleId } from "../../../utils/commonUtil";
export const DynamicControl = ({
  inputType,
  fieldName,
  id,
  defaultValue,
  placeholder,
  options = [],
  config = {},
  show,
  checkFormType
}: DynamicFieldData) => {
  const { register, control } = useFormContext();
  const [roleId, setRoleId] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false);
  const [isMultiChecked, setIsMultiChecked] = useState(false);
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      setRoleId(payload.roleId);
    }
  }, [])
  switch (inputType) {
    case "text":
      return (
        <Grid item xs={12}>
          <Input
            className="capitalText"
            id={fieldName}
            {...register(id, config)}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            type='text'
            name={id}
            placeholder={placeholder}
            fullWidth
            disabled={show}
            disableUnderline
          />
        </Grid>
      );
    case "select":
      return (
        <Grid item xs={12}>
          <Select
            sx={{ textTransform: "capitalize" }}
            {...register(id, config)}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            name={id}
            disabled={show}
            id={fieldName}
            fullWidth
            disableUnderline
          >
            {options.map((o, index) => (
              <MenuItem key={index} value={o.value}>
                <Typography variant="body2"> {o.label}</Typography>
              </MenuItem>
            ))}
          </Select>

        </Grid>

      );
    case 'textarea':
      return (
        <Grid item xs={12}>
          <TextField
            {...register(id, config)}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            id={fieldName}
            sx={{ marginBottom: "30px" }}
            name={id}
            type='text'
            disabled={show}
            rows={2}
            placeholder={placeholder}
            fullWidth
            multiline
          />
        </Grid>
      )

    case 'checkbox':
      return (
        <Grid item xs={12} sx={{ marginBottom: "30px" }}>
          {options.map((option: any) => {
            return (
              <FormControlLabel
                control={
                  <Controller
                    defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
                    name={id}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          required={isChecked === false && roleId === 2 ? true : false}
                          disabled={show}
                          checked={option.value === value ? true : false}
                          onChange={() => {
                            onChange(option.value);
                            setIsChecked(true);
                          }}
                        />
                      );
                    }}
                  />
                }
                label={option.label}
                key={option.value}
              />
            );
          })}

        </Grid>
      );

    case 'multicheckbox':
      return (
        <Grid item xs={12} sx={{ marginBottom: "30px" }}>
          {options.map((option: any, index) => {
            return (
              <FormControlLabel
                control={
                  <Controller
                    key={index}
                    control={control}
                    defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
                    name={id}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          required={isMultiChecked === false && roleId === 2 ? true : false}
                          disabled={show}
                          checked={value !== undefined && value.length > 0 && value?.includes(option.value)}
                          onChange={(e) => {
                            const { checked } = e.target
                            let newValue: any;

                            if (checked) {
                              if (Array.isArray(value)) {
                                newValue = [...value, option.value]
                              }
                              else {
                                newValue = [option.value];
                              }
                            }
                            else {
                              let array = [...value];
                              let index = array.findIndex((item) => item === option.value);
                              array.splice(index, 1);
                              if (array?.length > 0) newValue = array;
                              else newValue = "";
                            }
                            onChange(newValue)
                            setIsMultiChecked(true);
                          }
                          }
                        />
                      );
                    }}
                  />
                }
                label={option.label}
                key={option.value}
              />
            );
          })}

        </Grid>
      );


    case 'radiogroup':
      return (
        <Grid item xs={12} sx={{ marginBottom: "30px" }}>
          <Controller
            control={control}
            name={id}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            render={({ field: { onChange, value } }) => (
              <RadioGroup value={value} onChange={onChange}>
                {
                  options.map((o, index) => (
                    <FormControlLabel disabled={show} key={index} value={o.value} control={<Radio required={isRadioChecked === false && roleId === 2 ? true : false} />} label={o.label} />
                  ))}
              </RadioGroup>
            )}
          />
        </Grid>
      );
    case "number":
      return (
        <input
          type="number"
          id={fieldName}
          {...register(fieldName, config)}
        defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
        />
      );
    case "file":
      return (
        <Grid item xs={12}>
          <Controller
            control={control}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            name={id}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <Input
                  id={fieldName}
                  {...field}
                  value={value?.fileName}
                  onChange={(event: any) => {
                    onChange(event.target.files[0]);
                  }}
                  type="file"
                />
              );
            }}
          />
        </Grid>
      );
    case "date":
      return (
        <Grid item xs={12} sx={{ marginBottom: "30px" }}>
          <Controller
            control={control}
            defaultValue={ (getRoleId() === 1 || getRoleId() === 3) ? defaultValue : ""}
            name={id}
            render={({ field: { onChange, value } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={show}
                    format="MM/DD/YYYY"
                    onChange={(event) => onChange(event)}
                    value={value || null}
                    className='custom-datepicker'
                  />
                </LocalizationProvider>
              )
            }}
          />
        </Grid>
      );
    default:
      return <></>
  }
};
