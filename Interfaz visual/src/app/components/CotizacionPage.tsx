import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface Alergia {
  id: number;
  tipo: string;
  cantidad: string;
  platoOpcional: string;
}

interface DietaEspecial {
  id: number;
  tipo: string;
  cantidad: string;
  platillo: string;
}

interface Bebestible {
  id: number;
  tipo: string;
}

interface AlimentoBarraLibre {
  id: number;
  nombre: string;
}

export default function CotizacionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tipoEvento = searchParams.get('tipo') || '';
  const minFecha = (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().split('T')[0]; })();

  const [formData, setFormData] = useState({
    fechaEvento: '',
    direccionEvento: '',
    tipoEvento: tipoEvento,
    cantidadPersonas: '',
    tipoEspacio: 'abierto',
    gustosTorta: '',
    platoFuerte: '',
    entrada: '',
    postre: '',
    tipoServicioCorporativo: 'platillos',
    platilloDesayuno: '',
  });

  const [incluirAlcohol, setIncluirAlcohol] = useState(false);
  const [alcoholData, setAlcoholData] = useState({
    botellasPorMesa: '',
    tipoAlcohol: '',
    barraLibreAlcohol: false,
  });

  const [incluirAlergias, setIncluirAlergias] = useState(false);
  const [alergias, setAlergias] = useState<Alergia[]>([]);

  const [incluirDietas, setIncluirDietas] = useState(false);
  const [dietas, setDietas] = useState<DietaEspecial[]>([]);

  const [barraLibreAlimentos, setBarraLibreAlimentos] = useState(false);
  const [barraAlimentosData, setBarraAlimentosData] = useState({
    incluirDietas: false,
    incluirAlergias: false,
  });

  const [bebestibles, setBebestibles] = useState<Bebestible[]>([]);

  const [alimentosBarraLibre, setAlimentosBarraLibre] = useState<AlimentoBarraLibre[]>([]);

  useEffect(() => {
    if (tipoEvento) {
      setFormData(prev => ({ ...prev, tipoEvento }));
    }
  }, [tipoEvento]);

  const agregarAlergia = () => {
    const nuevaAlergia: Alergia = {
      id: Date.now(),
      tipo: '',
      cantidad: '',
      platoOpcional: '',
    };
    setAlergias([...alergias, nuevaAlergia]);
  };

  const eliminarAlergia = (id: number) => {
    setAlergias(alergias.filter(a => a.id !== id));
  };

  const actualizarAlergia = (id: number, campo: keyof Alergia, valor: string) => {
    setAlergias(alergias.map(a =>
      a.id === id ? { ...a, [campo]: valor } : a
    ));
  };

  const agregarDieta = () => {
    const nuevaDieta: DietaEspecial = {
      id: Date.now(),
      tipo: '',
      cantidad: '',
      platillo: '',
    };
    setDietas([...dietas, nuevaDieta]);
  };

  const eliminarDieta = (id: number) => {
    setDietas(dietas.filter(d => d.id !== id));
  };

  const actualizarDieta = (id: number, campo: keyof DietaEspecial, valor: string) => {
    setDietas(dietas.map(d =>
      d.id === id ? { ...d, [campo]: valor } : d
    ));
  };

  const agregarBebestible = () => {
    const nuevoBebestible: Bebestible = {
      id: Date.now(),
      tipo: '',
    };
    setBebestibles([...bebestibles, nuevoBebestible]);
  };

  const eliminarBebestible = (id: number) => {
    setBebestibles(bebestibles.filter(b => b.id !== id));
  };

  const actualizarBebestible = (id: number, campo: keyof Bebestible, valor: string) => {
    setBebestibles(bebestibles.map(b =>
      b.id === id ? { ...b, [campo]: valor } : b
    ));
  };

  const agregarAlimentoBarraLibre = () => {
    const nuevoAlimento: AlimentoBarraLibre = {
      id: Date.now(),
      nombre: '',
    };
    setAlimentosBarraLibre([...alimentosBarraLibre, nuevoAlimento]);
  };

  const eliminarAlimentoBarraLibre = (id: number) => {
    setAlimentosBarraLibre(alimentosBarraLibre.filter(a => a.id !== id));
  };

  const actualizarAlimentoBarraLibre = (id: number, valor: string) => {
    setAlimentosBarraLibre(alimentosBarraLibre.map(a =>
      a.id === id ? { ...a, nombre: valor } : a
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-white hover:opacity-80 transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-white">Banquetera Amelia Correa - Formulario de Cotización</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información de Evento */}
          <section className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="mb-6 text-card-foreground">Información de Evento</h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-card-foreground">Fecha del Evento</label>
                <input
                  type="date"
                  required
                  min={minFecha}
                  value={formData.fechaEvento}
                  onChange={(e) => setFormData({ ...formData, fechaEvento: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block mb-2 text-card-foreground">Dirección del Evento</label>
                <input
                  type="text"
                  required
                  value={formData.direccionEvento}
                  onChange={(e) => setFormData({ ...formData, direccionEvento: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </section>

          {/* Tipo de Evento y Opciones Estándar */}
          <section className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="mb-6 text-card-foreground">Detalles del Evento</h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-card-foreground">Tipo de Evento</label>
                <select
                  required
                  value={formData.tipoEvento}
                  onChange={(e) => setFormData({ ...formData, tipoEvento: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="bodas">Boda</option>
                  <option value="barra-libre">Barra Libre</option>
                  <option value="empresas">Evento Corporativo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-card-foreground">Cantidad de Personas</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.cantidadPersonas}
                    onChange={(e) => setFormData({ ...formData, cantidadPersonas: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-card-foreground">Tipo de Espacio</label>
                  <select
                    required
                    value={formData.tipoEspacio}
                    onChange={(e) => setFormData({ ...formData, tipoEspacio: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="abierto">Espacio Abierto</option>
                    <option value="cerrado">Espacio Cerrado</option>
                  </select>
                </div>
              </div>

              {/* Bebestibles - Nueva sección */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="mb-4 text-card-foreground">Bebestibles</h3>

                <div className="space-y-4">
                  {bebestibles.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Haga clic en "Agregar Bebestible" para seleccionar bebidas para el evento.
                    </p>
                  )}

                  {bebestibles.map((bebestible, index) => (
                    <div key={bebestible.id} className="flex gap-3 items-center">
                      <div className="flex-1">
                        <select
                          value={bebestible.tipo}
                          onChange={(e) => actualizarBebestible(bebestible.id, 'tipo', e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Seleccione un bebestible</option>
                          <option value="jugos-naturales">Jugos Naturales</option>
                          <option value="bebidas-gaseosas">Bebidas Gaseosas</option>
                          <option value="agua-mineral">Agua Mineral</option>
                          <option value="agua-con-gas">Agua con Gas</option>
                          <option value="te-frio">Té Frío</option>
                          <option value="limonada">Limonada</option>
                          <option value="cafe">Café</option>
                          <option value="te-caliente">Té Caliente</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarBebestible(bebestible.id)}
                        className="text-destructive hover:opacity-80"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={agregarBebestible}
                    className="flex items-center gap-2 text-primary hover:opacity-80"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Bebestible
                  </button>
                </div>
              </div>

              {/* Opciones específicas para Bodas */}
              {formData.tipoEvento === 'bodas' && (
                <div className="mt-6 pt-6 border-t border-border space-y-6">
                  <h3 className="text-card-foreground">Opciones Especiales para Bodas</h3>

                  <div>
                    <label className="block mb-2 text-card-foreground">Gustos para Torta</label>
                    <textarea
                      value={formData.gustosTorta}
                      onChange={(e) => setFormData({ ...formData, gustosTorta: e.target.value })}
                      rows={3}
                      placeholder="Describa sus preferencias para la torta..."
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block mb-2 text-card-foreground">Entrada</label>
                      <input
                        type="text"
                        value={formData.entrada}
                        onChange={(e) => setFormData({ ...formData, entrada: e.target.value })}
                        placeholder="Ej: Ensalada César"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-card-foreground">Plato Fuerte</label>
                      <input
                        type="text"
                        value={formData.platoFuerte}
                        onChange={(e) => setFormData({ ...formData, platoFuerte: e.target.value })}
                        placeholder="Ej: Filete de res"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-card-foreground">Postre</label>
                      <input
                        type="text"
                        value={formData.postre}
                        onChange={(e) => setFormData({ ...formData, postre: e.target.value })}
                        placeholder="Ej: Tiramisú"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Opciones específicas para Barra Libre */}
              {formData.tipoEvento === 'barra-libre' && (
                <div className="mt-6 pt-6 border-t border-border space-y-6">
                  <h3 className="text-card-foreground">Opciones Especiales para Barra Libre</h3>

                  <div>
                    <label className="block mb-2 text-card-foreground">Alimentos a Escoger</label>

                    <div className="space-y-4">
                      {alimentosBarraLibre.length === 0 && (
                        <p className="text-muted-foreground text-sm">
                          Haga clic en "Agregar Alimento" para comenzar a seleccionar los alimentos de la barra libre.
                        </p>
                      )}

                      {alimentosBarraLibre.map((alimento, index) => (
                        <div key={alimento.id} className="flex gap-3 items-center">
                          <div className="flex-1">
                            <select
                              value={alimento.nombre}
                              onChange={(e) => actualizarAlimentoBarraLibre(alimento.id, e.target.value)}
                              className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="">Seleccione un alimento</option>
                              <option value="bocadillos-variados">Bocadillos Variados</option>
                              <option value="canapes">Canapés</option>
                              <option value="tabla-quesos">Tabla de Quesos</option>
                              <option value="tabla-fiambres">Tabla de Fiambres</option>
                              <option value="frutas-frescas">Frutas Frescas</option>
                              <option value="vegetales-dip">Vegetales con Dip</option>
                              <option value="empanadas">Empanadas</option>
                              <option value="mini-sandwiches">Mini Sándwiches</option>
                              <option value="croquetas">Croquetas</option>
                              <option value="alitas-pollo">Alitas de Pollo</option>
                              <option value="brochetas">Brochetas</option>
                              <option value="sushi">Sushi</option>
                              <option value="tacos">Tacos</option>
                              <option value="nachos">Nachos</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            onClick={() => eliminarAlimentoBarraLibre(alimento.id)}
                            className="text-destructive hover:opacity-80"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={agregarAlimentoBarraLibre}
                        className="flex items-center gap-2 text-primary hover:opacity-80"
                      >
                        <Plus className="w-5 h-5" />
                        Agregar Alimento
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Opciones específicas para Eventos Corporativos */}
              {formData.tipoEvento === 'empresas' && (
                <div className="mt-6 pt-6 border-t border-border space-y-6">
                  <h3 className="text-card-foreground">Opciones Especiales para Eventos Corporativos</h3>

                  <div>
                    <label className="block mb-2 text-card-foreground">Tipo de Servicio</label>
                    <select
                      value={formData.tipoServicioCorporativo}
                      onChange={(e) => setFormData({ ...formData, tipoServicioCorporativo: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="platillos">Platillos (Entrada, Plato Fuerte, Postre)</option>
                      <option value="desayuno">Desayuno</option>
                    </select>
                  </div>

                  {formData.tipoServicioCorporativo === 'platillos' && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block mb-2 text-card-foreground">Entrada</label>
                        <input
                          type="text"
                          value={formData.entrada}
                          onChange={(e) => setFormData({ ...formData, entrada: e.target.value })}
                          placeholder="Ej: Ensalada mixta"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Plato Fuerte</label>
                        <input
                          type="text"
                          value={formData.platoFuerte}
                          onChange={(e) => setFormData({ ...formData, platoFuerte: e.target.value })}
                          placeholder="Ej: Pollo al horno"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Postre</label>
                        <input
                          type="text"
                          value={formData.postre}
                          onChange={(e) => setFormData({ ...formData, postre: e.target.value })}
                          placeholder="Ej: Brownie"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                  )}

                  {formData.tipoServicioCorporativo === 'desayuno' && (
                    <div>
                      <label className="block mb-2 text-card-foreground">Platillo de Desayuno</label>
                      <input
                        type="text"
                        value={formData.platilloDesayuno}
                        onChange={(e) => setFormData({ ...formData, platilloDesayuno: e.target.value })}
                        placeholder="Ej: Huevos revueltos con pan tostado"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Alcohol */}
          <section className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="incluir-alcohol"
                checked={incluirAlcohol}
                onChange={(e) => setIncluirAlcohol(e.target.checked)}
                className="w-5 h-5 rounded border-border"
              />
              <label htmlFor="incluir-alcohol" className="text-card-foreground cursor-pointer">
                Incluir Servicio de Alcohol
              </label>
            </div>

            {incluirAlcohol && (
              <div className="mt-6 space-y-6 pl-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-card-foreground">Botellas por Mesa</label>
                    <input
                      type="number"
                      min="0"
                      value={alcoholData.botellasPorMesa}
                      onChange={(e) => setAlcoholData({ ...alcoholData, botellasPorMesa: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-card-foreground">Tipo de Alcohol</label>
                    <select
                      value={alcoholData.tipoAlcohol}
                      onChange={(e) => setAlcoholData({ ...alcoholData, tipoAlcohol: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Seleccione</option>
                      <option value="nacional">Barra Nacional</option>
                      <option value="premium">Barra Premium</option>
                      <option value="mixto">Mixto</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="barra-libre-alcohol"
                    checked={alcoholData.barraLibreAlcohol}
                    onChange={(e) => setAlcoholData({ ...alcoholData, barraLibreAlcohol: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <label htmlFor="barra-libre-alcohol" className="text-card-foreground cursor-pointer">
                    Barra Libre de Alcohol
                  </label>
                </div>
              </div>
            )}
          </section>

          {/* Alergias */}
          <section className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="incluir-alergias"
                checked={incluirAlergias}
                onChange={(e) => {
                  setIncluirAlergias(e.target.checked);
                  if (e.target.checked && alergias.length === 0) {
                    agregarAlergia();
                  }
                }}
                className="w-5 h-5 rounded border-border"
              />
              <label htmlFor="incluir-alergias" className="text-card-foreground cursor-pointer">
                Hay Personas con Alergias Alimentarias
              </label>
            </div>

            {incluirAlergias && (
              <div className="mt-6 space-y-6 pl-8">
                {alergias.map((alergia, index) => (
                  <div key={alergia.id} className="p-4 bg-secondary/20 rounded-lg space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-card-foreground">Alergia {index + 1}</h4>
                      {alergias.length > 1 && (
                        <button
                          type="button"
                          onClick={() => eliminarAlergia(alergia.id)}
                          className="text-destructive hover:opacity-80"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-card-foreground">Tipo de Alergia</label>
                        <input
                          type="text"
                          value={alergia.tipo}
                          onChange={(e) => actualizarAlergia(alergia.id, 'tipo', e.target.value)}
                          placeholder="Ej: Mariscos, nueces"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Cantidad de Personas</label>
                        <input
                          type="number"
                          min="1"
                          value={alergia.cantidad}
                          onChange={(e) => actualizarAlergia(alergia.id, 'cantidad', e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Plato Opcional</label>
                        <input
                          type="text"
                          value={alergia.platoOpcional}
                          onChange={(e) => actualizarAlergia(alergia.id, 'platoOpcional', e.target.value)}
                          placeholder="Platillo alternativo"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={agregarAlergia}
                  className="flex items-center gap-2 text-primary hover:opacity-80"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Otra Alergia
                </button>
              </div>
            )}
          </section>

          {/* Dietas Especiales */}
          <section className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="incluir-dietas"
                checked={incluirDietas}
                onChange={(e) => {
                  setIncluirDietas(e.target.checked);
                  if (e.target.checked && dietas.length === 0) {
                    agregarDieta();
                  }
                }}
                className="w-5 h-5 rounded border-border"
              />
              <label htmlFor="incluir-dietas" className="text-card-foreground cursor-pointer">
                Hay Personas con Dietas Especiales
              </label>
            </div>

            {incluirDietas && (
              <div className="mt-6 space-y-6 pl-8">
                {dietas.map((dieta, index) => (
                  <div key={dieta.id} className="p-4 bg-secondary/20 rounded-lg space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-card-foreground">Dieta {index + 1}</h4>
                      {dietas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => eliminarDieta(dieta.id)}
                          className="text-destructive hover:opacity-80"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-card-foreground">Tipo de Dieta</label>
                        <input
                          type="text"
                          value={dieta.tipo}
                          onChange={(e) => actualizarDieta(dieta.id, 'tipo', e.target.value)}
                          placeholder="Ej: Vegana, Vegetariana"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Cantidad de Personas</label>
                        <input
                          type="number"
                          min="1"
                          value={dieta.cantidad}
                          onChange={(e) => actualizarDieta(dieta.id, 'cantidad', e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-card-foreground">Platillo de Dieta</label>
                        <input
                          type="text"
                          value={dieta.platillo}
                          onChange={(e) => actualizarDieta(dieta.id, 'platillo', e.target.value)}
                          placeholder="Platillo especial"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={agregarDieta}
                  className="flex items-center gap-2 text-primary hover:opacity-80"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Otra Dieta
                </button>
              </div>
            )}
          </section>

          {/* Barra Libre de Alimentos - Solo si NO es evento de barra libre */}
          {formData.tipoEvento !== 'barra-libre' && (
            <section className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="barra-libre-alimentos"
                  checked={barraLibreAlimentos}
                  onChange={(e) => setBarraLibreAlimentos(e.target.checked)}
                  className="w-5 h-5 rounded border-border"
                />
                <label htmlFor="barra-libre-alimentos" className="text-card-foreground cursor-pointer">
                  Incluir Barra Libre de Alimentos
                </label>
              </div>

              {barraLibreAlimentos && (
                <div className="mt-6 space-y-4 pl-8">
                  <div>
                    <label className="block mb-2 text-card-foreground">Alimentos a Escoger</label>

                    <div className="space-y-4">
                      {alimentosBarraLibre.length === 0 && (
                        <p className="text-muted-foreground text-sm">
                          Haga clic en "Agregar Alimento" para comenzar a seleccionar los alimentos de la barra libre.
                        </p>
                      )}

                      {alimentosBarraLibre.map((alimento, index) => (
                        <div key={alimento.id} className="flex gap-3 items-center">
                          <div className="flex-1">
                            <select
                              value={alimento.nombre}
                              onChange={(e) => actualizarAlimentoBarraLibre(alimento.id, e.target.value)}
                              className="w-full px-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="">Seleccione un alimento</option>
                              <option value="bocadillos-variados">Bocadillos Variados</option>
                              <option value="canapes">Canapés</option>
                              <option value="tabla-quesos">Tabla de Quesos</option>
                              <option value="tabla-fiambres">Tabla de Fiambres</option>
                              <option value="frutas-frescas">Frutas Frescas</option>
                              <option value="vegetales-dip">Vegetales con Dip</option>
                              <option value="empanadas">Empanadas</option>
                              <option value="mini-sandwiches">Mini Sándwiches</option>
                              <option value="croquetas">Croquetas</option>
                              <option value="alitas-pollo">Alitas de Pollo</option>
                              <option value="brochetas">Brochetas</option>
                              <option value="sushi">Sushi</option>
                              <option value="tacos">Tacos</option>
                              <option value="nachos">Nachos</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            onClick={() => eliminarAlimentoBarraLibre(alimento.id)}
                            className="text-destructive hover:opacity-80"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={agregarAlimentoBarraLibre}
                        className="flex items-center gap-2 text-primary hover:opacity-80"
                      >
                        <Plus className="w-5 h-5" />
                        Agregar Alimento
                      </button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    Opciones adicionales para la barra libre de alimentos:
                  </p>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="barra-incluir-dietas"
                      checked={barraAlimentosData.incluirDietas}
                      onChange={(e) => setBarraAlimentosData({ ...barraAlimentosData, incluirDietas: e.target.checked })}
                      className="w-5 h-5 rounded border-border"
                    />
                    <label htmlFor="barra-incluir-dietas" className="text-card-foreground cursor-pointer">
                      Incluir alimentos extras para dietas especiales
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="barra-incluir-alergias"
                      checked={barraAlimentosData.incluirAlergias}
                      onChange={(e) => setBarraAlimentosData({ ...barraAlimentosData, incluirAlergias: e.target.checked })}
                      className="w-5 h-5 rounded border-border"
                    />
                    <label htmlFor="barra-incluir-alergias" className="text-card-foreground cursor-pointer">
                      Incluir alimentos extras para alergias
                    </label>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Botón de Envío */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-12 py-3 rounded-lg hover:opacity-90 transition"
            >
              Enviar Cotización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
