import { useState, Fragment } from 'react'
import { v4 as uuid } from 'uuid';
import closeIcon from "../../../../assets/close.png";
import {
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Typography,
  IconButton
} from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
type props = {
  fieldform?: any,
  show?: any,
  setshow?: any,
  setfieldsArray: any;
  editCustomForm?: any;
  seteditCustomForm?: any
};
const DynamicFormFiledAdd = ({ fieldform, setshow, setfieldsArray, editCustomForm, seteditCustomForm }: props) => {
  const [formData, setformData] = useState({
    label: editCustomForm?.label ? editCustomForm?.label : "",
    placeholder: editCustomForm?.placeholder ? editCustomForm?.placeholder : "",
    options: editCustomForm?.options ? editCustomForm?.options : [{
      label: "",
      value: ""
    }],
  })


  const handleChangeFormOption = (e: any, i: number) => {
    let formValue: any = { ...formData };
    formValue.options[i]['label'] = e.target.value
    formValue.options[i]['value'] = e.target.value
    setformData(formValue)
  }

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;
    setformData((prev: any) => ({ ...prev, [name]: value }))

  }

  const handleSubmit = (e: any) => {
    const unique_id = uuid();
    e.preventDefault();
    let dataObject: any = {
      fieldName: formData.label.slice(0, 4),
      id: unique_id.slice(0, 8),
      inputType: fieldform?.inputType,
      label: formData.label,
      defaultValue: "",
      placeholder: formData.placeholder
    }
    switch (fieldform?.inputType) {
      case 'text':
        break;
      case 'textarea':
        break;
      case 'select':
        dataObject.options = formData.options
        break;
      case 'checkbox':
        dataObject.options = formData.options
        break;
      case 'multicheckbox':
        dataObject.options = formData.options
        break;
      case 'radiogroup':
        dataObject.options = formData.options
        break;
      default:

    }
    if (editCustomForm !== undefined && Object.keys(editCustomForm)?.length > 0) {
      setfieldsArray((prev: any) => {
        let updateArray = [...prev?.fields]
        let findIndex = updateArray?.findIndex((item) => item?.id === editCustomForm?.id)
        if (findIndex !== -1) {
          updateArray[findIndex] = dataObject
        }
        return {
          ...prev,
          fields: updateArray
        }
      })
      seteditCustomForm({})
    }
    else {
      setfieldsArray((prev: any) => {
        return {
          ...prev,
          fields: [...prev.fields, dataObject]
        }
      })
    }
    setshow(false)
  }

  const handleAddOption = () => {
    setformData((prev: any) => {
      return {
        ...prev,
        options: [...prev.options, {
          label: "",
          value: ""
        }]
      }
    })
  }
  const handleDeleteOption = (index: number) => {
    formData.options.splice(index, 1)
    setformData((prev: any) => {
      return {
        ...prev,
        options: formData.options
      }
    })
  }

  const dynamicFormLabel = () => {
    switch (fieldform?.inputType) {
      case 'text':
        return (
          <>
            <Grid container spacing={2} >
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required sx={{ textTransform: "capitalize" }}>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    sx={{ textTransform: "capitalize" }}
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="placeholder" required sx={{ textTransform: "capitalize" }}>
                    {fieldform?.fieldform?.Placeholder}
                  </InputLabel>
                  <Input
                    sx={{ textTransform: "capitalize" }}
                    id="placeholder"
                    placeholder="Enter Placeholder"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData?.placeholder}
                    name="placeholder"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* </Box> */}
          </>
        )

      case 'textarea':
        return (
          <>
            <Grid container spacing={2} >
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required sx={{ textTransform: "capitalize" }}>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    sx={{ textTransform: "capitalize" }}
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="placeholder" required>
                    {fieldform?.fieldform?.Placeholder}
                  </InputLabel>
                  <Input
                    id="placeholder"
                    placeholder="Enter Placeholder"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData?.placeholder}
                    name="placeholder"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
          </>
        )

      case 'select':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography className='form_filled_dynamic' sx={{ fontSize: "18px", margin: "0px 45px" }}>{fieldform?.fieldform?.OptionLabel}</Typography>
            {
              formData?.options?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Grid container spacing={2} alignItems={'end'}>
                    <Grid item xs={10}>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          required
                          type='text'
                          onChange={(e) => handleChangeFormOption(e, index)}
                          value={item?.value}
                          name="placeholder"
                          fullWidth
                          disableUnderline

                          className='option-input'
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                      {
                        index > 0 &&

                        <IconButton sx={{
                          color: "#fff", background: "#C53E4E",
                          borderRadius: "6px"
                        }} onClick={() => { handleDeleteOption(index) }}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }
                    </Grid>
                  </Grid>
                </Fragment>
              ))
            }
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton sx={{
                color: "#fff", background: "rgb(50, 205, 50)",
                borderRadius: "6px"
              }} onClick={handleAddOption}>
                <AddBoxOutlinedIcon />
              </IconButton>

            </Grid>


          </>
        )
      case 'checkbox':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography className='form_filled_dynamic' sx={{ fontSize: "18px", margin: "0px 45px" }}>{fieldform?.fieldform?.OptionLabel}</Typography>
            {
              formData?.options?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Grid container spacing={2} alignItems={'end'}>
                    <Grid item xs={11}>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          required
                          type='text'
                          onChange={(e) => handleChangeFormOption(e, index)}
                          value={item?.value}
                          name="placeholder"
                          fullWidth
                          disableUnderline
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                      {
                        index > 0 &&

                        <IconButton sx={{
                          color: "#fff", background: "#C53E4E",
                          borderRadius: "6px"
                        }} onClick={() => { handleDeleteOption(index) }}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }
                    </Grid>
                  </Grid>
                </Fragment>
              ))
            }
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", paddingTop: "15px" }}>
              <IconButton sx={{
                color: "#fff", background: "rgb(50, 205, 50)",
                borderRadius: "6px"
              }} onClick={handleAddOption}>
                <AddBoxOutlinedIcon />
              </IconButton>

            </Grid>


          </>
        )
      case 'multicheckbox':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography className='form_filled_dynamic' sx={{ fontSize: "18px", margin: "0px 45px" }}>{fieldform?.fieldform?.OptionLabel}</Typography>
            {
              formData?.options?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Grid container spacing={2} alignItems={'end'}>
                    <Grid item xs={11}>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          required
                          type='text'
                          onChange={(e) => handleChangeFormOption(e, index)}
                          value={item?.value}
                          name="placeholder"
                          fullWidth
                          disableUnderline
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                      {
                        index > 0 &&

                        <IconButton sx={{
                          color: "#fff", background: "#C53E4E",
                          borderRadius: "6px"
                        }} onClick={() => { handleDeleteOption(index) }}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }

                    </Grid>
                  </Grid>
                </Fragment>
              ))
            }
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", paddingTop: "15px" }}>
              <IconButton sx={{
                color: "#fff", background: "rgb(50, 205, 50)",
                borderRadius: "6px"
              }} onClick={handleAddOption}>
                <AddBoxOutlinedIcon />
              </IconButton>

            </Grid>


          </>
        )
      case 'radiogroup':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography className='form_filled_dynamic' sx={{ fontSize: "18px", margin: "0px 45px" }}>{fieldform?.fieldform?.OptionLabel}</Typography>
            {
              formData?.options?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Grid container spacing={2} alignItems={'end'}>
                    <Grid item xs={11}>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          required
                          type='text'
                          onChange={(e) => handleChangeFormOption(e, index)}
                          value={item?.value}
                          name="placeholder"
                          fullWidth
                          disableUnderline
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                      {
                        index > 0 &&

                        <IconButton sx={{
                          color: "#fff", background: "#C53E4E",
                          borderRadius: "6px"
                        }} onClick={() => { handleDeleteOption(index) }}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }
                    </Grid>

                  </Grid>
                </Fragment>
              ))
            }
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", paddingTop: "15px" }}>
              <IconButton sx={{
                color: "#fff", background: "rgb(50, 205, 50)",
                borderRadius: "6px"
              }} onClick={handleAddOption}>
                <AddBoxOutlinedIcon />
              </IconButton>

            </Grid>


          </>
        )
      case 'file':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    File Upload
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Label"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>

          </>
        )
      case 'date':
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="label" required>
                    {/* {fieldform?.fieldform?.Label} */}
                    Question
                  </InputLabel>
                  <Input
                    id="label"
                    placeholder="Enter Question"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData.label}
                    name="label"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="placeholder" required>
                    {fieldform?.fieldform?.Placeholder}
                  </InputLabel>
                  <Input
                    id="placeholder"
                    placeholder="Enter Placeholder"
                    required
                    type='text'
                    onChange={handleChangeForm}
                    value={formData?.placeholder}
                    name="placeholder"
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
            </Grid>
          </>
        )
      default:
        <></>
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#440E661A",
          padding: "24px 18px",
          borderRadius: "4px 4px 0px 0px",
          marginBottom: "20px",
          color: "#271E4A"
        }}
      > Custom Form
      </div>
      <Box
        component="form"
        // sx={{ padding: "30px !important" }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >


        <Box sx={{ padding: "0 24px !important" }}>
          {dynamicFormLabel()}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box textAlign="right" mb="30px">
              <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                setshow(false);
                if (seteditCustomForm != undefined) {
                  seteditCustomForm({})
                }
              }}>
                Cancel
              </Button>
              <Button sx={{ mr: "25px" }} variant="contained" color="secondary" type="submit">
                {editCustomForm !== undefined && Object.keys(editCustomForm)?.length > 0 ? "Update" : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}

export default DynamicFormFiledAdd