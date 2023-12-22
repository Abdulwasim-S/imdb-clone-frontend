import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateLoginStatus } from "../../helper/redux/Reducer/products.reducer";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");
  const dispatch = useDispatch();
  const navTo = useNavigate();

  const fieldValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (loginInfo) => {
      try {
        setLoading(true);
        await axios
          .post("https://imdb-clone-backend-abdulwasim-s.vercel.app/login", {
            ...loginInfo,
          })
          .then((res) => {
            setCredential("");
            setLoading(false);
            dispatch(updateLoginStatus(true));
            localStorage["imdb-clone-token"] = res.data.token;
            localStorage["imdb-clone-email"] = loginInfo.email;
            localStorage["imdb-clone-password"] = loginInfo.password;
            toast.success(res.data.message);
            navTo("/");
          })
          .catch((error) => {
            const res = error.response.data.message;
            setCredential(res);
            setLoading(false);
          });
      } catch (error) {
        console.log("Error", error);
      }
    },
  });
  const fillDemo = () => {
    values.email = "demo@demo.in";
    values.password = "password@123";
    handleSubmit();
  };
  return (
    <Flex
      className="text-white"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"black"}
    >
      <Stack
        textAlign={"center"}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={6}
        px={6}
        rounded={"lg"}
      >
        <Box rounded={"lg"} border={"2px solid gray"} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              LogIn
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                onChange={handleChange}
                borderColor={errors.email ? "red.500" : "gray"}
                placeholder={errors.email ? "required" : "Enter email"}
                value={values.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  borderColor={errors.password ? "red.500" : "gray"}
                  placeholder={errors.password ? "required" : "Enter password"}
                  value={values.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box color={"red.300"}>{credential}</Box>
            <Stack pt={2}>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                size="lg"
                bg={"yellow.500"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
              >
                LogIn
              </Button>
              <Button
                isLoading={loading}
                onClick={fillDemo}
                size="lg"
                bg={"yellow.500"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
              >
                Demo Credential
              </Button>
            </Stack>
            <Stack pt={2} color={"yellow.500"}>
              <NavLink to={"/signup"}>
                <u>Don't have an account - SignUp</u>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginPage;
