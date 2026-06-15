package banquetera.evento.controller;

import com.banqueteria.model.Evento;
import com.banqueteria.service.EventoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService service;

    // ─── GET /api/eventos ────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<Evento>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ─── GET /api/eventos/{id} ───────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    // ─── POST /api/eventos ───────────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<Evento> crear(@RequestBody @Valid Evento evento) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(evento));
    }

    // ─── PUT /api/eventos/{id} ───────────────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizar(@PathVariable @NotNull Long id,
                                             @RequestBody @Valid Evento evento) {
        return ResponseEntity.ok(service.actualizar(id, evento));
    }

    // ─── DELETE /api/eventos/{id} ────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ─── POST /api/eventos/{id}/cuentas/{cuentaId} ───────────────────────────

    @PostMapping("/{id}/cuentas/{cuentaId}")
    public ResponseEntity<Evento> agregarCuenta(@PathVariable @NotNull Long id,
                                                @PathVariable @NotNull Long cuentaId) {
        return ResponseEntity.ok(service.agregarCuenta(id, cuentaId));
    }

    // ─── DELETE /api/eventos/{id}/cuentas/{cuentaId} ─────────────────────────

    @DeleteMapping("/{id}/cuentas/{cuentaId}")
    public ResponseEntity<Evento> quitarCuenta(@PathVariable @NotNull Long id,
                                               @PathVariable @NotNull Long cuentaId) {
        return ResponseEntity.ok(service.quitarCuenta(id, cuentaId));
    }
}
