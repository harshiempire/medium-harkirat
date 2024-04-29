import { Auth } from "../components/Auth";
import Quote from "../components/Quote";

function Signup() {
  return (
    <div className="grid lg:grid-cols-2 ">
      <Auth type="signup" />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export { Signup };
