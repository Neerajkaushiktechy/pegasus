import ShowHideTabData from "../../..//utils/showHideTabData";
import MyAssignment from "./component/AssignmentList"
import MyAssignmentDetail from "./component/AssignmentDetail"
import StartAssignment from "./component/StartAssignment"


export default function StudentAssignment() {
    return (
        <>
            <ShowHideTabData ListData={MyAssignment} TabFormData={StartAssignment} showdialogbox={false} ></ShowHideTabData>
        </>
    );
}
