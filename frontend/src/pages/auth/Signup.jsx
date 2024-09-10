import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import { ButtonWarning } from "../../components/ButtonWarning";
import InputBox from "./../../components/InputBox";
import Title from "./../../components/Title";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title subject={"Signup"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name={"Email"}
            type={"email"}
            placeholder={"name@company.com"}
          />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name={"First Name"}
            type={"text"}
            placeholder={"Yaswanth"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            name={"Last Name"}
            type={"text"}
            placeholder={"Modepalli"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name={"Password"}
            type={"password"}
            placeholder={"secret"}
          />

          <Button
            label={"Submit"}
            onClick={async () => {
              await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password,
              });
            }}
          />
          <ButtonWarning
            label={"Already have an accuount?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
