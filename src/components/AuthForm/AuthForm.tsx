import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLoginCircleFill } from "react-icons/ri";

import "./AuthForm.css";
import { AuthProps } from "../../types/redux/authTypes";
import { HOME_ROUTE } from "../../consts/routes";
import { auth } from "../../redux/actions/authActions";
import { AppDispatch } from "../../redux/store";

export const AuthForm = (props: AuthProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const { email, login, password } = Object.fromEntries(formData) as Record<
        string,
        string
      >;

      try {
        let isRegistration = null;
        isRegistration = props.title !== "LOGIN";

        dispatch(auth(email, login, password, isRegistration));

        navigate(HOME_ROUTE);
      } catch (error) {
        // сделать модалку с ошибками
        console.log(error);
      }
    },
    [dispatch, navigate, props.title]
  );

  return (
    <div className="form__wrap wrap">
      <div className="wrap__container">
        <form onSubmit={handleSubmitForm} className="form__container form">
          <h1 className="form__title">{props.title}</h1>
          <div className="form__input-container input-container">
            <input
              type="email"
              className="input-container__input"
              placeholder="Email"
              name="email"
              required
            />
            <MdEmail className="input-container__img-container" />
          </div>
          <div className="form__input-container input-container">
            <input
              type="text"
              className="input-container__input"
              placeholder="Login"
              name="login"
              required
            />
            <RiLoginCircleFill className="input-container__img-container" />
          </div>
          <div className="form__input-container input-container">
            <input
              type="password"
              className="input-container__input"
              placeholder="Password"
              name="password"
              required
            />
            <RiLockPasswordFill className="input-container__img-container" />
          </div>
          <button type="submit" className="input-container__button">
            {props.button}
          </button>
          <div className="input-container__change-form change-form">
            <span className="change-form__text">{props.spanText}</span>
            <Link to={props.link} className="change-form__link">
              {props.linkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
