import ShowHideTabData from "../../../utils/showHideTabData";
import AssessmentForm from "./components/AssesmentForm"
import AssessMentList from "./components/AssesmentTableList"

export default function AssessmentTool() {
    return (
        <>
            <ShowHideTabData type ="AssesmentListForm"   ListData={AssessMentList} TabFormData={AssessmentForm} showdialogbox={false}></ShowHideTabData>
        </>
    );
}
