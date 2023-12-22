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
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  validateEmail,
  validatePassword,
} from "../../helper/additionals/valiadation";
import { toast } from "react-toastify";

const Signup = () => {
  const navTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");

  const fieldValidationSchema = yup.object({
    user_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (signupInfo) => {
      try {
        setCredential("");

        if (!validateEmail(signupInfo.email)) {
          return setCredential("Invalid Email");
        }
        if (!validatePassword(signupInfo.password)) {
          return setCredential(
            "password should have number, special character,uppercase,lowercase"
          );
        }
        setLoading(true);
        await axios
          .post("https://imdb-clone-backend-abdulwasim-s.vercel.app/signup", {
            ...signupInfo,
          })
          .then((res) => {
            setCredential("");
            setLoading(false);
            toast.success(res.data.message);
            navTo("/login");
          })
          .catch((error) => {
            const message = error.response.data.message;
            setCredential(message);
            setLoading(false);
          });
      } catch (error) {
        console.log("Error", error);
      }
    },
  });
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"black"}>
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
              SignUp
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="user_name" isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                type="user_name"
                id="user_name"
                onChange={handleChange}
                borderColor={errors.user_name ? "red.500" : "gray"}
                placeholder={errors.user_name ? "required" : "Enter Name"}
                value={values.user_name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                onChange={handleChange}
                borderColor={errors.email ? "red.500" : "gray"}
                placeholder={errors.email ? "required" : "Enter Email"}
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
                  placeholder={errors.password ? "required" : "Enter Password"}
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
            <Box textAlign={"center"} color={"red.300"}>
              <span>{credential}</span>
            </Box>
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
                SignUp
              </Button>
            </Stack>
            <Stack pt={2} color={"yellow.500"}>
              <NavLink to={"/login"}>
                <u>Already have account - Login</u>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Signup;
