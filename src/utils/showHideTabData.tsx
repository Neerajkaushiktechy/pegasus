import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../components/Modal";
import { decrypt } from "./encryptDecrypt";
import { Box } from "@mui/material";
type props = {
  ListData?: any;
  TabFormData: any;
  modalType?: boolean;
  showdialogbox?: boolean,
  clearErrorMessage?: any,
  height?: any
  width?: any
  type?: any
};
export let ShowTableDataContext = createContext<any>(null);
export let UpdateDataContext = createContext<any>(null);
export let PatientContext = createContext<any>(null);
export let RoleIdContext = createContext<any>(null);

export default function ShowHideTabData({
  ListData = false,
  TabFormData,
  modalType,
  showdialogbox = true,
  clearErrorMessage,
  height,
  width,
  type
}: props) {
  const navigate = useNavigate();
  let { getAssessment } = useSelector((state: any) => {
    let { getAssessment } = state;
    return { getAssessment }
  })
  const [showListData, setShowListData] = useState(true);
  const [editData, setEditData] = useState({});
  const [roleId, setRoleId] = useState()
  let { DemographicRes,postDemographic } = useSelector((state: any) => {
    let {
      postDemographic: { data: DemographicRes },postDemographic,
    } = state;
    return { DemographicRes,postDemographic };
  });
  useEffect(() => {
    if (!DemographicRes?.pId && showdialogbox) {
      navigate("/patients")
    }
  }, [DemographicRes, navigate, showdialogbox]);

  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      setRoleId(payload.roleId);
    }
  }, [])

  return (
    <>
      <ShowTableDataContext.Provider value={{ showListData, setShowListData }}>
        <UpdateDataContext.Provider value={{ editData, setEditData }}>
          <PatientContext.Provider value={DemographicRes}>
            <RoleIdContext.Provider value={roleId}>
              {!showListData && modalType
                ?
                <>
                  <ListData />
                  <ModalPopup view="" height={height} width={width} childern={<TabFormData editData={editData} />} clearErrorMessage={clearErrorMessage} />
                </>
                : type === "AssesmentListForm" && !getAssessment?.assementFormData?.showForm ? <ListData /> : type === "AssesmentListForm" && getAssessment?.assementFormData?.showForm ? <TabFormData editData={editData} /> : (showListData && ListData) ? <ListData /> : <TabFormData editData={editData} />
              }
            </RoleIdContext.Provider>
          </PatientContext.Provider>
        </UpdateDataContext.Provider>
      </ShowTableDataContext.Provider>
    </>
  );
}
