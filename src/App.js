// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Screen/HomeScreen";
import { PlaygroundProvider } from "./Provider/PlaygroundProvider";
import { ModalProvider } from "./Provider/ModalProvider";
import FilePage from "./Screen/HomeScreen/RightComponent/file";
import Login from "./Screen/HomeScreen/RightComponent/login";
import Signup from "./Screen/HomeScreen/RightComponent/signup";
import ForgotPassword from "./Screen/HomeScreen/RightComponent/ForgotPassword";
import { ProtectedRoute } from "./Screen/HomeScreen/RightComponent/ProtectedRoute";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/file" element={<FilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
