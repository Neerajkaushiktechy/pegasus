import ShowHideTabData from "../../../../utils/showHideTabData";
import DoctorsOrdersForm from "./components/DoctorsOrdersForm";
import DoctorsOrdersTableList from "./components/DoctorsOrdersTableList";


export default function DoctorsOrders() {
    return (
        <>
            <ShowHideTabData ListData={DoctorsOrdersTableList} TabFormData={DoctorsOrdersForm}></ShowHideTabData>
        </>
    );
}
