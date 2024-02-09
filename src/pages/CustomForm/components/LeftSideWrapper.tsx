import { useState, useEffect } from 'react'
import { selectField } from '../../../utils/conrolForm'
import ModalPopup from '../../../components/Modal'
import DynamicFormFiledAdd from './DynamicFormFiled';
import { Button, Typography } from "@mui/material";
import CreateFormName from './CreateFornName';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
type props = {
    setfieldsArray: any;
    fieldsArray: any;
    customFormId: string;
    location?: any
    show?: any;
    setshow?: any;
    id?: any;
    setId?: any;
    editCustomForm?: any
    seteditCustomForm?: any
    setcopyfieldsArray?:any
    copyTemplatePopup?:any
    setcopyTemplatePopup?:any
    setShowAlert?:any
};
const LeftSideWrapper = ({ setfieldsArray, fieldsArray, customFormId, location, show, setshow, id, setId, editCustomForm, seteditCustomForm , setcopyfieldsArray ,setcopyTemplatePopup ,copyTemplatePopup  ,setShowAlert}: props) => {
    const [createFormPopup, setcreateFormPopup] = useState(false);
    let [searchParams]  = useSearchParams()
    let { postCustomForm, } = useSelector((state: any) => {
        let { postCustomForm } = state
        return {
          postCustomForm
        }
      })
    useEffect(() => {
        if (copyTemplatePopup && postCustomForm?.data?.success) {
            setcopyTemplatePopup(false);
            setShowAlert({ show: true, title: "Template is created successfully", success: true })
            postCustomForm.data = postCustomForm.initialState.data;
        }
        else if(searchParams.get('edit') === null) {
            setcreateFormPopup(true)
        }
      }, [postCustomForm])


    const checkHeight = (inputType: any) => {
        switch (inputType) {
            case 'select':
                return '70%'
            case 'checkbox':
                return '70%'
            case 'multicheckbox':
                return '70%'
            case 'radiogroup':
                return '70%'
            default:
                return 'auto'
        }
    }

    const editData = (item: any) => {
        let editobject = {
            ...item,
            fieldform: selectField?.find((f) => f?.inputType === item?.inputType)?.fieldform
        }
        return editobject
    }

    return (
        <>
            <div className="elements" style={{ background: "#F9F9F9", borderRadius: "10px", padding: "20px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "20px", color: "black", marginBottom: "30px" }}>Common Fields </Typography>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <>
                        {selectField.map((f, i) => (
                            <>
                                <div className='item' onClick={() => { setId(f.id); setshow(true) }}>
                                    <div key={i} className="">
                                        {f.title}
                                    </div>
                                </div>
                                {

                                    id === f.id &&
                                    <ModalPopup height={() => checkHeight(f.inputType)} classField="form_filled modal_poppup" type="assignment" view="" width="40%" show={show} setshow={setshow} childern={<DynamicFormFiledAdd fieldform={f} show={show} setshow={setshow} setfieldsArray={setfieldsArray} />} />

                                }
                            </>
                        ))}
                        {
                            Object.keys(editCustomForm)?.length > 0 &&
                            <ModalPopup height={() => checkHeight(editCustomForm?.inputType)} classField="form_filled modal_poppup" type="assignment" view="" width="40%" show={show} setshow={setshow} seteditCustomForm={() => seteditCustomForm({})} childern={<DynamicFormFiledAdd fieldform={editData(editCustomForm)} show={show} setshow={setshow} setfieldsArray={setfieldsArray} editCustomForm={editCustomForm} seteditCustomForm={() => seteditCustomForm({})} />} />
                        }
                    </>



                </div>
                {
                    fieldsArray?.formName === "" && location === "" && createFormPopup && customFormId === "" &&
                    <ModalPopup classField="modal_poppup" width="40%" view="" height="auto" type="assignment" show={createFormPopup} setshow={() => { return; }} childern={<CreateFormName  setfieldsArray={setfieldsArray} />} />
                }
            </div>
            {
                customFormId !== "" && customFormId !== undefined &&
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button variant="contained" color="secondary" sx={{ mr: "20px" }} onClick={() => setcopyTemplatePopup(true)}>
                        Copy Template
                    </Button>
                </div>
            }

            {
                copyTemplatePopup &&
                <ModalPopup classField="modal_poppup" width="40%" view="" height="auto" type="assignment" show={copyTemplatePopup} setshow={() => setcopyTemplatePopup(false)} childern={<CreateFormName fieldsArray={fieldsArray} copyTemplatePopup={copyTemplatePopup} handleClose={()=>setcopyTemplatePopup(false)}  setfieldsArray={setfieldsArray} setcopyfieldsArray={setcopyfieldsArray} />} />
            }


        </>

    )
}

export default LeftSideWrapper