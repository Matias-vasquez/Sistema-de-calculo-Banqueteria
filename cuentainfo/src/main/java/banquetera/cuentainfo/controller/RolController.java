package banquetera.cuentainfo.controller;

import banquetera.cuentainfo.model.Rol;
import banquetera.cuentainfo.service.RolService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private RolService service;

    @GetMapping
    public ResponseEntity<List<Rol>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    @PostMapping
    public ResponseEntity<Rol> guardar(@RequestBody @Valid Rol rol) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(rol));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizar(@PathVariable @NotNull Long id,
                                          @RequestBody @Valid Rol rol) {
        return ResponseEntity.ok(service.actualizar(id, rol));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
