import React from "react";
import InputBox from "./authsub/InputBox";
import Title from "./authsub/Title";
import AuthButton from "./authsub/AuthButton";

const Signin = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title subject={"Signup"} />
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

          <AuthButton
            name={"Submit"}
            alt={"Don't have an account"}
            altop={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
