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
import { useDispatch } from "react-redux";
import { loginUser } from "./../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const UserSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      if (typeof username !== "string" || typeof password !== "string") {
        setLoginError("Invalid username or password format");
        return;
      }

      try {
        const loginResponse = await dispatch(
          loginUser({
            username: values.username,
            password: values.password,
          })
        );

        console.log("login Response", loginResponse);

        if (loginResponse.payload) {
          navigate("/");
        } else {
          if (loginResponse.error && loginResponse.error.message) {
            setLoginError(loginResponse.error.message);
          } else {
            setLoginError("Login failed");
          }
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat login:", error);
        setLoginError("Terjadi kesalahan saat login");
      }
    },
  });

  return (
    <Card maxW="400px" mx="auto" p="4" rounded="md" boxShadow="lg" my="50px">
      <Center>
        <Heading margin={"20px 0"} as={"h3"}>
          Login
        </Heading>
      </Center>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </FormControl>
        <Button
          type="submit"
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          marginTop="20px"
        >
          Login
        </Button>
      </form>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: loginError ? 1 : 0,
          y: loginError ? 0 : -20,
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}
      </motion.div>
    </Card>
  );
};

export default LoginForm;

LoginForm.js;
