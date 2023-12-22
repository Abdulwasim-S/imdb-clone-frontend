import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMovies } from "../../helper/redux/Reducer/products.reducer";
import axios from "axios";

const MovieDetails = () => {
  const navTo = useNavigate();
  const dispatch = useDispatch();
  const {
    movie_name,
    year,
    producer,
    category,
    plot,
    poster,
    actors,
    banner,
    _id,
  } = JSON.parse(localStorage["imdb-clone-data"]);
  const handelEdit = (val) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Do you want to edit")) {
      return;
    }
    localStorage["imdb-clone-edit"] = val;
    navTo("/edit_movie");
  };
  const handelDelete = async (val) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Do you want to delete")) {
        return;
      }
      await axios
        .delete(
          `https://imdb-clone-backend-abdulwasim-s.vercel.app/movie${val}`,
          {
            headers: {
              "x-auth-token": localStorage["imdb-clone-token"],
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          dispatch(deleteMovies(val));
          navTo("/");
        })
        .catch((error) => {
          const res = error.response.data.message;
          toast.warning("Delete Failed");
          navTo("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className="row text-white">
      <Image
        p={5}
        h={"50vh"}
        className="col-12 rounded-5"
        src={banner}
        alt="banner"
      />
      <Flex justifyContent={"space-around"} mx={5} className="row">
        <Image
          w={"240px"}
          h={"50vh"}
          className="col-md-4 rounded-5"
          src={poster}
          alt="banner"
        />
        <Box p={5} className="col-md-8">
          <Heading>{movie_name}</Heading>
          <Card.Text>Plot : {plot}</Card.Text>

          <Card.Text className="list-group-item">Genre : {category}</Card.Text>
          <Card.Text className="list-group-item">Year : {year}</Card.Text>
          <Card.Text className="list-group-item">
            Producer : {producer}
          </Card.Text>
          <Card.Text className="list-group-item">
            Actors : <i>{actors.join(",")}</i>
          </Card.Text>
        </Box>
        <Flex justify={"space-around"} className="row">
          <Button
            className="col-5"
            bg={"#fa9600"}
            my={5}
            onClick={() => handelEdit(localStorage["imdb-clone-data"])}
          >
            Edit <EditIcon />
          </Button>
          <Button
            className="col-5"
            my={5}
            bg={"#fa004b"}
            onClick={() => handelDelete(_id)}
          >
            Delete
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MovieDetails;
