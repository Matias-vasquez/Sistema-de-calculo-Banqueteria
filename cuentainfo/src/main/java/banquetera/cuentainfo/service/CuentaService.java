package banquetera.cuentainfo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.cuentainfo.model.Cuenta;
import banquetera.cuentainfo.repository.CuentaRepository;
import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class CuentaService {

    private CuentaRepository repo;

    private RolService rolService;

    public List<Cuenta> listar() {
        return repo.findAll();
    }

    public Cuenta buscarId(@NotNull Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
    }

    public Cuenta crear(@NotNull Cuenta cuenta) {
        rolService.buscarId(cuenta.getRol().getId());

        if (cuenta.getFechaCreacion() == null)
            cuenta.setFechaCreacion(LocalDateTime.now());

        return repo.save(cuenta);
    }


    public Cuenta actualizar(@NotNull Long id, @NotNull Cuenta cuentaNueva) {
        Cuenta cuentaExistente = buscarId(id);

        if (cuentaNueva.getRol() != null)
            rolService.buscarId(cuentaNueva.getRol().getId()); 
        cuentaExistente.setEmail(cuentaNueva.getEmail());
        cuentaExistente.setContrasenia(cuentaNueva.getContrasenia());
        cuentaExistente.setEstado(cuentaNueva.getEstado());
        cuentaExistente.setRol(cuentaNueva.getRol());

        return repo.save(cuentaExistente);
    }

    public void eliminar(@NotNull Long id) {
        repo.delete(buscarId(id));
    }
}
