import React from "react";
import Button from "../../components/Button";
import { ButtonWarning } from "../../components/ButtonWarning";
import InputBox from "./../../components/InputBox";
import Title from "./../../components/Title";

const Signin = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title subject={"Signin"} />
          <InputBox
            name={"Email"}
            type={"email"}
            placeholder={"name@company.com"}
          />
          <InputBox
            name={"Password"}
            type={"password"}
            placeholder={"secret"}
          />

          <Button label={"Submit"} onClick={"/signup"} />
          <ButtonWarning
            label={"Don't have an accuount?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
