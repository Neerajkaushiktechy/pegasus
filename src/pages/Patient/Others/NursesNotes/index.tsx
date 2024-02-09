import ShowHideTabData from "../../../../utils/showHideTabData";
import NursesNotesForm from "./components/NursesNotesForm";
import NursesNotesTableList from "./components/NursesNotesTableList";


export default function NursesNotes() {
    return (
        <>
            <ShowHideTabData ListData={NursesNotesTableList} TabFormData={NursesNotesForm}></ShowHideTabData>
        </>
    );
}
