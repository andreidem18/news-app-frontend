import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import AppNavbar from "./components/AppNavbar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <AppNavbar />
      {isLoading && <LoadingScreen />}
      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
