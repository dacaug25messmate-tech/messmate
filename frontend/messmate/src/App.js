import { Routes, Route } from 'react-router-dom';
import AppHomeNavbar from './components/AppHomeNavbar';
import AppHome from './components/AppHome';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <AppHomeNavbar />

      <Routes>
        <Route path="/" element={<AppHome />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </>
  );
}

export default App;
