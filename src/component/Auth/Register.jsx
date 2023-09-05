import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.css"; // Import file CSS Modules

const RegisterForm = () => {
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
    username: Yup.string().required("Username wajib diisi"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Tempatkan kode logika autentikasi di sini
    console.log(values);
    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formRegister}>
        <h2 className={styles.formTitle}>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
