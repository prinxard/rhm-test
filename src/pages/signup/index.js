import SignUpForm from '../../components/Form/SignUpForm';
import { TokenModals, TokenModalsOverlay } from '../../components/modals/Modal';
import { SignUpImage } from '../../components/Images/Images';
const Login = () => {
  return (
    <div className="w-full">
      <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay>

      <div className="flex justify-center w-full">
        <div className="flex justify-between  w-full lg:px-8 md:px-2">
          <div className="hidden md:hidden lg:flex justify-center lg:w-1/2">
            <SignUpImage />
          </div>

          <div className="w-full flex items-center justify-center lg:w-1/2 md:w-full pb-14">
            <div className="px-2 w-96">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
