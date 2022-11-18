
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Form from "./Form";
import Succesfulpage from './Succesfulpage';



function App() {


  return (

<BrowserRouter>
        <Routes>


      
       
            <Route path='/form' element={<Form />} />

            <Route path='/' element={<Form />} />

            <Route path='/sc' element={<Succesfulpage />} />


 

            </Routes>
            </BrowserRouter>

  );
}

export default App;
