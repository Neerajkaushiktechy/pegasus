import ShowHideTabData from "../../../../utils/showHideTabData";
import TherapyForm from "./components/TherapyForm";
import TherapyTableList from "./components/TherapyTableList";


export default function Therapy() {
    return (
        <>
            <ShowHideTabData ListData={TherapyTableList} TabFormData={TherapyForm}></ShowHideTabData>
        </>
    );
}
