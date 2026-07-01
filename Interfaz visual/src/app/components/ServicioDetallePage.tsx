import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const SERVICIOS_DATA: Record<string, Servicio> = {
  '1': {
    id: '1',
    cliente: { nombre: 'Valentina Rojas', telefono: '+56 9 8123 4567', correo: 'vrojas@gmail.com', direccion: 'Av. Providencia 1540, Santiago' },
    tipoEvento: 'Boda',
    fechaEvento: '2025-08-14',
    direccionEvento: 'Viña Santa Carolina, Macul, Santiago',
    estado: 'en-proceso',
    cantidadPersonas: 120,
    tipoEspacio: 'Cerrado',
    bebestibles: ['Jugos Naturales', 'Agua Mineral', 'Bebidas Gaseosas'],
    alcohol: { incluye: true, tipo: 'Barra Premium', barraLibre: true },
    menu: { entrada: 'Carpaccio de salmón', platoFuerte: 'Filete de res al merlot', postre: 'Tiramisú artesanal', torta: 'Vainilla con frambuesas y crema chantilly' },
    alergias: [{ tipo: 'Mariscos', cantidad: 4, platoOpcional: 'Ensalada niçoise' }],
    dietas: [{ tipo: 'Vegana', cantidad: 6, platillo: 'Risotto de champiñones' }],
    trabajadores: [
      { id: 1, nombre: 'Carlos Mendez', tarea: 'Coordinación general', rol: 'Coordinador', estadoTarea: 'en-proceso' },
      { id: 2, nombre: 'Sofía Vega', tarea: 'Servicio de mesas', rol: 'Garzón senior', estadoTarea: 'pendiente' },
      { id: 3, nombre: 'Rodrigo Pérez', tarea: 'Cocina - platos fuertes', rol: 'Chef', estadoTarea: 'en-proceso' },
      { id: 4, nombre: 'Daniela Torres', tarea: 'Barra de bebidas', rol: 'Bartender', estadoTarea: 'pendiente' },
      { id: 5, nombre: 'Tomás Ibáñez', tarea: 'Servicio de mesas', rol: 'Garzón', estadoTarea: 'pendiente' },
    ],
    mensajes: [
      { id: 1, autor: 'cliente', texto: 'Buenos días, quisiera confirmar que la torta llevará flores comestibles como acordamos.', hora: '09:15' },
      { id: 2, autor: 'admin', texto: 'Hola Valentina, confirmado. El pastelero ya tiene la indicación de incorporar flores de lavanda y violetas comestibles.', hora: '09:32' },
      { id: 3, autor: 'cliente', texto: 'Perfecto, muchas gracias. ¿El servicio de barra comienza desde el cóctel de bienvenida?', hora: '10:05' },
      { id: 4, autor: 'admin', texto: 'Así es, la barra estará activa desde las 19:00 hrs durante el cóctel hasta el término del evento.', hora: '10:18' },
    ],
  },
  '2': {
    id: '2',
    cliente: { nombre: 'Martín Fuentes', telefono: '+56 9 7654 3210', correo: 'mfuentes@empresa.cl', direccion: 'Los Leones 432, Providencia' },
    tipoEvento: 'Evento Corporativo',
    fechaEvento: '2025-07-22',
    direccionEvento: 'Hotel Intercontinental, Vitacura, Santiago',
    estado: 'pendiente',
    cantidadPersonas: 80,
    tipoEspacio: 'Cerrado',
    bebestibles: ['Café', 'Té Caliente', 'Agua Mineral', 'Jugos Naturales'],
    alcohol: { incluye: false, tipo: '', barraLibre: false },
    menu: { entrada: 'Ensalada mixta con vinagreta de mostaza', platoFuerte: 'Pollo al horno con papas gratinadas', postre: 'Brownie con helado de vainilla', torta: '' },
    alergias: [{ tipo: 'Gluten', cantidad: 3, platoOpcional: 'Ensalada de quinoa' }],
    dietas: [{ tipo: 'Vegetariana', cantidad: 8, platillo: 'Pasta primavera' }],
    trabajadores: [
      { id: 1, nombre: 'Carlos Mendez', tarea: 'Coordinación general', rol: 'Coordinador', estadoTarea: 'pendiente' },
      { id: 2, nombre: 'Isidora Muñoz', tarea: 'Servicio de mesas', rol: 'Garzón senior', estadoTarea: 'pendiente' },
      { id: 3, nombre: 'Felipe Araya', tarea: 'Cocina', rol: 'Chef', estadoTarea: 'pendiente' },
    ],
    mensajes: [
      { id: 1, autor: 'cliente', texto: 'Necesitamos confirmar el horario de montaje para el día previo al evento.', hora: '14:00' },
      { id: 2, autor: 'admin', texto: 'Hola Martín, el equipo puede ingresar a montar desde las 15:00 hrs del día anterior.', hora: '14:45' },
    ],
  },
  '3': {
    id: '3',
    cliente: { nombre: 'Camila Herrera', telefono: '+56 9 9321 8765', correo: 'camila.h@gmail.com', direccion: 'Irarrázaval 2890, Ñuñoa' },
    tipoEvento: 'Barra Libre',
    fechaEvento: '2025-07-05',
    direccionEvento: 'Salón Eventos La Casona, Ñuñoa',
    estado: 'listo',
    cantidadPersonas: 60,
    tipoEspacio: 'Cerrado',
    bebestibles: ['Bebidas Gaseosas', 'Jugos Naturales', 'Agua con Gas'],
    alcohol: { incluye: true, tipo: 'Barra Nacional', barraLibre: true },
    menu: { entrada: '', platoFuerte: '', postre: '', torta: '' },
    alimentosBarraLibre: ['Bocadillos Variados', 'Canapés', 'Empanadas', 'Mini Sándwiches', 'Tabla de Quesos'],
    alergias: [],
    dietas: [],
    trabajadores: [
      { id: 1, nombre: 'Sofía Vega', tarea: 'Coordinación', rol: 'Coordinadora', estadoTarea: 'listo' },
      { id: 2, nombre: 'Daniela Torres', tarea: 'Barra de bebidas', rol: 'Bartender', estadoTarea: 'listo' },
      { id: 3, nombre: 'Tomás Ibáñez', tarea: 'Servicio general', rol: 'Garzón', estadoTarea: 'listo' },
    ],
    mensajes: [
      { id: 1, autor: 'cliente', texto: '¡Todo salió perfecto! Muchas gracias al equipo.', hora: '23:45' },
      { id: 2, autor: 'admin', texto: 'Nos alegra mucho, Camila. Fue un placer trabajar con ustedes. ¡Hasta la próxima!', hora: '23:58' },
    ],
  },
  '4': {
    id: '4',
    cliente: { nombre: 'Andrés Castillo', telefono: '+56 9 6543 2109', correo: 'acastillo@hotmail.com', direccion: 'Gran Avenida 3400, San Miguel' },
    tipoEvento: 'Boda',
    fechaEvento: '2025-09-20',
    direccionEvento: 'Club de Campo Los Trapenses, Lo Barnechea',
    estado: 'cancelado',
    cantidadPersonas: 200,
    tipoEspacio: 'Abierto',
    bebestibles: ['Jugos Naturales', 'Agua Mineral'],
    alcohol: { incluye: true, tipo: 'Mixto', barraLibre: false },
    menu: { entrada: 'Ceviche de corvina', platoFuerte: 'Cordero asado', postre: 'Mousse de maracuyá', torta: 'Chocolate belga con ganache' },
    alergias: [],
    dietas: [],
    trabajadores: [],
    mensajes: [
      { id: 1, autor: 'cliente', texto: 'Lamentablemente debemos cancelar el evento por motivos personales.', hora: '11:00' },
      { id: 2, autor: 'admin', texto: 'Entendemos, Andrés. Lamentamos escucharlo. Procederemos según las condiciones del contrato.', hora: '11:30' },
    ],
  },
};

