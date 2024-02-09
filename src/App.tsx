import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import Routing from "./route";
import CustomTheme from "./theme";
function App() {
  const navigation = useNavigate();
  useSelector((state: any) => {
    if (
      state.login.error === "Failed to fetch" ||
      state.auth.error === "Failed to fetch"
    ) {
      navigation("/maintenance");
    }
    return state;
  });

  return  <CustomTheme>
  <Routing />
  </CustomTheme>

}

export default App;
