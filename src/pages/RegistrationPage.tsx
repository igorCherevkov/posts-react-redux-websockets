import { AuthForm } from "../components/AuthForm/AuthForm";
import { LOGIN_ROUTE } from "../consts/routes";

export const RegistrationPage = () => {
  return (
    <AuthForm
      title="REGISTRATION"
      button="REGISTRATION"
      link={LOGIN_ROUTE}
      linkText="Login"
      spanText="Have an account?"
    />
  );
};
