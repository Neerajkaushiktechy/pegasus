import ShowHideTabData from "../../../utils/showHideTabData";
import AllergiesFrom from "./components/AllergiesForm";
import AllergiesTableList from "./components/AllergiesTableList";


export default function PatientAllergie() {
   return (
    <>
        <ShowHideTabData ListData={AllergiesTableList} TabFormData={AllergiesFrom}></ShowHideTabData>
    </>
   );
}
