import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, FileText, Users, CreditCard, BarChart, Search, X, Pencil, Check, Plus, ChevronDown, Sparkles, ChevronRight, BarChart2, PieChart as PieIcon, TrendingUp, Utensils, CalendarCheck } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

// ─── tipos ───────────────────────────────────────────────────────────────────

interface Servicio {
  id: string; cliente: string; tipoEvento: string; fechaEvento: string;
  estado: 'cancelado' | 'en-proceso' | 'pendiente' | 'listo';
}

interface Trabajador {
  id: number; nombre: string; rol: string; descripcion: string; valorHora: number;
}

interface Cuenta {
  id: number; nombre: string; correo: string; rol: string;
}

// ─── datos mock ───────────────────────────────────────────────────────────────

const SERVICIOS: Servicio[] = [
  { id: '1', cliente: 'Valentina Rojas',    tipoEvento: 'Boda',               fechaEvento: '2025-08-14', estado: 'en-proceso' },
  { id: '2', cliente: 'Martín Fuentes',     tipoEvento: 'Evento Corporativo', fechaEvento: '2025-07-22', estado: 'pendiente'  },
  { id: '3', cliente: 'Camila Herrera',     tipoEvento: 'Barra Libre',        fechaEvento: '2025-07-05', estado: 'listo'      },
  { id: '4', cliente: 'Andrés Castillo',    tipoEvento: 'Boda',               fechaEvento: '2025-09-20', estado: 'cancelado'  },
  { id: '5', cliente: 'Francisca Morales',  tipoEvento: 'Cumpleaños',         fechaEvento: '2025-08-03', estado: 'pendiente'  },
  { id: '6', cliente: 'Sebastián Díaz',     tipoEvento: 'Evento Corporativo', fechaEvento: '2025-07-30', estado: 'en-proceso' },
  { id: '7', cliente: 'Javiera Soto',       tipoEvento: 'Boda',               fechaEvento: '2025-10-11', estado: 'pendiente'  },
  { id: '8', cliente: 'Felipe Ramírez',     tipoEvento: 'Barra Libre',        fechaEvento: '2025-07-19', estado: 'listo'      },
  { id: '9', cliente: 'Constanza Vargas',   tipoEvento: 'Cumpleaños',         fechaEvento: '2025-08-27', estado: 'en-proceso' },
  { id: '10', cliente: 'Diego Núñez',       tipoEvento: 'Evento Corporativo', fechaEvento: '2025-09-05', estado: 'pendiente'  },
];

const TRABAJADORES_INIT: Trabajador[] = [
  { id: 1, nombre: 'Carlos Mendez',   rol: 'Coordinador',    descripcion: 'Coordinación general de eventos y logística',      valorHora: 12000 },
  { id: 2, nombre: 'Sofía Vega',      rol: 'Garzón Senior',  descripcion: 'Servicio de mesas, protocolo y atención VIP',       valorHora: 8500  },
  { id: 3, nombre: 'Rodrigo Pérez',   rol: 'Chef',           descripcion: 'Preparación de platos calientes y menú principal',  valorHora: 18000 },
  { id: 4, nombre: 'Daniela Torres',  rol: 'Bartender',      descripcion: 'Coctelería, barra libre y servicio de bebidas',     valorHora: 10000 },
  { id: 5, nombre: 'Tomás Ibáñez',    rol: 'Garzón',         descripcion: 'Servicio general de mesas y atención a invitados',  valorHora: 7000  },
  { id: 6, nombre: 'Isidora Muñoz',   rol: 'Garzón Senior',  descripcion: 'Supervisión de servicio y atención diferenciada',   valorHora: 8500  },
  { id: 7, nombre: 'Felipe Araya',    rol: 'Chef',           descripcion: 'Cocina fría, entradas y postres',                   valorHora: 16000 },
  { id: 8, nombre: 'Paula Guerrero',  rol: 'Pastelera',      descripcion: 'Elaboración de tortas, postres y repostería fina',  valorHora: 14000 },
];

