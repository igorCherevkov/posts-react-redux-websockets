import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLoginCircleFill } from "react-icons/ri";

import styles from "./AuthForm.module.css";
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
    <div className={styles.formWrap}>
      <div className={styles.wrapContainer}>
        <form onSubmit={handleSubmitForm} className={styles.formContainer}>
          <h1 className={styles.formTitle}>{props.title}</h1>
          <div className={styles.formInputContainer}>
            <input
              type="email"
              className={styles.inputContainerInput}
              placeholder="Email"
              name="email"
              required
            />
            <MdEmail className={styles.inputContainerImg} />
          </div>
          <div className={styles.formInputContainer}>
            <input
              type="text"
              className={styles.inputContainerInput}
              placeholder="Login"
              name="login"
              required
            />
            <RiLoginCircleFill className={styles.inputContainerImg} />
          </div>
          <div className={styles.formInputContainer}>
            <input
              type="password"
              className={styles.inputContainerInput}
              placeholder="Password"
              name="password"
              required
            />
            <RiLockPasswordFill className={styles.inputContainerImg} />
          </div>
          <button type="submit" className={styles.inputContainerButton}>
            {props.button}
          </button>
          <div className={styles.inputContainerChangeForm}>
            <span className={styles.changeFormText}>{props.spanText}</span>
            <Link to={props.link} className={styles.changeFormLink}>
              {props.linkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
