import TableList from "../../../../components/Dashboard/TableList";
import { TableRow, styled, Checkbox } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDataContext } from "../../../../utils/showHideTabData";
import { getDataRequest } from "../../../../redux/modules/setting/assessmentGroup/action";

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

export default function AssignmentByGroup() {
  let tableHead = ["Assesment Group Name", "Created By", "Assesment List", "Status"]
  let dispatch = useDispatch();

  let { getAssessmentGroup } = useSelector((state: any) => {
    let { getAssessmentGroup } = state;
    return { getAssessmentGroup }
  })

  useEffect(() => {
    dispatch(getDataRequest())
  }, [dispatch])

  let [assessmentGroupList, setAssessmentGroupList] = useState<any>([]);
  const { editData, setEditData } = useContext(UpdateDataContext);
  const updateData = (e: any) => {
    setAssessmentGroupList((prevalue: any) => {
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
        assessmentGroupList,
        assessmentToolList: []
      }
    })
  }, [setEditData, assessmentGroupList])

  useEffect(() => {
    if (editData?._id && typeof editData.assessmentToolList[0] === "object" && editData.assessmentToolList.length > 0) {
      let newAssessmentToolList: any = [];
      let updateNewData: boolean = true;
      for (let i in editData) {
        if (i === "assessmentToolList" && editData[i][0]?._id) {
          for (let x in editData[i]) {
            if (editData[i][x] !== assessmentGroupList[x] && updateNewData) {
              updateNewData = false
            }
            if (editData[i][x]._id) {
              newAssessmentToolList.push(editData[i][x]._id)
            }
          }
        }
      }
      if (!updateNewData) {
        setAssessmentGroupList(newAssessmentToolList)
      }
    }
  }, [editData, assessmentGroupList, setAssessmentGroupList]);

  return (
    <>
      <TableList tableHead={tableHead} type={true}>
        {(getAssessmentGroup?.data && getAssessmentGroup?.data?.data?.length > 0) ?
          getAssessmentGroup?.data?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.createdAt}${index}`}>
              <StyledTableCell component="th" scope="row">{<Checkbox disabled={editData?._id ? true : false} name="assessmentGroupList" checked={assessmentGroupList.includes(item._id) ? true : false} value={item._id} onChange={(e) => { updateData(e) }} />} {item.assessmentTitle}</StyledTableCell>
              <StyledTableCell align="center">{item.roleId === 1 ? "Pegasus Admin" : "School Admin"}</StyledTableCell>
              <StyledTableCell align="center">{item.assessmentList?.length > 0 && item?.assessmentList.map((nestedItem: any, index: number) => { return (<span key={`${nestedItem?.assessmentTitle}${index}`}>{nestedItem?.assessmentTitle}{(item?.assessmentList?.length - 1) !== index && ", "}</span>) })}</StyledTableCell>
              <StyledTableCell align="center">{item.status ? "Active" : "Inactive"}</StyledTableCell>
            </StyledTableRow>
          ))
          :
          <StyledTableRow >
            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
              <h1>THERE IS NO DATA HERE</h1>
            </StyledTableCell>
          </StyledTableRow>}
      </TableList >

    </>
  );
}
