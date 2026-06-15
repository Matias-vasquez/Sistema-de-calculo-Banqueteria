package banquetera.evento.controller

import banquetera.evento.model.DietaAlergia;
import com.banqueteria.service.DietaAlergiaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dietas-alergias")
public class DietaAlergiaController {

    @Autowired
    private DietaAlergiaService service;

    // ─── GET /api/dietas-alergias ────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<DietaAlergia>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ─── GET /api/dietas-alergias/{id} ──────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<DietaAlergia> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    // ─── POST /api/dietas-alergias ───────────────────────────────────────────

    @PostMapping
    public ResponseEntity<DietaAlergia> crear(@RequestBody @Valid DietaAlergia dietaAlergia) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dietaAlergia));
    }

    // ─── PUT /api/dietas-alergias/{id} ──────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<DietaAlergia> actualizar(@PathVariable @NotNull Long id,
                                                   @RequestBody @Valid DietaAlergia dietaAlergia) {
        return ResponseEntity.ok(service.actualizar(id, dietaAlergia));
    }

    // ─── DELETE /api/dietas-alergias/{id} ───────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
