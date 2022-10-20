import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Register';
import {
  Routes,
  Route
} from "react-router-dom";
import Edit from './components/Edit';
import Detail from './components/Detail';



const App = () => {
  return (
    <>
    <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="register" element={<Register/>}/>
          <Route exact path="edit/:id" element={<Edit/>}/>
          <Route exact path="view/:id" element={<Detail/>}/>
        </Routes>
    </>
  );
}

export default App;