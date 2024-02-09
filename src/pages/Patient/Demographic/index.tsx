import DemographicForm from "./components/demographicForm";
import ShowHideTabData from "../../../utils/showHideTabData";

export default function PatientDemographic() {

    return (
        <>
            <ShowHideTabData showdialogbox={false} TabFormData={DemographicForm}></ShowHideTabData>
        </>
    );
}
