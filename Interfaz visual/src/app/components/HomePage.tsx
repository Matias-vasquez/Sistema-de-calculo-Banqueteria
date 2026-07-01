import { Phone, Mail, MapPin, Users, Wine, Building2, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white">Banquetera Amelia Correa</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <a href="#bodas" className="text-white/90 hover:text-white transition">Bodas</a>
              <a href="#barra-libre" className="text-white/90 hover:text-white transition">Barra Libre</a>
              <a href="#empresas" className="text-white/90 hover:text-white transition">Empresas</a>
              <a href="#contacto" className="text-white/90 hover:text-white transition">Contacto</a>
            </nav>
            <Link to="/login">
              <button className="bg-white text-primary px-6 py-2 rounded-lg hover:opacity-90 transition">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/mis-eventos" title="Mis Eventos" className="text-white hover:opacity-80 transition">
              <UserCircle className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="max-w-4xl mx-auto text-center px-6 z-10">
          <h1 className="mb-6 text-foreground">Creamos Experiencias Inolvidables</h1>
          <p className="mb-8 max-w-2xl mx-auto text-muted-foreground">
            Somos especialistas en servicios de Gastronomía y diseño de eventos.
            Matrimonios y Corporativos.
            40 años de experiencia innovando, transformamos cada celebración en un momento único y memorable.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-foreground">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5" />
              <span>Santiago de Chile</span>
            </div>
          </div>
          <Link to="/cotizacion">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition">
              Solicitar Cotización
            </button>
          </Link>
        </div>
      </section>

      {/* Wedding Section */}
      <section id="bodas" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-primary">Banquetes para Bodas</h2>
              </div>
              <p className="mb-6 text-muted-foreground">
                Hacemos realidad el día más importante de tu vida. Nuestro equipo se encarga de cada detalle
                para que tu boda sea perfecta, desde la elegancia en la presentación hasta el exquisito sabor de cada platillo.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Menús personalizados según tus preferencias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Montaje y decoración de mesas elegantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Personal capacitado y profesional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Servicio de mesa francesa, americana o buffet</span>
                </li>
              </ul>
              <Link to="/cotizacion?tipo=bodas">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
                  Ver Paquetes de Boda
                </button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1763553113391-a659bee36e06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxlbGVnYW50JTIwd2VkZGluZyUyMGJhbnF1ZXQlMjB0YWJsZSUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NzgwMjMxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mesa de boda elegante"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Bar Section */}
      <section id="barra-libre" className="py-20 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2NrdGFpbCUyMGJhciUyMGRyaW5rcyUyMHBhcnR5fGVufDF8fHx8MTc3ODAyMzEzMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Servicio de bar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Wine className="w-8 h-8 text-primary" />
                <h2 className="text-primary">Barra Libre</h2>
              </div>
              <p className="mb-6 text-muted-foreground">
                Complementa tu evento con nuestro servicio de barra libre. Contamos con bartenders profesionales
                y una amplia selección de bebidas premium para que tus invitados disfruten al máximo.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Barra Nacional: Tequila, ron, vodka, whisky y más</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Barra Premium: Marcas internacionales de primera calidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cocteles de autor y bebidas personalizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Servicio de vinos y champagne</span>
                </li>
              </ul>
              <Link to="/cotizacion?tipo=barra-libre">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
                  Conocer Paquetes de Bar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section id="empresas" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
                <h2 className="text-primary">Banquetes para Empresas</h2>
              </div>
              <p className="mb-6 text-muted-foreground">
                Servicios profesionales de catering para eventos corporativos. Ya sea una conferencia,
                reunión de negocios, o celebración empresarial, te ofrecemos soluciones a la medida.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Coffee breaks y desayunos ejecutivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Comidas y cenas corporativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Eventos de networking y conferencias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Servicio de alimentos para capacitaciones</span>
                </li>
              </ul>
              <Link to="/cotizacion?tipo=empresas">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
                  Solicitar Propuesta Corporativa
                </button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1768508663341-ed48fd1e69d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMGV2ZW50JTIwY2F0ZXJpbmd8ZW58MXx8fHwxNzc4MDIzMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Evento corporativo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">¿Listo para tu Próximo Evento?</h2>
          <p className="mb-8 text-white/90">
            Contáctanos hoy y recibe una cotización personalizada sin compromiso
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-primary px-8 py-3 rounded-lg hover:opacity-90 transition">
              Llamar Ahora
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition">
              Enviar Mensaje
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/90 text-primary-foreground py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/80">© 2026 Banquetera Amelia Correa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
