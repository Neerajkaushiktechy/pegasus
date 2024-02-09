import { useEffect, useState } from 'react'
import { Grid } from "@mui/material";
import { DynamicFormComponent } from './components/DynamicFormBuilder'
import LeftSideWrapper from './components/LeftSideWrapper'
import ModalPopup from '../../components/Modal';
import { useLocation } from 'react-router-dom';
import { getSingleCustomForm } from "../../utils/api"
import DialogBox from '../../components/DialogBox';
export default function CreateDynamicForm() {

  const [fieldsArray, setfieldsArray] = useState({
    formName: "",
    fields: [],
    customFormId: ""
  });
  const [copyfieldsArray, setcopyfieldsArray] = useState({
    formName: "",
    fields: [],
    customFormId: ""
  });
  const location = useLocation();
  const [show, setshow] = useState(false);
  const [id, setId] = useState('') as any
  const [previewPopup, setpreviewPopup] = useState(false);
  const [editCustomForm, seteditCustomForm] = useState({})
  const [copyTemplatePopup, setcopyTemplatePopup] = useState(false)
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  useEffect(() => {
    if (location.search !== "") {
      getSingleCustomForm(atob(location.search.split("=")[1]) as any)
        .then((res) => {
          setfieldsArray((prev: any) => {
            return {
              ...prev,
              formName: res?.data?.formName,
              fields: res?.data?.fields,
              customFormId: res?.data?._id
            }
          })

        })
        .catch((err) => console.log(err));
    }
  }, [location.search])
  return (
    <>
      <Grid className='content' container spacing={2}>
        <Grid item xs={7}>
          {
            fieldsArray?.formName !== "" &&
            <div className='right_side_wrapper_component'>
              <DynamicFormComponent show={previewPopup} fields={fieldsArray.fields} formName={fieldsArray.formName} setfieldsArray={setfieldsArray} setshow={setpreviewPopup} customFormId={fieldsArray?.customFormId} seteditOpenCustomForm={() => { setshow(true); setId('') }} seteditCustomForm={seteditCustomForm} location={location} copyTemplatePopup={copyTemplatePopup} />
            </div>
          }
        </Grid>
        <Grid item xs={5}>
          <LeftSideWrapper setfieldsArray={setfieldsArray} fieldsArray={fieldsArray} customFormId={fieldsArray?.customFormId} location={location.search} show={show} setshow={setshow} id={id} setId={setId} editCustomForm={editCustomForm} seteditCustomForm={seteditCustomForm} setcopyfieldsArray={setcopyfieldsArray} setcopyTemplatePopup={setcopyTemplatePopup} copyTemplatePopup={copyTemplatePopup} setShowAlert={setShowAlert} />
        </Grid>
      </Grid>
      {
        previewPopup && <ModalPopup view="" classField="form_filled_preview modal_poppup" height="70%" type="assignment" show={previewPopup} setshow={setpreviewPopup} childern={<DynamicFormComponent fields={fieldsArray.fields} formName={fieldsArray.formName} setfieldsArray={setfieldsArray} show={previewPopup} setshow={setpreviewPopup} />} />
      }
          <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); if (showAlert.success) { setcopyfieldsArray({...fieldsArray})} }} title={showAlert.title} buttonText="Ok" />
    </>
  )
}
