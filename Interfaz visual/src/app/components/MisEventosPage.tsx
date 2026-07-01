import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const estadoConfig: Record<string, { label: string; className: string }> = {
  'en-proceso': { label: 'En Proceso', className: 'bg-blue-100 text-blue-700' },
  'pendiente':  { label: 'Pendiente',  className: 'bg-amber-100 text-amber-700' },
  'listo':      { label: 'Listo',      className: 'bg-green-100 text-green-700' },
  'cancelado':  { label: 'Cancelado',  className: 'bg-gray-100 text-gray-500' },
};

const eventosActivos = [
  { nro: 1, tipoEvento: 'Boda', fecha: '2025-08-14', estado: 'en-proceso' },
  { nro: 2, tipoEvento: 'Evento Corporativo', fecha: '2025-09-05', estado: 'pendiente' },
];

const eventosCompletados = [
  { nro: 3, tipoEvento: 'Barra Libre', fecha: '2024-12-21', estado: 'listo' },
  { nro: 4, tipoEvento: 'Cumpleaños', fecha: '2024-07-10', estado: 'cancelado' },
];

function TablaEventos({ eventos }: { eventos: typeof eventosActivos }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 px-4 py-2 bg-secondary/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        <span>N°</span>
        <span>Tipo de Evento</span>
        <span>Fecha</span>
        <span>Estado</span>
      </div>
      {eventos.map((e) => {
        const cfg = estadoConfig[e.estado];
        return (
          <div
            key={e.nro}
            className="grid grid-cols-4 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-secondary/20 transition text-sm"
          >
            <span className="text-muted-foreground font-medium">{e.nro}</span>
            <span className="text-card-foreground">{e.tipoEvento}</span>
            <span className="text-muted-foreground">
              {new Date(e.fecha + 'T12:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                {cfg.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function MisEventosPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-white hover:opacity-80 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Mis Eventos</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto py-10 px-6 space-y-8">

        {/* Activos */}
        <section className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-card-foreground">Eventos Activos</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {eventosActivos.length} evento{eventosActivos.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="p-4">
            <TablaEventos eventos={eventosActivos} />
          </div>
        </section>

        {/* Completados */}
        <section className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-card-foreground">Eventos Completados</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {eventosCompletados.length} evento{eventosCompletados.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="p-4">
            <TablaEventos eventos={eventosCompletados} />
          </div>
        </section>

      </div>
    </div>
  );
}
