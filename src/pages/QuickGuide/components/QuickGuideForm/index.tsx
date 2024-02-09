import { useContext, useState, useEffect } from 'react'
import {
    Input,
    FormControl,
    InputLabel,
    Grid,
    Box,
    Button,
    TextField,
    Typography,
    IconButton
} from "@mui/material";
import closeIcon from "../../../../assets/close.png";
import ClearIcon from '@mui/icons-material/Clear';
import { ShowTableDataContext, UpdateDataContext } from '../../../../utils/showHideTabData';
import { postquickGuideRequest, updatequickGuideRequest } from '../../../../redux/modules/quickGuide/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
type props = {
    editData?: any
};
const QuickGuideForm = ({ editData }: props) => {
    let dispatch = useDispatch();
    let { postquickguide, updatequickguide } = useSelector((state: any) => {
        let { postquickguide, updatequickguide } = state;
        return {
            postquickguide,
            updatequickguide
        }
    })
    const { setShowListData, showListData } = useContext(ShowTableDataContext);
    const { setEditData } = useContext(UpdateDataContext);
    const [formData, setFormData] = useState({
        categoryName: "",
        title: "",
        description: "",
        document: []
    })
    const [fileError ,setFileError] = useState<string>("")

    useEffect(() => {
        if (postquickguide.data?.success) {
            setShowListData(true)
            postquickguide.data = postquickguide?.data.initialState
        }
        if (updatequickguide?.data?.success) {
            setShowListData(true);
            updatequickguide.data = updatequickguide.initialState.data;
            setEditData({})
        }
    }, [postquickguide, updatequickguide, showListData, setShowListData,setEditData])

    useEffect(() => {
        if (editData?._id) {
            setFormData((prev: any) => {
                return {
                    ...prev,
                    ...editData,
                    document: editData?.file?.map((item: any) => {
                        return {
                            name: item?.fileName
                        }
                    })
                }
            })
        }
    }, [editData])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let fileFormData: any = new FormData();
        let files = [...formData.document] as any
        let existFile = []
        for (let i = 0; i < files.length; i++) {
            if (files[i].type) {
                fileFormData.append('quickGuideFiles', files[i])
            }
            else {
                existFile.push({
                    fileName: files[i].name
                })
            }
        }
        if (editData._id) {
            fileFormData.append('categoryName', formData?.categoryName)
            fileFormData.append('title', formData?.title)
            fileFormData.append('description', formData?.description)
            fileFormData.append('document', JSON.stringify(existFile))
            dispatch(updatequickGuideRequest(fileFormData, editData?._id))

        } else {
            fileFormData.append('document', JSON.stringify(existFile))
            dispatch(postquickGuideRequest(formData , fileFormData))
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setFormData((prev: any) => {
            if (name === "document") {
                let files: any = Array.prototype.slice.call(e.target.files);
                let uploaded = [...prev.document];
                let arrayFiles : any  = [...formData?.document]
                e.target.value = ""
                files?.forEach((file: any) => {
                    const filefound : boolean = arrayFiles?.some((el: { name: any; })  => el?.name === file?.name);
                    if(filefound){
                        setFileError('File already exists please upload another one')
                        return ;
                    }
                    uploaded = [file, ...uploaded]
                    setFileError('')
                })
                return {
                    ...prev,
                    document: uploaded

                }
            }
            else {
                return {
                    ...prev,
                    [name]: value

                }
            }


        })

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
                }}
            >
                <p>{editData?._id ? "Update Quick Guide" : "Add Quick Guide"}</p>
                <img
                    style={{ cursor: "pointer" }}
                    src={closeIcon}
                    alt="close"
                    onClick={() => { setShowListData(true); setEditData({}) }}
                />
            </div>
            <Box
                component="form"
                onSubmit={(e) => { handleSubmit(e) }}
                sx={{ padding: "30px !important" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel shrink htmlFor="categoryName" required>
                                        Category Name
                                    </InputLabel>
                                    <Input
                                        id="categoryName"
                                        placeholder="Enter Category"
                                        required
                                        onChange={handleChange}
                                        name="categoryName"
                                        value={formData?.categoryName}
                                        fullWidth
                                        disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{
                    padding: "20px !important", background: "#F9F9F9",
                    borderRadius: "10px"
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel shrink htmlFor="title" required>
                                    Title
                                </InputLabel>
                                <Input
                                    id="title"
                                    placeholder="Enter Title"
                                    required
                                    name="title"
                                    onChange={handleChange}
                                    value={formData?.title}
                                    fullWidth
                                    disableUnderline
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel sx={{ position: "relative" }} shrink htmlFor="description" required>
                                    Description
                                </InputLabel>
                                <TextField
                                    id="description"
                                    rows={2}
                                    required
                                    name="description"
                                    value={formData?.description}
                                    onChange={handleChange}
                                    placeholder="Type here.."
                                    multiline
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center" , }}
                            >
                                <Box className="file_list_wrraper" >
                                    {
                                        formData?.document?.map((file: any, i) => (
                                            <div key={i} className='file_list'>
                                                <div style={{ display: 'flex', alignItems: "center", }}>
                                                    <Typography >{file?.name}</Typography>
                                                    <IconButton onClick={(e) => {
                                                        e.preventDefault();
                                                        setFormData((prev: any) => {
                                                            let fileArray = [...prev.document]
                                                            fileArray.splice(i, 1)
                                                            return {
                                                                ...prev,
                                                                document: fileArray
                                                            }
                                                        })
                                                    }}>
                                                        <ClearIcon
                                                        />
                                                    </IconButton>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </Box>
                                <Box
                                    sx={{ position: "relative" }}
                                >
                                    <Button sx={{
                                        marginLeft: "10px",
                                        width: "175px",
                                        padding: "14px 16px"
                                    }} variant="contained" color="primary">
                                        Browse File
                                    </Button>
                                    <Input
                                        sx={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            marginTop: "0px !important",
                                            top: 0,
                                            left: 0,
                                            border: "unset",
                                            opacity: 0
                                        }}
                                        id="document"
                                        name="document"
                                        required={formData?.document?.length > 0 ? false : true}
                                        type="file"
                                        inputProps={{ accept: '.doc,.docx,.pdf' }}
                                        fullWidth
                                        onChange={handleChange}
                                        disableUnderline
                                        className="dropzone-input"
                                    />
                                </Box>
                            </Box>
                            {
                                    fileError?.length > 0 &&
                                    <p className="error">{fileError}</p>
                                }
                        </Grid>

                    </Grid>
                </Box>

                <Box mt="50px" textAlign="right">
                    <Button
                        onClick={() => { setShowListData(true); setEditData({}); }}
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: "20px" }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" type="submit">
                        {editData?._id ? "Update" : "Save"}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default QuickGuideForm