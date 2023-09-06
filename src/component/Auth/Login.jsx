import { Formik, Field, Form, ErrorMessage } from "formik";
import style from "./Login.module.css";
import * as Yup from "yup";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
  });

  const handleSubmit = (values) => {
    // Lakukan sesuatu dengan data login seperti mengirimkan ke server
    console.log("Data login:", values);
  };

  return (
    <div className={style.formLoginContainer}>
      <div className={style.formLogin}>
        <h2 className={style.formLoginTitle}>Form Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className={style.formLoginGroup}>
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className={style.formLoginGroup}>
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
