import { useSelector } from "react-redux";
import ShowHideTabData from "../../utils/showHideTabData";
import { AddSchoolForm } from "./components/SchoolForm";
import SchoolTableList from "./components/SchoolTableList";

export default function Schools() {
  let { checkSchoolEmail} = useSelector((state : any)=>{
    let {checkSchoolEmail } = state;
    return {checkSchoolEmail }
  })

  const clearErrorMessage = () => {
    if (checkSchoolEmail?.data?.message !== "") {
      checkSchoolEmail.data = checkSchoolEmail.initialState.data;
    }
  }

  return (
    <>
      <ShowHideTabData
        ListData={SchoolTableList}
        TabFormData={AddSchoolForm}
        modalType={true}
        showdialogbox={false}
        height={"100%"}
        clearErrorMessage={clearErrorMessage}
      />
    </>
  );
}
