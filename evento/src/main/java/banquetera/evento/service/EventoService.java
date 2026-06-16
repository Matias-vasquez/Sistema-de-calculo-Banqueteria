package banquetera.evento.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banquetera.evento.model.Evento;
import banquetera.evento.repository.EventoRepository;
import jakarta.validation.constraints.NotNull;

@Service
public class EventoService {

    @Autowired
    private EventoRepository repo;

    @Autowired
    private ActaService actaService;

    @Autowired
    private ClienteExternoService clienteExterno;

    // ─── Listar todos ────────────────────────────────────────────────────────

    public List<Evento> listar() {
        return repo.findAll();
    }

    // ─── Buscar por ID ───────────────────────────────────────────────────────

    public Evento buscarId(@NotNull Long id) {
        Optional<Evento> retorno = repo.findById(id);
        if (!retorno.isPresent()) throw new RuntimeException("Evento no encontrado");
        return retorno.get();
    }

    // ─── Crear ───────────────────────────────────────────────────────────────

    public Evento crear(@NotNull Evento evento) {
        // Validar que el acta exista en este microservicio
        if (evento.getActa() == null)
            throw new RuntimeException("El acta es obligatoria");
        actaService.buscarId(evento.getActa().getId());

        // Validar fechas
        if (evento.getTerminoEvento() != null && evento.getFechaEvento() != null &&
            evento.getTerminoEvento().isBefore(evento.getFechaEvento()))
            throw new RuntimeException("La fecha de término no puede ser anterior a la fecha de inicio");

        // Asignar fecha de cotización si no viene
        if (evento.getFechaCotizacion() == null)
            evento.setFechaCotizacion(LocalDateTime.now());

        return repo.save(evento);
    }

    // ─── Actualizar ──────────────────────────────────────────────────────────

    public Evento actualizar(@NotNull Long id, @NotNull Evento eventoNuevo) {
        Evento eventoExistente = buscarId(id);

        if (eventoNuevo.getActa() != null)
            actaService.buscarId(eventoNuevo.getActa().getId());

        if (eventoNuevo.getTerminoEvento() != null && eventoNuevo.getFechaEvento() != null &&
            eventoNuevo.getTerminoEvento().isBefore(eventoNuevo.getFechaEvento()))
            throw new RuntimeException("La fecha de término no puede ser anterior a la fecha de inicio");

        eventoExistente.setTipoEvento(eventoNuevo.getTipoEvento());
        eventoExistente.setFechaEvento(eventoNuevo.getFechaEvento());
        eventoExistente.setTerminoEvento(eventoNuevo.getTerminoEvento());
        eventoExistente.setTipoEspacio(eventoNuevo.getTipoEspacio());
        eventoExistente.setCantidadInvitados(eventoNuevo.getCantidadInvitados());
        eventoExistente.setEstado(eventoNuevo.getEstado());
        eventoExistente.setActa(eventoNuevo.getActa());

        return repo.save(eventoExistente);
    }

    // ─── Eliminar ────────────────────────────────────────────────────────────

    public void eliminar(@NotNull Long id) {
        Evento evento = buscarId(id);
        repo.delete(evento);
    }

    // ─── Agregar Cuenta ───────────────────────────────────────────────────────

    public Evento agregarCuenta(@NotNull Long eventoId, @NotNull Long cuentaId) {
        Evento evento = buscarId(eventoId);
        // Validar que la cuenta exista en el microservicio externo
        clienteExterno.buscarCuenta(cuentaId);
        if (evento.getCuentasIds().contains(cuentaId))
            throw new RuntimeException("La cuenta ya está asociada a este evento");
        evento.getCuentasIds().add(cuentaId);
        return repo.save(evento);
    }

    // ─── Quitar Cuenta ────────────────────────────────────────────────────────

    public Evento quitarCuenta(@NotNull Long eventoId, @NotNull Long cuentaId) {
        Evento evento = buscarId(eventoId);
        evento.getCuentasIds().remove(cuentaId);
        return repo.save(evento);
    }
}
