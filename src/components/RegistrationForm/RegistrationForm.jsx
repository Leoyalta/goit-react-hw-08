import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short, minimum is 2 letters!")
    .max(50, "Too Long, maximum is 50 letters!")
    .required("This field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Registration Form</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.form}>
          <div className={css.fieldBox}>
            <label>Name</label>
            <Field className={css.field} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.fieldBox}>
            <label>Email</label>
            <Field className={css.field} type="email" name="email" />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>

          <div className={css.fieldBox}>
            <label>Password</label>
            <Field className={css.field} type="password" name="password" />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </div>
          <button className={css.btn} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
