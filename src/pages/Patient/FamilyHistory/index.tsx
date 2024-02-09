import ShowHideTabData from "../../../utils/showHideTabData";
import FamilyHistoryFrom from "./components/FamilyHistoryForm";
import FamilyHistoryList from "./components/FamilyHistoryTableList";


export default function PatientFamilyHistory() {
   return (
    <>
        <ShowHideTabData ListData={FamilyHistoryList} TabFormData={FamilyHistoryFrom}></ShowHideTabData>
    </>
   );
}
