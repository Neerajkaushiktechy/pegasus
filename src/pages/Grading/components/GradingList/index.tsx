import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../index.scss';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

type props = {
    setShowList: any,
    setAssignmentData: any
}


export default function GradingList({ setShowList, setAssignmentData }: props) {

    let { getGrading } = useSelector((state: any) => {
        let { getGrading } = state;
        return { getGrading }
    });


    let getGradingList: any = []
    getGrading?.data?.data.forEach((element: any) => {
        if(getGradingList.length > 0){
            getGradingList.forEach((e: any, index: number) => {
                if (e.student._id === element.studentId._id) {
                    getGradingList[index].assignmentList.push({ assessmentId: element.assessmentId._id, assessmentTitle: element.assessmentId.assessmentTitle || "-", status: element.status , grade: element?.grade || "" })
                } else {
                    getGradingList.push({ _id: element._id,student:{_id: element.studentId._id, fName: element.studentId.fName, lName: element.studentId.lName} , assignmentList: [{ assessmentId: element.assessmentId._id || "-", assessmentTitle: element.assessmentId.assessmentTitle || "-", status: element.status, grade: element?.grade || "" }] })
                }
            })
        }else{
            getGradingList.push({ _id: element._id,student:{_id: element.studentId._id, fName: element.studentId.fName, lName: element.studentId.lName} , assignmentList: [{ assessmentId: element.assessmentId._id, assessmentTitle: element.assessmentId.assessmentTitle, status: element.status, grade: element?.grade || "" }] })
        }
       
        // if(getGradingList.length > 0){
        //     getGradingList.forEach((e: any, index: number) => {
        //         if (e.student._id === element.studentId._id) {
        //             getGradingList[index].assignmentList.push({ assessmentId: element.assessmentId._id || "-", assessmentTitle: element.assessmentId.assessmentTitle || "-", status: element.status || "-", grade: element?.grade || "" })
        //         } else {
        //             getGradingList.push({ _id: element._id,student:{_id: element.studentId._id, fName: element.studentId.fName, lName: element.studentId.lName} , assignmentList: [{ assessmentId: element.assessmentId._id || "-", assessmentTitle: element.assessmentId.assessmentTitle || "-", status: element.status || "-", grade: element?.grade || "" }] })
        //         }
        //     })
        // }else{
        //     getGradingList.push({ _id: element._id,student:{_id: element.studentId._id, fName: element.studentId.fName, lName: element.studentId.lName} , assignmentList: [{ assessmentId: element.assessmentId._id, assessmentTitle: element.assessmentId.assessmentTitle, status: element.status, grade: element?.grade || "" }] })
        // }

        // id: item?._id,
        // assignmentId: item?.assignmentId?._id,
        // assignmentGrade: item?.grade,
        // assignmentComment: item?.comment,
        // assignmentType: item?.assessmentId?.assesmentType,
        // studentId: item?.studentId?._id,
        // patientDetail: item?.assignmentId?.patient
        // let dataIndex =  getGradingList.findIndex((e:any) => e._id === element.studentId._id)
        // if (dataIndex > -1) {
        //     getGradingList[dataIndex].assignmentList.push({assessmentId:element.assessmentId._id,assessmentTitle: element.assessmentId.assessmentTitle, status :element.status,grade :element?.grade || "" }) 
        // }else{
        //     getGradingList.push({_id : element.studentId._id,fName: element.studentId.fName,lName: element.studentId.lName ,assignmentList:[{assessmentId:element.assessmentId._id,assessmentTitle: element.assessmentId.assessmentTitle, status :element.status,grade :element?.grade || "" }]})
        // }
    });


    return (
        <>
            <TableContainer component={Paper} className='vertical-table' sx={{ display: "grid" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {(getGrading?.data?.data && getGrading?.data?.data.length > 0) ?
                        <>
                            <TableHead className='table-heading'>
                                <TableRow >
                                    <TableCell align="center" sx={{ minWidth: "180px" }}>
                                        <h3>Student Name</h3>
                                    </TableCell>
                                    {getGrading?.data?.data?.map((item: any, index: any) => (
                                        <TableCell align="center" sx={{ minWidth: "180px" }} key={item._id}>{item?.assessmentId?.assessmentTitle}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody className='table-data'>
                                {getGradingList.length > 0 && getGradingList.map((mainItem: any, index: any) => {
                                    return (
                                        <>
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell sx={{ minWidth: "180px" }} align="center" key={mainItem._id}>{mainItem?.student?.fName} {mainItem?.student?.lName}</TableCell>
                                                {mainItem?.assignmentList.map((item: any, index: any) => {
                                                    // if (mainItem._id === item._id) {
                                                        return (
                                                            <TableCell align="center" sx={{ minWidth: "180px" }} key={item._id}>
                                                                {item?.status === 2 && item?.grade ?
                                                                    <Box sx={{ cursor: "pointer" }} >{item?.grade}%</Box>
                                                                    // <Box sx={{ cursor: "pointer" }} onClick={() => { setAssignmentData({ id: item?._id, assignmentId: item?.assignmentId?._id, assignmentGrade: item?.grade, assignmentComment: item?.comment, assignmentType: item?.assessmentId?.assesmentType, studentId: item?.studentId?._id, patientDetail: item?.assignmentId?.patient }); setShowList(false) }}>{item?.grade}%</Box>
                                                                    :
                                                                    <Box sx={{ ...(item?.status === 0 && { bgcolor: 'error.light' }), ...(item?.status === 1 && { bgcolor: 'warning.light' }), ...(item?.status === 2 && { bgcolor: 'success.light' }), m: "0 auto", width: 15, height: 15, borderRadius: '50%' }} />
                                                                }

                                                            </TableCell>
                                                        )
                                                    // }
                                                    // return <TableCell align="center" key={item._id}>-</TableCell>
                                                })}
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </TableBody>
                        </>
                        :
                        <TableBody className='table-data'>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" sx={{ minWidth: "180px" }}>
                                    <h1>No Data to Show</h1>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    }
                </Table>
            </TableContainer>
        </>
    )
}