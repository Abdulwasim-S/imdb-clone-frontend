import { AddIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setMovies,
  updateLoginStatus,
} from "../../helper/redux/Reducer/products.reducer";
import { toast } from "react-toastify";

const NavBar = () => {
  const [filterType, setfilterType] = useState("movie_name");
  const [filterValue, setfilterValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navTo = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.imdbReducer);
  const dispatch = useDispatch();

  const filter_movies = async (key, value) => {
    try {
      if (!value) {
        return;
      }
      setLoading(true);
      await axios
        .get(
          `https://imdb-clone-backend-abdulwasim-s.vercel.app/movie/${key}=${value}`
        )
        .then((res) => {
          dispatch(setMovies(res.data.movies));
          setLoading(false);
        })
        .catch((error) => {
          const res = error.response.data.message;
          toast.warning(res);
          setLoading(false);
        });
      return;
    } catch (error) {
      console.log("Error", error);
    }
  };
  const logout = () => {
    dispatch(updateLoginStatus(false));
  };
  return (
    <Navbar expand="lg" className="bg-dark text-white">
      <Container>
        <Flex w={"100%"} align={"center"} marginY={3}>
          <Image
            height={"2.5rem"}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png"
            alt="logo"
            cursor={"pointer"}
            onClick={() => navTo("/")}
          />
          <InputGroup size="md" mx={5}>
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Search movie name..."
              onChange={(e) => setfilterValue(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                color={"white"}
                h="1.75rem"
                size="md"
                variant={"ghost"}
                isLoading={loading}
                onClick={() => filter_movies(filterType, filterValue)}
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <AddIcon
            cursor={"pointer"}
            variant={"ghost"}
            h={"5vh"}
            p={1}
            borderRadius={5}
            onClick={() => navTo("/add_movie")}
            mx={3}
            w={"5vh"}
            border={"2px solid gray"}
          />
          <Navbar.Toggle
            className="border-0 ml-3"
            aria-controls="basic-navbar-nav"
          >
            <HamburgerIcon
              color={"white"}
              borderRadius={"5px"}
              fontSize={"3xl"}
            />
          </Navbar.Toggle>
        </Flex>
        <Navbar.Collapse className="text-center" id="basic-navbar-nav">
          <Nav className="me-auto">
            <Select
              className="bg-dark"
              minW={"150px"}
              textAlign={"center"}
              placeholder="Filter Type"
              onChange={(e) => setfilterType(e.target.value)}
            >
              <option className="bg-dark" value="movie_name">
                Movie name
              </option>
              <option className="bg-dark" value="producer">
                Producer
              </option>
              <option className="bg-dark" value="year">
                Year
              </option>
              <option className="bg-dark" value="language">
                Language
              </option>
              <option className="bg-dark" value="category">
                Category
              </option>
            </Select>
          </Nav>
          <Box mx={3} />
          {isLoggedIn ? (
            <Button onClick={() => logout()} my={3} w={"100%"}>
              LogOut
            </Button>
          ) : (
            <Button onClick={() => navTo("/login")} my={3} w={"100%"}>
              LogIn
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
