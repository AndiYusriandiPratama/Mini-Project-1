import { useEffect } from "react";
import {
  Button,
  Center,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const UserSchema = Yup.object().shape({
  username: Yup.string().required().min(6),
  password: Yup.string().required(),
});

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Tambahkan efek samping jika diperlukan
  }, []);

  return (
    <div>
      <Container maxW="container.lg">
        <Box
          maxW="400px"
          mx="auto"
          p="4"
          bg="white"
          rounded="md"
          boxShadow="lg"
          my="50px"
        >
          <Center>
            <Heading margin={"20px 0"} as={"h3"}>
              {" "}
              Login
            </Heading>
          </Center>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              dispatch(
                loginUser({
                  username: values.username,
                  password: values.password,
                })
              );

              toast({
                title: "Login Success.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
              });

              navigate("/");
            }}
            validationSchema={UserSchema}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form>
                <FormControl>
                  <FormLabel>Username / Email</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <ErrorMessage
                    component={"div"}
                    name="username"
                    style={{ color: "red" }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <ErrorMessage
                    component={"div"}
                    name="password"
                    style={{ color: "red" }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  color="white"
                  marginTop="20px"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
}
