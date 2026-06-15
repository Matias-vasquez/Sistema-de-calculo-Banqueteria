package banquetera.evento.service;

import banquetera.evento.model.*;
import banquetera.evento.repository.ActaRepository;
import jakarta.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ActaService {

    private ActaRepository repo;

    private DietaAlergiaService dietaAlergiaService;


    // ─── Listar todos ────────────────────────────────────────────────────────

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
        // Validar que el pastel exista
        if (acta.getPastel() == null)
            throw new RuntimeException("El pastel es obligatorio");
        pastelService.buscarId(acta.getPastel().getId());

        return repo.save(acta);
    }

    // ─── Actualizar ──────────────────────────────────────────────────────────

    public Acta actualizar(@NotNull Long id, @NotNull Acta actaNueva) {
        Acta actaExistente = buscarId(id);

        if (actaNueva.getPastel() != null)
            pastelService.buscarId(actaNueva.getPastel().getId());

        actaExistente.setBarraAlimentos(actaNueva.getBarraAlimentos());
        actaExistente.setBarraAlcohol(actaNueva.getBarraAlcohol());
        actaExistente.setFormatoAlimento(actaNueva.getFormatoAlimento());
        actaExistente.setPastel(actaNueva.getPastel());

        return repo.save(actaExistente);
    }

    // ─── Eliminar ────────────────────────────────────────────────────────────

    public void eliminar(@NotNull Long id) {
        Acta acta = buscarId(id);
        repo.delete(acta);
    }

    // ─── Agregar Bebestible ──────────────────────────────────────────────────

    public Acta agregarBebestible(@NotNull Long actaId, @NotNull Long bebestibleId) {
        Acta acta             = buscarId(actaId);
        Bebestible bebestible = bebestibleService.buscarId(bebestibleId);
        acta.getBebestibles().add(bebestible);
        return repo.save(acta);
    }

    // ─── Quitar Bebestible ───────────────────────────────────────────────────

    public Acta quitarBebestible(@NotNull Long actaId, @NotNull Long bebestibleId) {
        Acta acta             = buscarId(actaId);
        Bebestible bebestible = bebestibleService.buscarId(bebestibleId);
        acta.getBebestibles().remove(bebestible);
        return repo.save(acta);
    }

    // ─── Agregar DietaAlergia ────────────────────────────────────────────────

    public Acta agregarDietaAlergia(@NotNull Long actaId, @NotNull Long dietaId) {
        Acta acta               = buscarId(actaId);
        DietaAlergia dietaAlergia = dietaAlergiaService.buscarId(dietaId);
        acta.getDietasAlergias().add(dietaAlergia);
        return repo.save(acta);
    }

    // ─── Quitar DietaAlergia ─────────────────────────────────────────────────

    public Acta quitarDietaAlergia(@NotNull Long actaId, @NotNull Long dietaId) {
        Acta acta               = buscarId(actaId);
        DietaAlergia dietaAlergia = dietaAlergiaService.buscarId(dietaId);
        acta.getDietasAlergias().remove(dietaAlergia);
        return repo.save(acta);
    }

    // ─── Agregar Platillo ────────────────────────────────────────────────────

    public Acta agregarPlatillo(@NotNull Long actaId, @NotNull Long platilloId) {
        Acta acta       = buscarId(actaId);
        Platillo platillo = platilloService.buscarId(platilloId);
        acta.getPlatillos().add(platillo);
        return repo.save(acta);
    }

    // ─── Quitar Platillo ─────────────────────────────────────────────────────

    public Acta quitarPlatillo(@NotNull Long actaId, @NotNull Long platilloId) {
        Acta acta       = buscarId(actaId);
        Platillo platillo = platilloService.buscarId(platilloId);
        acta.getPlatillos().remove(platillo);
        return repo.save(acta);
    }
}
