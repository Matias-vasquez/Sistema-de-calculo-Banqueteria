import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';

interface ServicioAsignado {
  id: number;
  cargo: string;
  nombre: string;
  descripcion: string;
  estado: 'Pendiente' | 'En Proceso' | 'Completado';
}

export default function EmpleadoPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [servicios] = useState<ServicioAsignado[]>([
    {
      id: 1,
      cargo: 'Encargado de logística',
      nombre: 'Boda juanita #5627',
      descripcion: 'Suplir suministros de bebestibles para la boda',
      estado: 'Pendiente',
    },
  ]);

  const serviciosFiltrados = servicios.filter(
    (servicio) =>
      servicio.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-gray-200 text-gray-700';
      case 'En Proceso':
        return 'bg-blue-200 text-blue-700';
      case 'Completado':
        return 'bg-green-200 text-green-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white">Servicios y actividades</h1>
          <Link to="/">
            <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:opacity-90 transition">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Sección de Servicios Asignados */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-card-foreground">Servicios Asignados</h2>
          </div>

          {/* Buscador */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar servicios asignados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Tabla de Servicios */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-card-foreground">Cargo</th>
                  <th className="text-left py-3 px-4 text-card-foreground">Nombre</th>
                  <th className="text-left py-3 px-4 text-card-foreground">Descripción</th>
                  <th className="text-left py-3 px-4 text-card-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {serviciosFiltrados.length > 0 ? (
                  serviciosFiltrados.map((servicio) => (
                    <tr key={servicio.id} className="border-b border-border hover:bg-secondary/10 transition">
                      <td className="py-4 px-4 text-card-foreground">{servicio.cargo}</td>
                      <td className="py-4 px-4 text-card-foreground">{servicio.nombre}</td>
                      <td className="py-4 px-4 text-card-foreground">{servicio.descripcion}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getEstadoColor(servicio.estado)}`}>
                          {servicio.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 px-4 text-center text-muted-foreground">
                      No se encontraron servicios asignados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Espacio para más solicitudes */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground">
              Espacio para futuras solicitudes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