const ROLES_DISPONIBLES = ['Coordinador', 'Chef', 'Garzón Senior', 'Garzón', 'Bartender', 'Pastelera', 'Asistente', 'Supervisor'];

const CUENTAS_INIT: Cuenta[] = [
  { id: 1, nombre: 'Amelia Correa',  correo: 'amelia@banquetera.cl',  rol: 'Administrador' },
  { id: 2, nombre: 'Carlos Mendez',  correo: 'cmendez@banquetera.cl', rol: 'Coordinador'   },
  { id: 3, nombre: 'Sofía Vega',     correo: 'svega@banquetera.cl',   rol: 'Garzón Senior' },
  { id: 4, nombre: 'Rodrigo Pérez',  correo: 'rperez@banquetera.cl',  rol: 'Chef'          },
];

// ─── datos dashboard ──────────────────────────────────────────────────────────

const MESES = ['Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr','May','Jun'];

const COSTO_EVENTOS = [
  { mes: 'Jul', valor: 3200000 }, { mes: 'Ago', valor: 4800000 }, { mes: 'Sep', valor: 5100000 },
  { mes: 'Oct', valor: 6700000 }, { mes: 'Nov', valor: 7200000 }, { mes: 'Dic', valor: 9800000 },
  { mes: 'Ene', valor: 3100000 }, { mes: 'Feb', valor: 4200000 }, { mes: 'Mar', valor: 5600000 },
  { mes: 'Abr', valor: 4900000 }, { mes: 'May', valor: 6100000 }, { mes: 'Jun', valor: 7400000 },
];

const COSTO_TRABAJADORES = [
  { mes: 'Jul', valor: 980000  }, { mes: 'Ago', valor: 1240000 }, { mes: 'Sep', valor: 1380000 },
  { mes: 'Oct', valor: 1820000 }, { mes: 'Nov', valor: 2100000 }, { mes: 'Dic', valor: 2760000 },
  { mes: 'Ene', valor: 840000  }, { mes: 'Feb', valor: 1120000 }, { mes: 'Mar', valor: 1450000 },
  { mes: 'Abr', valor: 1310000 }, { mes: 'May', valor: 1670000 }, { mes: 'Jun', valor: 1980000 },
];

const CONCRETADOS_DATA = [
  { name: 'Concretados', value: 68, color: '#3a5a40' },
  { name: 'Cancelados',  value: 12, color: '#9ca3af' },
  { name: 'En proceso',  value: 20, color: '#60a5fa' },
];

const ALERGIAS_DATA = [
  { nombre: 'Mariscos', cantidad: 18 }, { nombre: 'Gluten',    cantidad: 14 },
  { nombre: 'Lácteos',  cantidad: 11 }, { nombre: 'Nueces',    cantidad: 9  },
  { nombre: 'Huevo',    cantidad: 6  }, { nombre: 'Soya',      cantidad: 4  },
];

const ASSETS_GUARDADOS = [
  { id: 'costo-eventos',      label: 'Costo de eventos — último año',      icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'costo-trabajadores', label: 'Costo de trabajadores — último año', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'concretados',        label: '% Eventos concretados',              icon: <PieIcon    className="w-4 h-4" /> },
  { id: 'alergias',           label: 'Alergias más frecuentes',            icon: <Utensils   className="w-4 h-4" /> },
  { id: 'eventos-mes',        label: 'Eventos por tipo de evento',         icon: <CalendarCheck className="w-4 h-4" /> },
];

const TIPO_EVENTO_DATA = [
  { tipo: 'Boda', cantidad: 24 }, { tipo: 'Barra Libre', cantidad: 18 },
  { tipo: 'Corporativo', cantidad: 31 }, { tipo: 'Cumpleaños', cantidad: 12 },
];

function formatCLP(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000)    return `$${(v / 1000).toFixed(0)}K`;
  return `$${v}`;
}

