package banquetera.evento.controller;

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

import banquetera.evento.model.DietaAlergia;
import banquetera.evento.service.DietaAlergiaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/dietas-alergias")
public class DietaAlergiaController {
    @Autowired
    private DietaAlergiaService service;

    @GetMapping
    public ResponseEntity<List<DietaAlergia>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DietaAlergia> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    @PostMapping
    public ResponseEntity<DietaAlergia> crear(@RequestBody @Valid DietaAlergia dietaAlergia) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dietaAlergia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DietaAlergia> actualizar(@PathVariable @NotNull Long id,
                                                   @RequestBody @Valid DietaAlergia dietaAlergia) {
        return ResponseEntity.ok(service.actualizar(id, dietaAlergia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
