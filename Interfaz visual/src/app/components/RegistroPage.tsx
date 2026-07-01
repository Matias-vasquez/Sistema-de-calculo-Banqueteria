import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function normalizarTelefono(valor: string): string {
  const solo = valor.replace(/\D/g, '');
  if (solo.startsWith('56')) return '+' + solo;
  if (solo.startsWith('9') && solo.length <= 9) return '+56' + solo;
  if (solo.startsWith('0')) return '+56' + solo.slice(1);
  if (solo.length > 0) return '+56' + solo;
  return '';
}

function formatearTelefonoDisplay(valor: string): string {
  const solo = valor.replace(/\D/g, '');
  const local = solo.startsWith('56') ? solo.slice(2) : solo;
  if (local.length === 0) return '';
  if (local.length <= 1) return `+56 ${local}`;
  if (local.length <= 5) return `+56 ${local.slice(0, 1)} ${local.slice(1)}`;
  return `+56 ${local.slice(0, 1)} ${local.slice(1, 5)} ${local.slice(5, 9)}`;
}

export default function RegistroPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [telefonoDisplay, setTelefonoDisplay] = useState('');
  const [error, setError] = useState('');

  const maxFechaNacimiento = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  })();

  const handleTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const normalizado = normalizarTelefono(raw);
    setFormData({ ...formData, telefono: normalizado });
    setTelefonoDisplay(formatearTelefonoDisplay(normalizado));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h1 className="mb-8 text-center text-card-foreground">Crear Cuenta</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-card-foreground">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block mb-2 text-card-foreground">Apellido</label>
                <input
                  type="text"
                  required
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Pérez"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-card-foreground">Correo Electrónico</label>
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
              <label className="block mb-2 text-card-foreground">Teléfono / Celular</label>
              <input
                type="tel"
                required
                value={telefonoDisplay}
                onChange={handleTelefono}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+56 9 1234 5678"
                maxLength={16}
              />
              <p className="text-muted-foreground text-xs mt-1">Formato chileno (+56). Ej: 9 1234 5678</p>
            </div>

            <div>
              <label className="block mb-2 text-card-foreground">Dirección</label>
              <input
                type="text"
                required
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Av. Ejemplo 123, Santiago"
              />
            </div>

            <div>
              <label className="block mb-2 text-card-foreground">Fecha de Nacimiento</label>
              <input
                type="date"
                required
                max={maxFechaNacimiento}
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-muted-foreground text-xs mt-1">Debes tener al menos 18 años.</p>
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

            <div>
              <label className="block mb-2 text-card-foreground">Confirmar Contraseña</label>
              <input
                type="password"
                required
                value={formData.confirmarContrasena}
                onChange={(e) => setFormData({ ...formData, confirmarContrasena: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Crear Cuenta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-primary hover:opacity-80 transition font-medium">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
