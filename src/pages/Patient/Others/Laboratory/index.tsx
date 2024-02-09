import ShowHideTabData from "../../../../utils/showHideTabData";
import LaboratoryForm from "./components/LaboratoryForm";
import LaboratoryTableList from "./components/LaboratoryTableList";


export default function Laboratory() {
    return (
        <>
            <ShowHideTabData ListData={LaboratoryTableList} TabFormData={LaboratoryForm}></ShowHideTabData>
        </>
    );
}
