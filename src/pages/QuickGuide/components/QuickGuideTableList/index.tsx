import { useContext, useState, useEffect } from 'react'
import TableHeader from '../../../../components/TableHeader'
import { IconButton, TableRow, styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableList from '../../../../components/Dashboard/TableList';
import { ShowTableDataContext, UpdateDataContext } from '../../../../utils/showHideTabData';
import DialogBox from '../../../../components/DialogBox';
import { useDispatch, useSelector } from 'react-redux';
import { deletequickGuideDataRequest, fetchQuickGuideDataRequest } from '../../../../redux/modules/quickGuide/action';
import { API_BASE_URL } from '../../../../utils/globalConstants';
import { getRole, getUserId } from '../../../../utils/commonUtil';
import Loader from '../../../../components/Loader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.secondary,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
let tableHead = (getRole() === 1 || getRole() === 3) ? [
    "Category",
    "Documents",
    "Actions",
] : [
    "Category",
    "Documents",
];
const QuickGuideTableList = () => {
    let dispatch = useDispatch();
    let { postquickguide, getquickguide, updatequickguide, deletequickguide } = useSelector((state: any) => {
        let { postquickguide, getquickguide, updatequickguide, deletequickguide } = state;
        return {
            postquickguide,
            getquickguide,
            updatequickguide,
            deletequickguide
        }
    })
    const { setEditData } = useContext(UpdateDataContext);
    const { setShowListData } = useContext(ShowTableDataContext);
    const [deleteId, setdeleteId] = useState('')
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        dispatch(fetchQuickGuideDataRequest())
        if (deletequickguide?.data?.success) {
            deletequickguide.data.success = false;
        }
    }, [dispatch, postquickguide?.data?.success, updatequickguide?.data?.success, deletequickguide?.data?.success])
    const handleSubmit = () => {
        dispatch(deletequickGuideDataRequest(deleteId));
        setOpenDialog(false)
    }

    if (getquickguide?.loading) {
        return <Loader />
    }

    return (
        <>
            {(getRole() === 1 || getRole() === 3) && <TableHeader tabHeaderName="Quick Guide" buttonText="Add New" />}
            <TableList tableHead={tableHead} type={true}>
                {
                    getquickguide?.data?.length > 0 ?
                        getquickguide?.data?.map((guide: any, index: number) => (
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {guide?.categoryName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        guide?.file?.length > 0 ?
                                            guide?.file?.map((file: any) => (<a className='file_list' target='_blank' rel='noreferrer' href={`${API_BASE_URL}quickguidedoc/${guide?._id}/filename/${file?.fileName}`}> {file?.fileName} </a>)) : "-"
                                    }
                                </StyledTableCell>
                                {
                                    (getRole() === 1 || getRole() === 3) &&
                                    <StyledTableCell align="center">
                                        {
                                            (getRole() === 1 || getUserId() === guide?.createdBy) &&
                                            <IconButton
                                                onClick={() => { setShowListData(false); setEditData(guide) }}
                                                sx={{ color: "#017BAC" }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        }
                                        {
                                            (getRole() === 1 || getUserId() === guide?.createdBy) &&
                                            <IconButton sx={{ color: "#C53E4E" }}
                                                onClick={() => {
                                                    setOpenDialog(true);
                                                    setdeleteId(guide?._id)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    </StyledTableCell>
                                }
                            </StyledTableRow>
                        ))
                        :
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
                                <h1>THERE IS NO DATA HERE</h1>
                            </StyledTableCell>
                        </StyledTableRow>
                }

            </TableList>
            <DialogBox buttonIcon={"delete"} openDialog={openDialog} handleSubmit={handleSubmit} handleClose={() => setOpenDialog(false)} title={'Are you sure want to delete?'} />
        </>
    )
}

export default QuickGuideTableList