interface Trabajador { id: number; nombre: string; tarea: string; rol: string; estadoTarea: string; }
interface Mensaje { id: number; autor: string; texto: string; hora: string; }
interface Servicio {
  id: string; cliente: { nombre: string; telefono: string; correo: string; direccion: string; };
  tipoEvento: string; fechaEvento: string; direccionEvento: string; estado: string;
  cantidadPersonas: number; tipoEspacio: string; bebestibles: string[];
  alcohol: { incluye: boolean; tipo: string; barraLibre: boolean; };
  menu: { entrada: string; platoFuerte: string; postre: string; torta: string; };
  alimentosBarraLibre?: string[];
  alergias: { tipo: string; cantidad: number; platoOpcional: string; }[];
  dietas: { tipo: string; cantidad: number; platillo: string; }[];
  trabajadores: Trabajador[]; mensajes: Mensaje[];
}

const estadoBadge: Record<string, { label: string; className: string }> = {
  'cancelado': { label: 'Cancelado', className: 'bg-gray-100 text-gray-500' },
  'en-proceso': { label: 'En Proceso', className: 'bg-blue-100 text-blue-700' },
  'pendiente': { label: 'Pendiente', className: 'bg-amber-100 text-amber-700' },
  'listo': { label: 'Listo', className: 'bg-green-100 text-green-700' },
};

