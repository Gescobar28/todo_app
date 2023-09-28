import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import ToDoApp from './components/ToDoApp/ToDoApp'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/todoapp" element={<ToDoApp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
