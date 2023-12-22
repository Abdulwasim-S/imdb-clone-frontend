import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { postActors } from "../../helper/redux/Reducer/products.reducer";

const AddActor = () => {
  const navTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");

  const fieldValidationSchema = yup.object({
    actor_name: yup.string().required(),
    dob: yup.string().required(),
    bio: yup.string().required(),
    gender: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      actor_name: "",
      dob: "",
      bio: "",
      gender: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (producerInfo) => {
      try {
        setLoading(true);
        await axios
          .post(
            "https://imdb-clone-backend-abdulwasim-s.vercel.app/actor",
            { ...producerInfo },
            {
              headers: {
                "x-auth-token": localStorage["imdb-clone-token"],
              },
            }
          )
          .then((res) => {
            setCredential("");
            setLoading(false);
            toast.success(res.data.message);
            dispatch(postActors(res.data.new_actor));
            navTo("/add_movie");
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
              New Actor
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="actor_name" isRequired>
              <FormLabel>Actor Name</FormLabel>
              <Input
                type="actor_name"
                id="actor_name"
                onChange={handleChange}
                borderColor={errors.actor_name ? "red.500" : "gray"}
                placeholder={
                  errors.actor_name ? "required" : "Enter actor name"
                }
                value={values.actor_name}
              />
            </FormControl>
            <FormControl id="gender" isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                id="gender"
                type="gender"
                onChange={handleChange}
                borderColor={errors.gender ? "red.500" : "gray"}
                placeholder="Select option"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Select>
            </FormControl>
            <FormControl id="dob" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                id="dob"
                type="date"
                onChange={handleChange}
                borderColor={errors.dob ? "red.500" : "gray"}
                placeholder={errors.dob ? "required" : "Enter dob"}
                value={values.dob}
              />
            </FormControl>
            <FormControl id="bio" isRequired>
              <FormLabel>About</FormLabel>
              <Textarea
                id="bio"
                type="text"
                onChange={handleChange}
                borderColor={errors.bio ? "red.500" : "gray"}
                placeholder={errors.bio ? "required" : "Enter bio"}
                value={values.bio}
              />
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
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default AddActor;
