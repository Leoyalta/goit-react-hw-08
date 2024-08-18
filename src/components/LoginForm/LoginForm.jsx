import { Field, Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export default function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap();
      actions.resetForm();
    } catch (error) {
      toast.error(
        error || "Login failed. Please check your email and password."
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Log in to the App</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputForm}>
            <label htmlFor={emailId}>Email: </label>
            <Field
              type="email"
              name="email"
              id={emailId}
              autoComplete="email"
              className={css.input}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={css.errorMessage}
            />
          </div>
          <div className={css.inputForm}>
            <label htmlFor={passwordId}>Password: </label>
            <Field
              type="password"
              name="password"
              id={passwordId}
              autoComplete="current-password"
              className={css.input}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMessage}
            />
          </div>
          <button type="submit" className={css.btn}>
            {" "}
            Log in{" "}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
