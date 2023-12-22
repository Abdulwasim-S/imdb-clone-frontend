import bg_pic from "./images/bg_pic.jpg";
import bg_pic2 from "./images/bg_pic2.jpg";
import bg_pic3 from "./images/bg_pic3.jpg";
import { Box, Image } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setActors,
  setMovies,
  setProducers,
  updateLoginStatus,
} from "../../helper/redux/Reducer/products.reducer";
import { useEffect } from "react";
const Homepage = () => {
  const dispatch = useDispatch();
  const getData = async () => {
    const email = localStorage["imdb-clone-email"];
    const password = localStorage["imdb-clone-password"];
    if (email && password) {
      let loginInfo = { email, password };
      await axios
        .post("https://imdb-clone-backend-abdulwasim-s.vercel.app/login", {
          ...loginInfo,
        })
        .then((res) => {
          dispatch(updateLoginStatus(true));
          localStorage["imdb-clone-token"] = res.data.token;
        })
        .catch((error) => {
          console.log(error);
          dispatch(updateLoginStatus(true));
        });
    }
    // Movies
    await axios
      .get("https://imdb-clone-backend-abdulwasim-s.vercel.app/movie")
      .then((res) => {
        dispatch(setMovies(res.data.movies));
      })
      .catch((error) => {
        console.log(error);
      });
    // Producers
    await axios
      .get("https://imdb-clone-backend-abdulwasim-s.vercel.app/producer")
      .then((res) => {
        dispatch(setProducers(res.data.producers));
      })
      .catch((error) => {
        console.log(error);
      });
    // Actors
    await axios
      .get("https://imdb-clone-backend-abdulwasim-s.vercel.app/actor")
      .then((res) => {
        dispatch(setActors(res.data.actors));
        console.log(res.data.actors);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box bg={"black"}>
      <Carousel interval={1500}>
        <Carousel.Item>
          <Image w={"100%"} h={"50vh"} src={bg_pic3} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <Image w={"100%"} h={"50vh"} src={bg_pic2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <Image w={"100%"} h={"50vh"} src={bg_pic} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </Box>
  );
};

export default Homepage;
