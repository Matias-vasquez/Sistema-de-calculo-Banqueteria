import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CotizacionPage from './components/CotizacionPage';
import LoginPage from './components/LoginPage';
import RegistroPage from './components/RegistroPage';
import EmpleadoPage from './components/EmpleadoPage';
import AdministradorPage from './components/AdministradorPage';
import ServicioDetallePage from './components/ServicioDetallePage';
import MisEventosPage from './components/MisEventosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cotizacion" element={<CotizacionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/empleado" element={<EmpleadoPage />} />
        <Route path="/administrador" element={<AdministradorPage />} />
        <Route path="/administrador/servicio/:id" element={<ServicioDetallePage />} />
        <Route path="/mis-eventos" element={<MisEventosPage />} />
      </Routes>
    </BrowserRouter>
  );
}