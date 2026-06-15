package banquetera.cuentainfo.controller;

import banquetera.cuentainfo.model.Cuenta;
import banquetera.cuentainfo.service.CuentaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cuentas")
public class CuentaController {

    private CuentaService service;

    @GetMapping
    public ResponseEntity<List<Cuenta>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cuenta> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    @PostMapping
    public ResponseEntity<Cuenta> guardar(@RequestBody @Valid Cuenta cuenta) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(cuenta));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> actualizar(@PathVariable @NotNull Long id, @RequestBody @Valid Cuenta cuenta) {
        return ResponseEntity.ok(service.actualizar(id, cuenta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
