import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Addlocation from "./pages/AddLocation/Addlocation";
import AdminDash from "./pages/AdminDash/AdminDash";
import SingleLocation from "./pages/AdminDash/SingleLocation";



function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/addlocation" element={<Addlocation/>}/>
    <Route path="/getalllocation" element={<AdminDash/>}/>
    <Route path="/location/:id" element={<SingleLocation/>} />
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;
