import ShowHideTabData from "../../../../utils/showHideTabData";
import NursingCareForm from "./components/NursingCareForm";
import NursingCareTableList from "./components/NursingCareTableList";


export default function NursingCarePlan() {
    return (
        <>
            <ShowHideTabData ListData={NursingCareTableList} TabFormData={NursingCareForm}></ShowHideTabData>
        </>
    );
}
