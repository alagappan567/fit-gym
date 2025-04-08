import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./components/History";
import About from "./components/About";
import MealSelector from "./components/MealSelector";
import CaloriesLeft from "./components/CaloriesLeft";
import AdminDashboard from "./components/AdminDashboard";

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
            <Route
              path="/log-meal"
              element={user ? <MealSelector /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/calories-left"
              element={user ? <CaloriesLeft /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/admin"
              element={
                user?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;