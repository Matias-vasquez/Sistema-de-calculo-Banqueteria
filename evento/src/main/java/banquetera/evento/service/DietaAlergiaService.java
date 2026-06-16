package banquetera.evento.service;

import banquetera.evento.model.DietaAlergia;
import banquetera.evento.repository.DietaAlergiaRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DietaAlergiaService {

    @Autowired
    private DietaAlergiaRepository repo;

    // ─── Listar todos ────────────────────────────────────────────────────────

    public List<DietaAlergia> listar() {
        return repo.findAll();
    }

    // ─── Buscar por ID ───────────────────────────────────────────────────────

    public DietaAlergia buscarId(@NotNull Long id) {
        Optional<DietaAlergia> retorno = repo.findById(id);
        if (!retorno.isPresent()) throw new RuntimeException("Dieta/Alergia no encontrada");
        return retorno.get();
    }

    // ─── Crear ───────────────────────────────────────────────────────────────

    public DietaAlergia crear(@NotNull DietaAlergia dietaAlergia) {
        return repo.save(dietaAlergia);
    }

    // ─── Actualizar ──────────────────────────────────────────────────────────

    public DietaAlergia actualizar(@NotNull Long id, @NotNull DietaAlergia dietaNueva) {
        DietaAlergia dietaExistente = buscarId(id);
        dietaExistente.setNombre(dietaNueva.getNombre());
        dietaExistente.setTipo(dietaNueva.getTipo());
        return repo.save(dietaExistente);
    }

    // ─── Eliminar ────────────────────────────────────────────────────────────

    public void eliminar(@NotNull Long id) {
        DietaAlergia dietaAlergia = buscarId(id);
        repo.delete(dietaAlergia);
    }
}
