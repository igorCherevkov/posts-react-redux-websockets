import { AuthForm } from "../components/AuthForm/AuthForm";
import { REGISTRATION_ROUTE } from "../consts/routes";

export const LoginPage = () => {
  return (
    <AuthForm
      title="LOGIN"
      button="LOGIN"
      link={REGISTRATION_ROUTE}
      linkText="Create account"
      spanText="Not a member?"
    />
  );
};
