import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUpModals from "./components/SignUpModals"
import SignInModals from "./components/SignInModals"



function App() {
  return (
    <>
    <SignInModals/>
    <SignUpModals/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
    </>
  );
}

export default App;
