import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //Browerser router wraps everywhere we are going to use our router
import { useAuthContext } from "./hooks/useAuthContext";
//Routes component wraps all the indivudual routes
//Indivudual route component to create a single route
//pages and componenets
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./components/History";
import About from "./components/About";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/history"
              element={user ? <History /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/about"
              element={user ? <About /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
