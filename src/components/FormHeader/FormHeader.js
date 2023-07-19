
import { KgirsLogo, RHMLogo } from "../Images/Images";

export const FormHeader = ({ text }) => (
  <>
    <div className="flex justify-evenly">

      <KgirsLogo />

      <RHMLogo />
    </div>
      <h1 className="text-lg mt-3 text-center"> {text} </h1>
      <h1 className="text-lg mt-5 text-center"> Login</h1>
  </>

);
