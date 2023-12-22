import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/navbar/navbar";
import Signup from "./component/users/Signup";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./component/movie/add_movie";
import AddProducer from "./component/producer/add_producer";
import AddActor from "./component/actor/add_actor";
import Homepage from "./component/home/home_page";
import Movies from "./component/movie/movies";
import { Box } from "@chakra-ui/react";
import Footer from "./component/footer/Footer";
import EditMovie from "./component/movie/edit_movie";
import MovieDetails from "./component/movie/movie_details";
import LoginPage from "./component/users/LoginPage";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.imdbReducer);
  return (
    <Box overflowX={"hidden"} minH={"100vh"} bg={"black"}>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Homepage />
              <Movies />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/add_movie"
          element={isLoggedIn ? <AddMovie /> : <LoginPage />}
        />
        <Route
          path="/edit_movie"
          element={isLoggedIn ? <EditMovie /> : <LoginPage />}
        />
        <Route
          path="/add_producer"
          element={isLoggedIn ? <AddProducer /> : <LoginPage />}
        />
        <Route
          path="/add_actor"
          element={isLoggedIn ? <AddActor /> : <LoginPage />}
        />
        <Route path=":id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
