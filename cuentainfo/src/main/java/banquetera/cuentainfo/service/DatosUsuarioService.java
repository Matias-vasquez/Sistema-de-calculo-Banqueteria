package banquetera.cuentainfo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.cuentainfo.model.Cuenta;
import banquetera.cuentainfo.model.DatosUsuario;
import banquetera.cuentainfo.repository.DatosUsuarioRepository;
import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class DatosUsuarioService {
    @Autowired
    private DatosUsuarioRepository repo;
    @Autowired
    private CuentaService cuentaService;

    public List<DatosUsuario> listar() {
        return repo.findAll();
    }

    public DatosUsuario buscarId(@NotNull Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Datos de usuario no encontrados"));
    }

    public DatosUsuario crear(@NotNull DatosUsuario datosUsuario) {

        Cuenta cuenta = cuentaService.buscarId(datosUsuario.getCuenta().getId());

        if (repo.existsById(cuenta.getId()))
            throw new RuntimeException("La cuenta ya tiene datos de usuario registrados");

        if (datosUsuario.getNombre() == null || datosUsuario.getNombre().isBlank())
            throw new RuntimeException("El nombre es obligatorio");
        if (datosUsuario.getApellido() == null || datosUsuario.getApellido().isBlank())
            throw new RuntimeException("El apellido es obligatorio");
        if (datosUsuario.getTelefono() == null || datosUsuario.getTelefono().isBlank())
            throw new RuntimeException("El teléfono es obligatorio");
        if (datosUsuario.getDireccion() == null || datosUsuario.getDireccion().isBlank())
            throw new RuntimeException("La dirección es obligatoria");
        if (datosUsuario.getFechaNacimiento() == null)
            throw new RuntimeException("La fecha de nacimiento es obligatoria");

        datosUsuario.setCuenta(cuenta);
        return repo.save(datosUsuario);
    }

    public DatosUsuario actualizar(@NotNull Long id, @NotNull DatosUsuario datosNuevos) {
        DatosUsuario datosExistentes = buscarId(id);

        datosExistentes.setNombre(datosNuevos.getNombre());
        datosExistentes.setApellido(datosNuevos.getApellido());
        datosExistentes.setTelefono(datosNuevos.getTelefono());
        datosExistentes.setDireccion(datosNuevos.getDireccion());
        datosExistentes.setFechaNacimiento(datosNuevos.getFechaNacimiento());

        return repo.save(datosExistentes);
    }

    public void eliminar(@NotNull Long id) {
        repo.delete(buscarId(id));
    }
}
