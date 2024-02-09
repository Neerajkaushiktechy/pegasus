import ShowHideTabData from "../../../../utils/showHideTabData";
import Prosthetics_AidsForm from "./components/Prosthetics_AidsForm";
import Prosthetics_AidsTableList from "./components/Prosthetics_AidsTableList";


export default function Prosthetics_Aids() {
    return (
        <>
            <ShowHideTabData ListData={Prosthetics_AidsTableList} TabFormData={Prosthetics_AidsForm}></ShowHideTabData>
        </>
    );
}
