import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intento de login:', formData);
  };

  const handleEmpleadoClick = () => {
    navigate('/empleado');
  };

  const handleAdministradorClick = () => {
    navigate('/administrador');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h1 className="mb-8 text-center text-card-foreground">Iniciar Sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-card-foreground">Correo</label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-card-foreground">Contraseña</label>
              <input
                type="password"
                required
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center mb-4 text-card-foreground">Acceso rápido:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleEmpleadoClick}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                Empleado
              </button>
              <button
                onClick={handleAdministradorClick}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                Administrador
              </button>
            </div>
          </div>

          <div className="mt-6 text-center space-y-3">
            <p className="text-muted-foreground text-sm">
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" className="text-primary hover:opacity-80 transition font-medium">
                Crear cuenta
              </Link>
            </p>
            <Link to="/" className="block text-primary hover:opacity-80 transition text-sm">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
