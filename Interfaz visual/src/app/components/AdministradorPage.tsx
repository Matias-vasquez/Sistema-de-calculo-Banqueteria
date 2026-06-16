import { Link } from 'react-router-dom';
import { LogOut, FileText, Users, CreditCard, BarChart } from 'lucide-react';

export default function AdministradorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white">Portal administrador</h1>
          <Link to="/">
            <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:opacity-90 transition">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h2 className="mb-8 text-center text-card-foreground">Panel de Control</h2>

          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            <button className="flex items-center gap-4 bg-primary text-primary-foreground px-8 py-6 rounded-lg hover:opacity-90 transition shadow-md">
              <FileText className="w-6 h-6" />
              <span className="text-lg">Servicio</span>
            </button>

            <button className="flex items-center gap-4 bg-primary text-primary-foreground px-8 py-6 rounded-lg hover:opacity-90 transition shadow-md">
              <Users className="w-6 h-6" />
              <span className="text-lg">Trabajadores</span>
            </button>

            <button className="flex items-center gap-4 bg-primary text-primary-foreground px-8 py-6 rounded-lg hover:opacity-90 transition shadow-md">
              <CreditCard className="w-6 h-6" />
              <span className="text-lg">Cuentas</span>
            </button>

            <button className="flex items-center gap-4 bg-primary text-primary-foreground px-8 py-6 rounded-lg hover:opacity-90 transition shadow-md">
              <BarChart className="w-6 h-6" />
              <span className="text-lg">Dashboards</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
