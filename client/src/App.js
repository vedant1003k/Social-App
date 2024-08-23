import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // Use Navigate instead of Redirect
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContex } from "./context/AuthContext";
import Messenger from "./pages/Messenger/Messenger";

function App() {
  const { user } = useContext(AuthContex);

  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/profile/:username"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/messenger"
            element={!user ? <Navigate to="/" replace /> : <Messenger />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
