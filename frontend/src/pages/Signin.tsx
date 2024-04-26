import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

function Signin() {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <Heading text={"Create an Account"} />
        <InputBox
          label={"First Name"}
          placeholder={"Enter the first name"}
          type={"text"}
        />
      </div>
      <div>hi</div>
    </div>
  );
}

export { Signin };
