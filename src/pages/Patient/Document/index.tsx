import ShowHideTabData from "../../../utils/showHideTabData";
import DocumentsForm from "./components/DocumentsForm"
import DocumentsList from "./components/DocumentsTableList"

export default function PatientDocuments() {
    return (
        <>
            <ShowHideTabData ListData={DocumentsList} TabFormData={DocumentsForm}></ShowHideTabData>
        </>
    );
}
