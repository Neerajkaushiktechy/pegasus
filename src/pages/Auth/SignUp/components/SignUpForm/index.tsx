import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchSignUpRequest } from "../../../../../redux/modules/auth/actions";
import Loader from "../../../../../components/Loader";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state : any)=>{
    return state.auth
  });
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchSignUpRequest(formData));
  };


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
        {loading && <Loader open={loading}/>}
      </form>
    </div>
  );
};

export default SignupPage;