import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Task } from './Task';
import { CreateTask } from './CreateTask';
import { UpdateTask } from './UpdateTask';
import { Login } from './Login';
import { Signup } from './Signup';

function App() {
  return<>
  <BrowserRouter>
  <Routes>
    
    <Route path='/' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/home' element={<Task/>}></Route> 
    <Route path='/create' element={<CreateTask/>}></Route>
    <Route path='/update/:id' element={<UpdateTask/>}></Route>
    
  </Routes>
  </BrowserRouter>
  </>
}

export default App;
