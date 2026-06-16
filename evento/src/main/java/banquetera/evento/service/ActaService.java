package banquetera.evento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banquetera.evento.model.Acta;
import banquetera.evento.model.DietaAlergia;
import banquetera.evento.repository.ActaRepository;
import jakarta.validation.constraints.NotNull;

@Service
public class ActaService {
    @Autowired
    private ActaRepository repo;
    @Autowired
    private DietaAlergiaService dietaAlergiaService;
    @Autowired
    private ClienteExternoService clienteExterno;


    public List<Acta> listar() {
        return repo.findAll();
    }

    // ─── Buscar por ID ───────────────────────────────────────────────────────

    public Acta buscarId(@NotNull Long id) {
        Optional<Acta> retorno = repo.findById(id);
        if (!retorno.isPresent()) throw new RuntimeException("Acta no encontrada");
        return retorno.get();
    }

    // ─── Crear ───────────────────────────────────────────────────────────────

    public Acta crear(@NotNull Acta acta) {
        // Validar que el pastel exista en el microservicio externo
        clienteExterno.buscarPastel(acta.getPastelId());
        return repo.save(acta);
    }

    // ─── Actualizar ──────────────────────────────────────────────────────────

    public Acta actualizar(@NotNull Long id, @NotNull Acta actaNueva) {
        Acta actaExistente = buscarId(id);

        // Validar nuevo pastel si cambió
        if (actaNueva.getPastelId() != null)
            clienteExterno.buscarPastel(actaNueva.getPastelId());

        actaExistente.setBarraAlimentos(actaNueva.getBarraAlimentos());
        actaExistente.setBarraAlcohol(actaNueva.getBarraAlcohol());
        actaExistente.setFormatoAlimento(actaNueva.getFormatoAlimento());
        actaExistente.setPastelId(actaNueva.getPastelId());

        return repo.save(actaExistente);
    }

    // ─── Eliminar ────────────────────────────────────────────────────────────

    public void eliminar(@NotNull Long id) {
        Acta acta = buscarId(id);
        repo.delete(acta);
    }

    // ─── Agregar Bebestible ───────────────────────────────────────────────────

    public Acta agregarBebestible(@NotNull Long actaId, @NotNull Long bebestibleId) {
        Acta acta = buscarId(actaId);
        // Validar que exista en el microservicio externo
        clienteExterno.buscarBebestible(bebestibleId);
        if (acta.getBebestiblesIds().contains(bebestibleId))
            throw new RuntimeException("El bebestible ya está asociado a esta acta");
        acta.getBebestiblesIds().add(bebestibleId);
        return repo.save(acta);
    }

    // ─── Quitar Bebestible ────────────────────────────────────────────────────

    public Acta quitarBebestible(@NotNull Long actaId, @NotNull Long bebestibleId) {
        Acta acta = buscarId(actaId);
        acta.getBebestiblesIds().remove(bebestibleId);
        return repo.save(acta);
    }

    // ─── Agregar DietaAlergia ─────────────────────────────────────────────────

    public Acta agregarDietaAlergia(@NotNull Long actaId, @NotNull Long dietaId) {
        Acta acta                 = buscarId(actaId);
        DietaAlergia dietaAlergia = dietaAlergiaService.buscarId(dietaId);
        if (acta.getDietasAlergias().contains(dietaAlergia))
            throw new RuntimeException("La dieta/alergia ya está asociada a esta acta");
        acta.getDietasAlergias().add(dietaAlergia);
        return repo.save(acta);
    }

    // ─── Quitar DietaAlergia ──────────────────────────────────────────────────

    public Acta quitarDietaAlergia(@NotNull Long actaId, @NotNull Long dietaId) {
        Acta acta                 = buscarId(actaId);
        DietaAlergia dietaAlergia = dietaAlergiaService.buscarId(dietaId);
        acta.getDietasAlergias().remove(dietaAlergia);
        return repo.save(acta);
    }

    // ─── Agregar Platillo ─────────────────────────────────────────────────────

    public Acta agregarPlatillo(@NotNull Long actaId, @NotNull Long platilloId) {
        Acta acta = buscarId(actaId);
        // Validar que exista en el microservicio externo
        clienteExterno.buscarPlatillo(platilloId);
        if (acta.getPlatillosIds().contains(platilloId))
            throw new RuntimeException("El platillo ya está asociado a esta acta");
        acta.getPlatillosIds().add(platilloId);
        return repo.save(acta);
    }

    // ─── Quitar Platillo ──────────────────────────────────────────────────────

    public Acta quitarPlatillo(@NotNull Long actaId, @NotNull Long platilloId) {
        Acta acta = buscarId(actaId);
        acta.getPlatillosIds().remove(platilloId);
        return repo.save(acta);
    }
}