const estadoServicioConfig: Record<string, { label: string; className: string }> = {
  cancelado:    { label: 'Cancelado',  className: 'bg-gray-100 text-gray-500'    },
  'en-proceso': { label: 'En Proceso', className: 'bg-blue-100 text-blue-700'   },
  pendiente:    { label: 'Pendiente',  className: 'bg-amber-100 text-amber-700' },
  listo:        { label: 'Listo',      className: 'bg-green-100 text-green-700' },
};

// ─── componente principal ────────────────────────────────────────────────────

type Vista = 'menu' | 'servicios' | 'trabajadores' | 'cuentas' | 'dashboards';

export default function AdministradorPage() {
  const navigate = useNavigate();
  const [vista, setVista] = useState<Vista>('menu');

  // servicios
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [filtroEstado,   setFiltroEstado]   = useState('');
  const [filtroFecha,    setFiltroFecha]    = useState('');

  // trabajadores
  const [trabajadores,     setTrabajadores]     = useState<Trabajador[]>(TRABAJADORES_INIT);
  const [busquedaTrab,     setBusquedaTrab]     = useState('');
  const [editandoHora,     setEditandoHora]     = useState<number | null>(null);
  const [valorHoraTemp,    setValorHoraTemp]    = useState('');

  // cuentas
  const [cuentas,          setCuentas]          = useState<Cuenta[]>(CUENTAS_INIT);
  const [rolesDisponibles, setRolesDisponibles] = useState<string[]>(ROLES_DISPONIBLES);
  const [nuevaCuenta,      setNuevaCuenta]      = useState({ nombre: '', correo: '', contrasena: '', rol: '' });
  const [errCuenta,        setErrCuenta]        = useState('');
  const [editandoRol,      setEditandoRol]      = useState<number | null>(null);
  const [nuevoRolInput,    setNuevoRolInput]    = useState('');
  const [mostrarAgregarRol,setMostrarAgregarRol]= useState(false);

  // dashboard
  const [assetActivo,      setAssetActivo]      = useState<string>('costo-eventos');
  const [sidebarAbierto,   setSidebarAbierto]   = useState(true);
  const [queryTexto,       setQueryTexto]       = useState('');
  const [queryResultado,   setQueryResultado]   = useState<string | null>(null);

  const limpiar = () => { setBusquedaNombre(''); setFiltroEstado(''); setFiltroFecha(''); };
  const hayFiltros = busquedaNombre || filtroEstado || filtroFecha;

  const serviciosFiltrados = SERVICIOS.filter(s =>
    s.cliente.toLowerCase().includes(busquedaNombre.toLowerCase()) &&
    (filtroEstado ? s.estado === filtroEstado : true) &&
    (filtroFecha  ? s.fechaEvento === filtroFecha : true)
  );

  const trabajadoresFiltrados = trabajadores.filter(t =>
    t.nombre.toLowerCase().includes(busquedaTrab.toLowerCase()) ||
    t.rol.toLowerCase().includes(busquedaTrab.toLowerCase())
  );

  const guardarHora = (id: number) => {
    const val = parseInt(valorHoraTemp);
    if (!isNaN(val) && val > 0) {
      setTrabajadores(prev => prev.map(t => t.id === id ? { ...t, valorHora: val } : t));
    }
    setEditandoHora(null);
  };

  const agregarCuenta = () => {
    const { nombre, correo, contrasena, rol } = nuevaCuenta;
    if (!nombre || !correo || !contrasena || !rol) { setErrCuenta('Completa todos los campos.'); return; }
    setCuentas(prev => [...prev, { id: Date.now(), nombre, correo, rol }]);
    setNuevaCuenta({ nombre: '', correo: '', contrasena: '', rol: '' });
    setErrCuenta('');
  };

  const cambiarRolCuenta = (id: number, nuevoRol: string) => {
    setCuentas(prev => prev.map(c => c.id === id ? { ...c, rol: nuevoRol } : c));
    setEditandoRol(null);
  };

  const agregarRol = () => {
    const r = nuevoRolInput.trim();
    if (r && !rolesDisponibles.includes(r)) setRolesDisponibles(prev => [...prev, r]);
    setNuevoRolInput('');
    setMostrarAgregarRol(false);
  };

  const inputCls = 'w-full px-4 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {vista !== 'menu' && (
              <button onClick={() => setVista('menu')} className="text-white hover:opacity-80 transition">
                <X className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-white">Portal Administrador</h1>
          </div>
          <Link to="/">
            <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:opacity-90 transition">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </header>

      {/* ── MENÚ PRINCIPAL ── */}
      {vista === 'menu' && (
        <div className="max-w-4xl mx-auto py-12 px-6">
          <div className="bg-card p-8 rounded-lg shadow-md">
            <h2 className="mb-8 text-center text-card-foreground">Panel de Control</h2>
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              {([
                { key: 'servicios',    icon: <FileText className="w-6 h-6" />, label: 'Servicio'     },
                { key: 'trabajadores', icon: <Users    className="w-6 h-6" />, label: 'Trabajadores' },
                { key: 'cuentas',      icon: <CreditCard className="w-6 h-6"/>, label: 'Cuentas'    },
                { key: 'dashboards',   icon: <BarChart className="w-6 h-6" />, label: 'Dashboards'  },
              ] as { key: string; icon: JSX.Element; label: string }[]).map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setVista(key as Vista)}
                  className="flex items-center gap-4 bg-primary text-primary-foreground px-8 py-6 rounded-lg hover:opacity-90 transition shadow-md"
                >
                  {icon}
                  <span className="text-lg">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICIOS ── */}
      {vista === 'servicios' && (
        <div className="max-w-5xl mx-auto py-8 px-6">
          <h2 className="text-card-foreground mb-6">Servicios</h2>

          <div className="bg-card border border-border rounded-lg p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Buscar por nombre..." value={busquedaNombre}
                  onChange={e => setBusquedaNombre(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}
                className={inputCls}>
                <option value="">Todos los estados</option>
                <option value="cancelado">Cancelado</option>
                <option value="en-proceso">En Proceso</option>
                <option value="pendiente">Pendiente</option>
                <option value="listo">Listo</option>
              </select>
              <div className="flex gap-2">
                <input type="date" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} className={`flex-1 ${inputCls}`} />
                {hayFiltros && (
                  <button onClick={limpiar} className="px-3 py-2 border border-border rounded-lg text-muted-foreground hover:bg-secondary transition">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 bg-secondary/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Cliente</span><span>Tipo de Evento</span><span>Fecha</span><span>Estado</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '520px' }}>
              {serviciosFiltrados.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-sm">Sin resultados.</div>
              ) : serviciosFiltrados.map((s, i) => {
                const cfg = estadoServicioConfig[s.estado];
                return (
                  <button key={s.id} onClick={() => navigate(`/administrador/servicio/${s.id}`)}
                    className={`w-full grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 px-4 py-4 text-left hover:bg-secondary/30 transition border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}>
                    <span className="text-card-foreground font-medium text-sm">{s.cliente}</span>
                    <span className="text-card-foreground text-sm">{s.tipoEvento}</span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(s.fechaEvento + 'T12:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <span><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>{cfg.label}</span></span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2 text-right">{serviciosFiltrados.length} de {SERVICIOS.length} servicios</p>
        </div>
      )}

      {/* ── TRABAJADORES ── */}
      {vista === 'trabajadores' && (
        <div className="max-w-5xl mx-auto py-8 px-6">
          <h2 className="text-card-foreground mb-6">Trabajadores</h2>

          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            {/* Buscador */}
            <div className="p-4 border-b border-border">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Buscar por nombre o rol..."
                  value={busquedaTrab} onChange={e => setBusquedaTrab(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* Cabecera tabla */}
            <div className="grid grid-cols-[2fr_1.2fr_2.5fr_1.2fr] gap-4 px-4 py-3 bg-secondary/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Nombre</span><span>Rol</span><span>Descripción</span><span>Valor / hora</span>
            </div>

            {/* Filas */}
            <div className="overflow-y-auto" style={{ maxHeight: '520px' }}>
              {trabajadoresFiltrados.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground text-sm">Sin resultados.</div>
              ) : trabajadoresFiltrados.map((t, i) => (
                <div key={t.id}
                  className={`grid grid-cols-[2fr_1.2fr_2.5fr_1.2fr] gap-4 px-4 py-3 border-b border-border last:border-0 items-center ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}>
                  <span className="text-card-foreground font-medium text-sm">{t.nombre}</span>
                  <span className="text-muted-foreground text-sm">{t.rol}</span>
                  <span className="text-card-foreground text-sm">{t.descripcion}</span>

                  {/* Valor hora editable */}
                  <div className="flex items-center gap-2">
                    {editandoHora === t.id ? (
                      <>
                        <input
                          type="number" value={valorHoraTemp}
                          onChange={e => setValorHoraTemp(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && guardarHora(t.id)}
                          className="w-24 px-2 py-1 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          autoFocus
                        />
                        <button onClick={() => guardarHora(t.id)} className="text-primary hover:opacity-80">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditandoHora(null)} className="text-muted-foreground hover:opacity-80">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-card-foreground text-sm font-medium">
                          ${t.valorHora.toLocaleString('es-CL')}
                        </span>
                        <button
                          onClick={() => { setEditandoHora(t.id); setValorHoraTemp(String(t.valorHora)); }}
                          className="text-muted-foreground hover:text-primary transition">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2 text-right">{trabajadoresFiltrados.length} trabajador(es)</p>
        </div>
      )}

      {/* ── CUENTAS ── */}
      {vista === 'cuentas' && (
        <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
          <h2 className="text-card-foreground">Cuentas</h2>

          {/* Formulario nueva cuenta */}
          <section className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <h3 className="text-card-foreground">Agregar Cuenta Trabajador</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-card-foreground text-sm">Nombre</label>
                  <input type="text" value={nuevaCuenta.nombre}
                    onChange={e => setNuevaCuenta({ ...nuevaCuenta, nombre: e.target.value })}
                    placeholder="Nombre completo" className={inputCls} />
                </div>
                <div>
                  <label className="block mb-1 text-card-foreground text-sm">Rol</label>
                  <select value={nuevaCuenta.rol}
                    onChange={e => setNuevaCuenta({ ...nuevaCuenta, rol: e.target.value })}
                    className={inputCls}>
                    <option value="">Seleccione un rol</option>
                    {rolesDisponibles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-card-foreground text-sm">Correo</label>
                  <input type="email" value={nuevaCuenta.correo}
                    onChange={e => setNuevaCuenta({ ...nuevaCuenta, correo: e.target.value })}
                    placeholder="correo@banquetera.cl" className={inputCls} />
                </div>
                <div>
                  <label className="block mb-1 text-card-foreground text-sm">Contraseña</label>
                  <input type="password" value={nuevaCuenta.contrasena}
                    onChange={e => setNuevaCuenta({ ...nuevaCuenta, contrasena: e.target.value })}
                    placeholder="••••••••" className={inputCls} />
                </div>
              </div>
              {errCuenta && <p className="text-destructive text-sm">{errCuenta}</p>}
              <button onClick={agregarCuenta}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:opacity-90 transition text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Crear Cuenta
              </button>
            </div>
          </section>

          {/* Listado cuentas */}
          <section className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-card-foreground">Cuentas Registradas</h3>

              {/* Agregar nuevo rol */}
              <div className="flex items-center gap-2">
                {mostrarAgregarRol ? (
                  <>
                    <input type="text" value={nuevoRolInput}
                      onChange={e => setNuevoRolInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && agregarRol()}
                      placeholder="Nuevo rol..." autoFocus
                      className="px-3 py-1 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-36" />
                    <button onClick={agregarRol} className="text-primary hover:opacity-80"><Check className="w-4 h-4" /></button>
                    <button onClick={() => { setMostrarAgregarRol(false); setNuevoRolInput(''); }} className="text-muted-foreground hover:opacity-80"><X className="w-4 h-4" /></button>
                  </>
                ) : (
                  <button onClick={() => setMostrarAgregarRol(true)}
                    className="flex items-center gap-1 text-xs text-primary border border-primary/30 px-3 py-1 rounded-lg hover:bg-primary/5 transition">
                    <Plus className="w-3 h-3" />
                    Agregar Rol
                  </button>
                )}
              </div>
            </div>

            {/* Cabecera */}
            <div className="grid grid-cols-[2fr_2fr_1.5fr] gap-4 px-4 py-3 bg-secondary/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Nombre</span><span>Correo</span><span>Rol</span>
            </div>

            {/* Filas */}
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
              {cuentas.map((c, i) => (
                <div key={c.id}
                  className={`grid grid-cols-[2fr_2fr_1.5fr] gap-4 px-4 py-3 border-b border-border last:border-0 items-center ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}>
                  <span className="text-card-foreground font-medium text-sm">{c.nombre}</span>
                  <span className="text-muted-foreground text-sm">{c.correo}</span>

                  {/* Rol editable */}
                  <div>
                    {editandoRol === c.id ? (
                      <div className="flex items-center gap-1">
                        <select defaultValue={c.rol}
                          onChange={e => cambiarRolCuenta(c.id, e.target.value)}
                          className="flex-1 px-2 py-1 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          autoFocus>
                          {rolesDisponibles.map(r => <option key={r} value={r}>{r}</option>)}
                          <option value="Administrador">Administrador</option>
                        </select>
                        <button onClick={() => setEditandoRol(null)} className="text-muted-foreground hover:opacity-80">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setEditandoRol(c.id)}
                        className="flex items-center gap-1 text-sm text-card-foreground hover:text-primary transition group">
                        <span>{c.rol}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      {/* ── DASHBOARDS ── */}
      {vista === 'dashboards' && (
        <div className="flex h-[calc(100vh-64px)]">

          {/* Sidebar izquierdo */}
          <aside className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${sidebarAbierto ? 'w-64' : 'w-12'} shrink-0`}>
            <button
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
              className="flex items-center gap-2 px-3 py-3 border-b border-border hover:bg-secondary/30 transition text-card-foreground"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarAbierto ? 'rotate-180' : ''}`} />
              {sidebarAbierto && <span className="text-sm font-medium truncate">Assets guardados</span>}
            </button>

            {sidebarAbierto && (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Botón generar por query */}
                <div className="p-3 border-b border-border space-y-2">
                  <button
                    onClick={() => setQueryResultado(null)}
                    className="w-full flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition text-sm"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Generar gráfico</span>
                  </button>
                  <textarea
                    value={queryTexto}
                    onChange={e => setQueryTexto(e.target.value)}
                    placeholder="Ej: Mostrar eventos por mes de octubre..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-xs focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  <button
                    onClick={() => { if (queryTexto.trim()) { setQueryResultado(queryTexto.trim()); setQueryTexto(''); } }}
                    className="w-full border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition text-xs"
                  >
                    Ejecutar consulta
                  </button>
                </div>

                {/* Lista de assets */}
                <div className="overflow-y-auto flex-1 py-2">
                  {ASSETS_GUARDADOS.map(a => (
                    <button
                      key={a.id}
                      onClick={() => { setAssetActivo(a.id); setQueryResultado(null); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-secondary/30 transition text-sm ${assetActivo === a.id && !queryResultado ? 'bg-primary/10 text-primary font-medium' : 'text-card-foreground'}`}
                    >
                      <span className={assetActivo === a.id && !queryResultado ? 'text-primary' : 'text-muted-foreground'}>{a.icon}</span>
                      <span className="truncate leading-tight">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Área principal de gráficos */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">

            {queryResultado ? (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-card-foreground">Resultado: "{queryResultado}"</h3>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={TIPO_EVENTO_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="tipo" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                      <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                      <Tooltip formatter={(v: number) => [v, 'Cantidad']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                      <Bar dataKey="cantidad" fill="#3a5a40" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Gráfico generado a partir de tu consulta.</p>
              </div>
            ) : (
              <>
                {/* Gráfico 1 — Costo de eventos */}
                {(assetActivo === 'costo-eventos') && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-card-foreground mb-1">Costo de Eventos — Último Año</h3>
                    <p className="text-muted-foreground text-xs mb-4">Facturación mensual en pesos chilenos (Jul 2024 – Jun 2025)</p>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={COSTO_EVENTOS} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                          <YAxis tickFormatter={formatCLP} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                          <Tooltip formatter={(v: number) => [`$${v.toLocaleString('es-CL')}`, 'Costo']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                          <Bar dataKey="valor" fill="#3a5a40" radius={[4, 4, 0, 0]} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-right">
                      Total anual: <span className="font-semibold text-card-foreground">${COSTO_EVENTOS.reduce((a, b) => a + b.valor, 0).toLocaleString('es-CL')}</span>
                    </p>
                  </div>
                )}

                {/* Gráfico 2 — Costo trabajadores */}
                {assetActivo === 'costo-trabajadores' && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-card-foreground mb-1">Costo de Trabajadores — Último Año</h3>
                    <p className="text-muted-foreground text-xs mb-4">Gasto mensual en honorarios (Jul 2024 – Jun 2025)</p>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={COSTO_TRABAJADORES} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                          <YAxis tickFormatter={formatCLP} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                          <Tooltip formatter={(v: number) => [`$${v.toLocaleString('es-CL')}`, 'Gasto']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                          <Line type="monotone" dataKey="valor" stroke="#7c5c3a" strokeWidth={2.5} dot={{ r: 4, fill: '#7c5c3a' }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-right">
                      Total anual: <span className="font-semibold text-card-foreground">${COSTO_TRABAJADORES.reduce((a, b) => a + b.valor, 0).toLocaleString('es-CL')}</span>
                    </p>
                  </div>
                )}

                {/* Gráfico 3 — % concretados */}
                {assetActivo === 'concretados' && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-card-foreground mb-1">% de Eventos Concretados</h3>
                    <p className="text-muted-foreground text-xs mb-4">Distribución del estado final de todos los eventos del último año</p>
                    <div className="h-72 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={CONCRETADOS_DATA} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                            dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                            {CONCRETADOS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                          <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 13 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Gráfico 4 — Alergias */}
                {assetActivo === 'alergias' && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-card-foreground mb-1">Alergias más Frecuentes</h3>
                    <p className="text-muted-foreground text-xs mb-4">Cantidad de personas reportadas con cada tipo de alergia en el último año</p>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={ALERGIAS_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                          <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                          <YAxis type="category" dataKey="nombre" tick={{ fontSize: 13, fill: 'var(--card-foreground)' }} />
                          <Tooltip formatter={(v: number) => [v, 'Personas']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                          <Bar dataKey="cantidad" fill="#7c5c3a" radius={[0, 4, 4, 0]} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Gráfico 5 — Eventos por tipo */}
                {assetActivo === 'eventos-mes' && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-card-foreground mb-1">Eventos por Tipo</h3>
                    <p className="text-muted-foreground text-xs mb-4">Total de eventos realizados según categoría en el último año</p>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={TIPO_EVENTO_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="tipo" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                          <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                          <Tooltip formatter={(v: number) => [v, 'Eventos']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                          <Bar dataKey="cantidad" fill="#3a5a40" radius={[4, 4, 0, 0]} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Tarjetas resumen siempre visibles */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Facturación anual', value: `$${(COSTO_EVENTOS.reduce((a,b)=>a+b.valor,0)/1000000).toFixed(1)}M`, sub: 'Jul 2024 – Jun 2025' },
                { label: 'Gasto trabajadores', value: `$${(COSTO_TRABAJADORES.reduce((a,b)=>a+b.valor,0)/1000000).toFixed(1)}M`, sub: 'Último año' },
                { label: 'Tasa concreción', value: '68%', sub: 'Eventos completados' },
              ].map(c => (
                <div key={c.label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">{c.label}</p>
                  <p className="text-2xl font-semibold text-card-foreground">{c.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
