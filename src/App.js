import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Screen/HomeScreen";
import { PlaygroundScreen } from "./Screen/PlaygroundScreen"
import { PlaygroundProvider } from "./Provider/PlaygroundProvider";
import { ModalProvider } from "./Provider/ModalProvider";
import { Login } from "./Screen/HomeScreen/RightComponent/login";
import { SignUp } from "./Screen/HomeScreen/RightComponent/signup";
import FilePage from "./Screen/HomeScreen/RightComponent/file";


function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element = {<HomeScreen />}/>
          <Route path="/Playground" element = {<PlaygroundScreen />} />
          <Route path="/file" element={<FilePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
