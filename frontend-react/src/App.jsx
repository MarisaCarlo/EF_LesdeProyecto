import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página
import Login from './components/Login';
import Usuarios from './components/Usuarios';
import Tareas from './components/Tareas';



function App() {
  return (
    <BrowserRouter>
      {/* Colocamos BackgroundPlant aquí para que sea visible 
        en todas las rutas del proyecto 
      */}
      

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/tareas' element={<Tareas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;