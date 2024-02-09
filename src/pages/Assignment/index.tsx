import ShowHideTabData from "../../utils/showHideTabData";
import AssignmentForm from "../Assignment/components/AssignmentForm"
import AssignedAssigmnet from "../Assignment/components/AssignedAssignment"


export default function StudentAssignment() {
    return (
        <>
            <ShowHideTabData ListData={AssignedAssigmnet} TabFormData={AssignmentForm} showdialogbox={false} modalType={true} width={"50%"}></ShowHideTabData>
        </>
    );
}
