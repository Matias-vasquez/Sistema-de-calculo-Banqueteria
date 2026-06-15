package banquetera.cuentainfo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.cuentainfo.model.Rol;
import banquetera.cuentainfo.repository.RolRepository;
import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class RolService {

    private RolRepository repo;

    public List<Rol> listar() {
        return repo.findAll();
    }

    public Rol buscarId(@NotNull Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("No se encontro rol"));
    }

    public Rol crear(@NotNull Rol rol) {
        return repo.save(rol);
    }

    public Rol actualizar(@NotNull Long id, @NotNull Rol rolNuevo) {
        Rol rolExistente = buscarId(id);
        rolExistente.setNombre(rolNuevo.getNombre());
        rolExistente.setDescripcion(rolNuevo.getDescripcion());
        rolExistente.setAcciones(rolNuevo.getAcciones());
        rolExistente.setValorHora(rolNuevo.getValorHora());
        return repo.save(rolExistente);
    }

    public void eliminar(@NotNull Long id) {
        repo.delete(buscarId(id));
    }
}
