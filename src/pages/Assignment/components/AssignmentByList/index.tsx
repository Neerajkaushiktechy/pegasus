import TableList from "../../../../components/Dashboard/TableList";
import { TableRow, styled, Checkbox } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDataContext } from "../../../../utils/showHideTabData";
import { getDataRequest } from "../../../../redux/modules/setting/assessmentTool/action";

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AssignmentByList() {
  let tableHead = ["Assignment Title", "Created By", "Institute Name", "Module", "Duration"]
  let dispatch = useDispatch();
  let { getAssessment } = useSelector((state: any) => {
    let { getAssessment } = state;
    return { getAssessment }
  })
  useEffect(() => {
    dispatch(getDataRequest({ pagenumber: 0, limit: 0 }))
  }, [dispatch])

  let [assessmentToolList, setAssessmentToolList] = useState<any>([]);

  const { editData, setEditData } = useContext(UpdateDataContext);

  const updateData = (e: any) => {
    setAssessmentToolList((prevalue: any) => {
      let itemIndex = prevalue.indexOf(e?.target.value)
      if (itemIndex === -1) {
        return [
          ...prevalue,
          e?.target.value,
        ];
      } else {
        prevalue.splice(itemIndex, 1)
        return [
          ...prevalue,
        ];
      }
    });
  };
  useEffect(() => {
    setEditData((prevalue: any) => {
      return {
        ...prevalue,
        assessmentToolList,
        assessmentGroupList: []
      }
    })
  }, [setEditData, assessmentToolList])

  useEffect(() => {
    if (editData?._id && typeof editData.assessmentToolList[0] === "object" && editData.assessmentToolList.length > 0) {
      let newAssessmentToolList: any = [];
      let updateNewData: boolean = true;
      for (let i in editData) {
        if (i === "assessmentToolList" && editData[i][0]?._id) {
          for (let x in editData[i]) {
            if (editData[i][x] !== assessmentToolList[x] && updateNewData) {
              updateNewData = false
            }
            if (editData[i][x]._id) {
              newAssessmentToolList.push(editData[i][x]._id)
            }
          }
        }
      }
      if (!updateNewData) {
        setAssessmentToolList(newAssessmentToolList)
      }
    }
  }, [editData, assessmentToolList, setAssessmentToolList]);
  return (
    <>
      <TableList tableHead={tableHead} type={true}>
        {(getAssessment?.data?.data && getAssessment?.data?.data?.length > 0) ?
          getAssessment?.data?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.createdAt}${index}`}>
              <StyledTableCell component="th" scope="row">{<Checkbox disabled={editData?._id ? true : false} name="assessmentToolList" checked={assessmentToolList.includes(item._id) ? true : false} value={item._id} onChange={(e) => { updateData(e) }} />} {item.assessmentTitle}</StyledTableCell>
              <StyledTableCell align="center">{item?.roleId === 1 && "Pegasus Admin"} {item.roleId === 3 && "School Admin"}</StyledTableCell>
              <StyledTableCell align="center">{item?.createdBy?.name}</StyledTableCell>
              <StyledTableCell align="center">{item?.module}</StyledTableCell>
              <StyledTableCell align="center">{item?.duration}</StyledTableCell>
            </StyledTableRow>
          ))
          :
          <StyledTableRow >
            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
              <h1>THERE IS NO DATA HERE</h1>
            </StyledTableCell>
          </StyledTableRow>}
      </TableList>

    </>
  );
}