const estadoTareaIcon: Record<string, JSX.Element> = {
  'listo': <CheckCircle className="w-4 h-4 text-green-600" />,
  'en-proceso': <Clock className="w-4 h-4 text-blue-600" />,
  'pendiente': <AlertCircle className="w-4 h-4 text-amber-500" />,
  'cancelado': <XCircle className="w-4 h-4 text-gray-400" />,
};

export default function ServicioDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const servicio = SERVICIOS_DATA[id || '1'];
  const [mensajes, setMensajes] = useState<Mensaje[]>(servicio?.mensajes || []);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  if (!servicio) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Servicio no encontrado.</p>
    </div>
  );

  const badge = estadoBadge[servicio.estado];
  const fechaFormateada = new Date(servicio.fechaEvento + 'T12:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' });

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;
    setMensajes([...mensajes, { id: Date.now(), autor: 'admin', texto: nuevoMensaje.trim(), hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) }]);
    setNuevoMensaje('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/administrador')} className="text-white hover:opacity-80 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-lg font-semibold">{servicio.cliente.nombre} — {servicio.tipoEvento}</h1>
            <p className="text-white/70 text-sm">{fechaFormateada} · {servicio.direccionEvento}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}>{badge.label}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-[260px_1fr_300px] gap-4 items-start">

        {/* Columna izquierda — Trabajadores */}
        <aside className="space-y-3">
          <h2 className="text-card-foreground text-base font-semibold mb-2">Equipo de Trabajo</h2>
          {servicio.trabajadores.length === 0 ? (
            <p className="text-muted-foreground text-sm">Sin trabajadores asignados.</p>
          ) : servicio.trabajadores.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-card-foreground text-sm leading-tight">{t.nombre}</p>
                {estadoTareaIcon[t.estadoTarea]}
              </div>
              <p className="text-xs text-muted-foreground">{t.rol}</p>
              <p className="text-xs text-foreground/70 mt-1 border-t border-border pt-1">{t.tarea}</p>
            </div>
          ))}
        </aside>

        {/* Columna central — Información cliente + Minuta */}
        <main className="space-y-4">
          {/* Info cliente */}
          <section className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <h2 className="text-card-foreground font-semibold mb-3">Información del Cliente</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div><span className="text-muted-foreground">Nombre:</span> <span className="text-card-foreground font-medium">{servicio.cliente.nombre}</span></div>
              <div><span className="text-muted-foreground">Teléfono:</span> <span className="text-card-foreground">{servicio.cliente.telefono}</span></div>
              <div><span className="text-muted-foreground">Correo:</span> <span className="text-card-foreground">{servicio.cliente.correo}</span></div>
              <div><span className="text-muted-foreground">Dirección:</span> <span className="text-card-foreground">{servicio.cliente.direccion}</span></div>
            </div>
          </section>

          {/* Minuta cotización */}
          <section className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <h2 className="text-card-foreground font-semibold mb-3">Minuta del Evento</h2>

            <div className="grid grid-cols-3 gap-3 text-sm mb-4">
              <div className="bg-secondary/40 rounded-lg p-3">
                <p className="text-muted-foreground text-xs mb-1">Tipo de evento</p>
                <p className="text-card-foreground font-medium">{servicio.tipoEvento}</p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-3">
                <p className="text-muted-foreground text-xs mb-1">Personas</p>
                <p className="text-card-foreground font-medium">{servicio.cantidadPersonas}</p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-3">
                <p className="text-muted-foreground text-xs mb-1">Espacio</p>
                <p className="text-card-foreground font-medium">{servicio.tipoEspacio}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {/* Bebestibles */}
              <div>
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Bebestibles</p>
                <div className="flex flex-wrap gap-1">
                  {servicio.bebestibles.map((b) => (
                    <span key={b} className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
              </div>

              {/* Menú */}
              {(servicio.menu.entrada || servicio.menu.platoFuerte || servicio.menu.postre) && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Menú</p>
                  <div className="grid grid-cols-3 gap-2">
                    {servicio.menu.entrada && <div className="bg-secondary/40 rounded p-2"><p className="text-xs text-muted-foreground">Entrada</p><p className="text-xs text-card-foreground">{servicio.menu.entrada}</p></div>}
                    {servicio.menu.platoFuerte && <div className="bg-secondary/40 rounded p-2"><p className="text-xs text-muted-foreground">Plato fuerte</p><p className="text-xs text-card-foreground">{servicio.menu.platoFuerte}</p></div>}
                    {servicio.menu.postre && <div className="bg-secondary/40 rounded p-2"><p className="text-xs text-muted-foreground">Postre</p><p className="text-xs text-card-foreground">{servicio.menu.postre}</p></div>}
                  </div>
                  {servicio.menu.torta && <div className="mt-2 bg-secondary/40 rounded p-2"><p className="text-xs text-muted-foreground">Torta</p><p className="text-xs text-card-foreground">{servicio.menu.torta}</p></div>}
                </div>
              )}

              {/* Barra libre alimentos */}
              {servicio.alimentosBarraLibre && servicio.alimentosBarraLibre.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Alimentos Barra Libre</p>
                  <div className="flex flex-wrap gap-1">
                    {servicio.alimentosBarraLibre.map((a) => (
                      <span key={a} className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Alcohol */}
              {servicio.alcohol.incluye && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Alcohol</p>
                  <div className="flex gap-2">
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">{servicio.alcohol.tipo}</span>
                    {servicio.alcohol.barraLibre && <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">Barra Libre</span>}
                  </div>
                </div>
              )}

              {/* Alergias */}
              {servicio.alergias.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Alergias</p>
                  {servicio.alergias.map((a, i) => (
                    <p key={i} className="text-xs text-card-foreground">{a.cantidad} persona(s) — {a.tipo} · Plato alt.: {a.platoOpcional}</p>
                  ))}
                </div>
              )}

              {/* Dietas */}
              {servicio.dietas.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Dietas Especiales</p>
                  {servicio.dietas.map((d, i) => (
                    <p key={i} className="text-xs text-card-foreground">{d.cantidad} persona(s) — {d.tipo} · Platillo: {d.platillo}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Columna derecha — Chat */}
        <aside className="bg-card border border-border rounded-lg shadow-sm flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="p-3 border-b border-border">
            <h2 className="text-card-foreground font-semibold text-sm">Chat con {servicio.cliente.nombre.split(' ')[0]}</h2>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {mensajes.map((m) => (
              <div key={m.id} className={`flex ${m.autor === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${m.autor === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  <p>{m.texto}</p>
                  <p className={`text-[10px] mt-1 ${m.autor === 'admin' ? 'text-white/60' : 'text-muted-foreground'}`}>{m.hora}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 text-xs border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={enviarMensaje} className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
