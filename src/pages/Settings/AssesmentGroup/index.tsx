import ShowHideTabData from "../../../utils/showHideTabData";
import AssessmentGroupForm from "./components/AssesmentGroupForm"
import AssessMentGroupList from "./components/AssesmentGroupTableList"

export default function AssessmentGroup() {
    return (
        <>
            <ShowHideTabData ListData={AssessMentGroupList} TabFormData={AssessmentGroupForm} showdialogbox={false} modalType={true} height={"auto"} width={"50%"}></ShowHideTabData>
        </>
    );
}
