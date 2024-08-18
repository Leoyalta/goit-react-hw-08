import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const UserSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short, minimum is 2 letters!")
    .max(50, "Too Long, maximum is 50 letters!")
    .required("This field is required"),
  number: Yup.string()
    .min(6, "Too Short, minimum is 6 numbers!")
    .max(13, "Too Long, maximum is 13 numbers!")
    .required("This field is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.userName,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          userName: "",
          number: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.form}>
          <div className={css.fieldBox}>
            <label htmlFor="userName" className={css.label}>
              Name
            </label>
            <Field
              type="text"
              name="userName"
              id="userName"
              placeholder="Add contact name"
              className={css.field}
            />
            <ErrorMessage
              className={css.error}
              name="userName"
              component="span"
            />
          </div>
          <div className={css.fieldBox}>
            <label htmlFor="number" className={css.label}>
              Number
            </label>
            <Field
              type="tel"
              name="number"
              id="number"
              placeholder="Add contact number"
              className={css.field}
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}
