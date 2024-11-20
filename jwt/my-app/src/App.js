import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LogIn from "./components/jwt-ui/LogIn";
import Signup from "./components/jwt-ui/Signup";
import Home from "./components/jwt-ui/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserContext } from "./context/UserContext";
import Admin from "./components/jwt-ui/Admin";
import { fetchToken, getToken } from "./services/authService";
import { useContext, useEffect } from "react";
import Error from "./components/jwt-ui/Error";
import Seller from "./components/jwt-ui/Seller";

function App() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Checking existing session...");
    const existingSessionToken = getToken();
    if (!existingSessionToken) {
      console.log("NO existing session, redirecting to login...");
      // to login
      navigate("/login");
      return;
    }
    console.log("Found existing session, restoring session...");
    fetchToken()
      .then((res) => {
        console.log("Authenticated...", res);
        setUser({ ...res?.user, isAuthenticated: true });
      })
      .catch((error) => {
        console.log("UnAuthenticated...--->>>....Logging out...", error);
        navigate("/login");
      });
  }, []);
  return (
    // <Router>
    //   <div className="app">
    //     <h1>React Crud Operation</h1>
    //     <Routes>
    //       <Route exact path='/create' Component={Create} />
    //       <Route exact path='/read' Component={Read} />
    //       <Route exact path='/update' Component={Update} />
    //     </Routes>
    //   </div>
    // </Router>

    <div className="app">
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["user", "admin", "seller"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/seller" element={
          <ProtectedRoute roles={["seller"]}>
            <Seller />
          </ProtectedRoute>
        }
        />
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
