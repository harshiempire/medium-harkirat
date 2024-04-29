import { ChangeEvent, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "./Button";
import { SignInInput, SignUpInput } from "@alleharshi/common-medium";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface AuthPropsTypes {
  type: "signin" | "signup";
}

export const Auth = ({ type }: AuthPropsTypes) => {
  const navigate = useNavigate();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostInputs((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  };

  const [postInputs, setPostInputs] = useState<SignUpInput | SignInInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = await response.data;
      localStorage.setItem("token", jwt.token);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  // lg:mx-28 md:mx-48 mx-32
  return type == "signup" ? (
    <div className="flex justify-center flex-col h-screen mx-auto ">
      <div className="">
        <Heading
          mainText="Create an Account"
          subText="Already have an account?"
          link="signin"
          linkText="Login"
        />
        <div className="">
          {type === "signup" && (
            <InputBox
              label={"First Name"}
              placeholder={"Enter the first name"}
              name={"name"}
              value={(postInputs as SignUpInput).name}
              type={"text"}
              onChange={onChange}
            />
          )}
          <InputBox
            label={"Email"}
            placeholder={"johedoe@email.com"}
            name={"email"}
            value={postInputs.email}
            type={"email"}
            onChange={onChange}
          />
          <InputBox
            label={"Password"}
            placeholder={"Enter the Password"}
            name={"password"}
            value={postInputs.password}
            type={"password"}
            onChange={onChange}
          />
          <div className="mt-5">
            <Button onClick={sendRequest}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="flex flex-col justify-center p-12 space-y-8 bg-white">
        <div className="text-sm uppercase tracking-wider text-gray-500">
          New here?
          <Link className="text-blue-500 px-1" to="/signup">
            Create an account
          </Link>
        </div>

        <h1 className="text-5xl font-bold">Welcome Back</h1>
        <form className="space-y-6">
          <InputBox
            label="Email"
            placeholder="name@example.com"
            type="email"
            name="email"
            value={postInputs.email} // you need to define emailValue and handle its change
            onChange={onChange} // you need to define setEmailValue
          />
          <InputBox
            label="Password"
            placeholder="••••••••"
            type="password"
            name="password"
            value={postInputs.password} // you need to define passwordValue and handle its change
            onChange={onChange} // you need to define setPasswordValue
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <Checkbox id="remember" />
              <Label className="text-sm" htmlFor="remember">
                Remember me
              </Label> */}
            </div>
            <Link className="text-sm text-blue-500" to="#">
              Forgot password?
            </Link>
          </div>
          <Button onClick={sendRequest}>Sign In</Button>
        </form>
      </div>
      <div className="flex items-center justify-center p-12 bg-gray-100">
        <blockquote className="text-gray-600 italic">
          <p className="text-3xl font-bold">
            "Sometimes life is going to hit you in the head with a brick. Don't
            lose faith."
          </p>
          <footer className="mt-4 text-lg font-semibold">Steve Jobs</footer>
          <span className="text-sm text-gray-500">Founder of Apple Inc.</span>
        </blockquote>
      </div>
    </div>
  );
};
