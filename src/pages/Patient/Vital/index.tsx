import ShowHideTabData from "../../../utils/showHideTabData";
import VitalForm from "./components/vitalForm";
import VitalTableList from "./components/vitalTableList";

export default function Vitals(){
    return (
        <ShowHideTabData ListData={VitalTableList} TabFormData={VitalForm}></ShowHideTabData>
    )
}