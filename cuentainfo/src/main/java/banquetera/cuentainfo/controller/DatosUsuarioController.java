package banquetera.cuentainfo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import banquetera.cuentainfo.model.DatosUsuario;
import banquetera.cuentainfo.service.DatosUsuarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/datos-usuario")
public class DatosUsuarioController {
    @Autowired
    private DatosUsuarioService service;

    // ─── GET /api/datos-usuario ──────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<DatosUsuario>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ─── GET /api/datos-usuario/{id} ─────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<DatosUsuario> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    // ─── POST /api/datos-usuario ─────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<DatosUsuario> guardar(@RequestBody @Valid DatosUsuario datosUsuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(datosUsuario));
    }

    // ─── PUT /api/datos-usuario/{id} ─────────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<DatosUsuario> actualizar(@PathVariable @NotNull Long id,
                                                   @RequestBody @Valid DatosUsuario datosUsuario) {
        return ResponseEntity.ok(service.actualizar(id, datosUsuario));
    }

    // ─── DELETE /api/datos-usuario/{id} ──────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
