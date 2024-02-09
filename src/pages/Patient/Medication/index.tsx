import ShowHideTabData from "../../../utils/showHideTabData";
import MedicationFrom from "./components/MedicationFrom";
import MedicationList from "./components/MedicationList";


export default function Medication() {
   return (
    <>
        <ShowHideTabData ListData={MedicationList} TabFormData={MedicationFrom}></ShowHideTabData>
    </>
   );
}
