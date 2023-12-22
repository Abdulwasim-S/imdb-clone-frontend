import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const { moviesList } = useSelector((state) => state.imdbReducer);
  const navTo = useNavigate();

  const handleTap = (val) => {
    localStorage["imdb-clone-data"] = JSON.stringify(val);
    navTo(`/${val._id}`);
  };

  return (
    <Flex minH={"25vh"} justifyContent={"space-around"} className="row">
      <Heading
        color={"yellow.400"}
        textAlign={"center"}
        py={5}
        fontStyle={"italic"}
      >
        Welcome to IMDb Clone
      </Heading>
      {moviesList &&
        moviesList.map((ele, idx) => (
          <Box
            className=" col-sm-6 bg-dark text-white p-2 rounded"
            key={idx}
            cursor={"pointer"}
            style={{ width: "15rem", margin: "20px" }}
            onClick={() => handleTap(ele)}
          >
            <Image
              className="rounded"
              src={ele.poster}
              alt={ele.movie_name}
            ></Image>
            <Card.Body>
              <Card.Title>{ele.movie_name}</Card.Title>
              <Card.Text>{ele.category}</Card.Text>
            </Card.Body>
          </Box>
        ))}
      {moviesList.length === 0 && (
        <Heading color={"gray"} textAlign={"center"}>
          No Result
        </Heading>
      )}
    </Flex>
  );
};

export default Movies;
