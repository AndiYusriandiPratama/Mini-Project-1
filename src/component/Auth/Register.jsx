import {
  Heading,
  Card,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail, registerUser } from "./../../redux/userSlice";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [emailCekErrorMessage, setEmailCekErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isTaken = useSelector((state) => state.user.isTaken);
  const dispatch = useDispatch();
  const registrationError = useSelector(
    (state) => state.user.registrationError
  );

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true); // Menandakan bahwa form sedang dikirim

      try {
        await dispatch(checkEmail(values.email));

        if (isTaken) {
          setEmailCekErrorMessage("Email Already Registered");
          setIsSubmitting(false); // Hentikan pengiriman jika email sudah digunakan
          return;
        }

        // Jika email tersedia, daftarkan pengguna
        const registrationResponse = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(registrationResponse)) {
          setSuccessMessage(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mendaftar:", error);
        setIsSubmitting(false); // Hentikan pengiriman jika terjadi kesalahan
      }
    },
  });

  return (
    <Card maxW="400px" mx="auto" p="4" rounded="md" boxShadow="lg" my="50px">
      <Center>
        <Heading margin={"20px 0"} as={"h3"}>
          {" "}
          SignUp
        </Heading>
      </Center>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            autoComplete=""
          />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
          {emailCekErrorMessage && <div>{emailCekErrorMessage}</div>}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="new-password"
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="password_confirm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirm}
            autoComplete="new-password"
          />
          {formik.touched.password_confirm &&
            formik.errors.password_confirm && (
              <div>{formik.errors.password_confirm}</div>
            )}
        </FormControl>
        <Button
          type="submit"
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          marginTop="20px"
          disabled={formik.isSubmitting} // Disable tombol saat isTaken bernilai true
        >
          Sign Up
        </Button>
      </form>
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Konfigurasi animasi awal
        animate={{
          opacity: successMessage ? 1 : 0,
          y: successMessage ? 0 : -20,
        }} // Animasi masuk
        exit={{ opacity: 0, y: -20 }} // Animasi keluar
        transition={{ duration: 0.5 }} // Durasi animasi (dalam detik)
      >
        {successMessage && (
          <div>Anda telah terdaftar. Redirecting ke halaman login...</div>
        )}
      </motion.div>

      {registrationError && <div>{registrationError}</div>}
    </Card>
  );
};

export default RegisterForm;
