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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { postMovies } from "../../helper/redux/Reducer/products.reducer";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");
  let [actors_name_List, setActorsList] = useState([]);

  const fieldValidationSchema = yup.object({
    movie_name: yup.string().required(),
    producer: yup.string().required(),
    year: yup.string().required(),
    plot: yup.string().required(),
    category: yup.string().required(),
    language: yup.string().required(),
    poster: yup.string().required(),
    actors: yup.array().required(),
    banner: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      movie_name: "",
      producer: "",
      year: "",
      plot: "",
      category: "",
      language: "",
      poster: "",
      banner: "",
      actors: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (movieInfo) => {
      try {
        setLoading(true);
        await axios
          .post(
            "https://imdb-clone-backend-abdulwasim-s.vercel.app/movie",
            { ...movieInfo },
            {
              headers: {
                "x-auth-token": localStorage["imdb-clone-token"],
              },
            }
          )
          .then((res) => {
            setCredential("");
            setLoading(false);
            dispatch(postMovies(res.data.new_movie));
            toast.success(res.data.message);
            navTo("/");
          })
          .catch((error) => {
            const res = error.response.data.message;
            setCredential(res);
            setLoading(false);
          });
        return;
      } catch (error) {
        console.log("Error", error);
      }
    },
  });
  const { producersList, actorsList } = useSelector(
    (state) => state.imdbReducer
  );
  const categories = [
    "Action",
    "Biography",
    "Horror",
    "Thriller",
    "Love",
    "Others",
  ];
  const languages = ["Tamil", "English", "Hindi", "Others"];
  const add_actors = (val) => {
    let add_arr = [...new Set([...actors_name_List, val])].sort();
    values.actors = [...add_arr];
    setActorsList(add_arr);
  };
  const remove_actors = (val) => {
    let remove_arr = actors_name_List.filter((ele) => ele !== val);
    values.actors = remove_arr;
    setActorsList(remove_arr);
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
              Add Movie
            </Heading>
          </Stack>
          <Stack spacing={4}>
            {producersList && (
              <FormControl id="producer" isRequired>
                <FormLabel>Producer</FormLabel>
                <Select
                  id="producer"
                  placeholder="Select option"
                  borderColor={errors.producer ? "red.500" : "gray"}
                  onChange={handleChange}
                >
                  {producersList.map((ele, idx) => (
                    <option
                      className="bg-dark"
                      key={idx}
                      value={ele.producer_name}
                    >
                      {ele.producer_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button onClick={() => navTo("/add_producer")}>
              Add new producer
            </Button>
            {actorsList && (
              <FormControl id="actors" isRequired>
                <FormLabel>Actors</FormLabel>
                <Flex flexDirection={"column"}>
                  {actors_name_List.length > 0 &&
                    actors_name_List.map((ele, ids) => (
                      <Box
                        border={"1px solid gray"}
                        borderRadius={25}
                        mx={0.5}
                        px={0.5}
                        width={"fit-content"}
                        key={ids}
                      >
                        <span>{ele}</span>
                        <Button
                          borderRadius={0}
                          borderLeft={"1px solid gray"}
                          size={"xs"}
                          variant={"ghost"}
                          onClick={() => remove_actors(ele)}
                        >
                          X
                        </Button>
                      </Box>
                    ))}
                </Flex>
                <Select
                  id="actors"
                  placeholder="Select option"
                  borderColor={
                    errors.actors && values.actors.length === 0
                      ? "red.500"
                      : "gray"
                  }
                  onChange={(e) => add_actors(e.target.value)}
                >
                  {actorsList.map((ele, idx) => (
                    <option
                      className="bg-dark"
                      key={idx}
                      value={ele.actor_name}
                    >
                      {ele.actor_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button onClick={() => navTo("/add_actor")}>Add new actor</Button>
            <FormControl id="movie_name" isRequired>
              <FormLabel>Movie name</FormLabel>
              <Input
                type="movie_name"
                id="movie_name"
                onChange={handleChange}
                borderColor={errors.movie_name ? "red.500" : "gray"}
                placeholder={
                  errors.movie_name ? "required" : "Enter movie_name"
                }
                value={values.movie_name}
              />
            </FormControl>
            <FormControl id="year" isRequired>
              <FormLabel>Released Year</FormLabel>
              <Input
                type="number"
                id="year"
                onChange={handleChange}
                borderColor={errors.year ? "red.500" : "gray"}
                placeholder={errors.year ? "required" : "Enter year"}
                value={values.year}
              />
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select option"
                borderColor={errors.category ? "red.500" : "gray"}
                onChange={handleChange}
              >
                {categories.map((ele, idx) => (
                  <option className="bg-dark" key={idx} value={ele}>
                    {ele}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="language" isRequired>
              <FormLabel>language</FormLabel>
              <Select
                placeholder="Select option"
                borderColor={errors.language ? "red.500" : "gray"}
                onChange={handleChange}
              >
                {languages.map((ele, idx) => (
                  <option className="bg-dark" key={idx} value={ele}>
                    {ele}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="plot" isRequired>
              <FormLabel>Plot</FormLabel>
              <Textarea
                id="plot"
                onChange={handleChange}
                borderColor={errors.plot ? "red.500" : "gray"}
                placeholder={
                  errors.plot ? "required" : "Write in brief about the movie"
                }
                value={values.plot}
              />
            </FormControl>
            <FormControl id="poster" isRequired>
              <FormLabel>Poster</FormLabel>
              <Input
                type="text"
                id="poster"
                p={1}
                onChange={handleChange}
                borderColor={errors.poster ? "red.500" : "gray"}
                placeholder={errors.poster ? "required" : "Enter poster URL"}
                value={values.poster}
              />
            </FormControl>
            <FormControl id="banner" isRequired>
              <FormLabel>Banner</FormLabel>
              <Input
                type="text"
                id="banner"
                multiple
                p={1}
                onChange={handleChange}
                borderColor={errors.banner ? "red.500" : "gray"}
                placeholder={errors.banner ? "required" : "Enter Banner URL"}
                value={values.banner}
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
export default AddMovie;
