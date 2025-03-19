import DesignPage from "./components/user/DesignPage";
import Login from "./components/user/Login";
import MainPage from "./components/user/MainPage";
import Signup from "./components/user/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import AuthWrapper from "./context/AuthWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/designPage" element={<DesignPage />} />
        <Route
        // element={
        //   <AuthProvider>
        //     <AuthWrapper />
        //   </AuthProvider>
        // }
        ></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
