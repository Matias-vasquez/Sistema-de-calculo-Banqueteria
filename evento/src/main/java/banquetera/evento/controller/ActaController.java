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

import banquetera.evento.model.Acta;
import banquetera.evento.service.ActaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/actas")
public class ActaController {

    @Autowired
    private ActaService service;

    // ─── GET /api/actas ──────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<Acta>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ─── GET /api/actas/{id} ─────────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<Acta> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    // ─── POST /api/actas ─────────────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<Acta> crear(@RequestBody @Valid Acta acta) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(acta));
    }

    // ─── PUT /api/actas/{id} ─────────────────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<Acta> actualizar(@PathVariable @NotNull Long id,
                                           @RequestBody @Valid Acta acta) {
        return ResponseEntity.ok(service.actualizar(id, acta));
    }

    // ─── DELETE /api/actas/{id} ──────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ─── POST /api/actas/{id}/bebestibles/{bebestibleId} ─────────────────────

    @PostMapping("/{id}/bebestibles/{bebestibleId}")
    public ResponseEntity<Acta> agregarBebestible(@PathVariable @NotNull Long id,
                                                  @PathVariable @NotNull Long bebestibleId) {
        return ResponseEntity.ok(service.agregarBebestible(id, bebestibleId));
    }

    // ─── DELETE /api/actas/{id}/bebestibles/{bebestibleId} ───────────────────

    @DeleteMapping("/{id}/bebestibles/{bebestibleId}")
    public ResponseEntity<Acta> quitarBebestible(@PathVariable @NotNull Long id,
                                                 @PathVariable @NotNull Long bebestibleId) {
        return ResponseEntity.ok(service.quitarBebestible(id, bebestibleId));
    }

    // ─── POST /api/actas/{id}/dietas-alergias/{dietaId} ──────────────────────

    @PostMapping("/{id}/dietas-alergias/{dietaId}")
    public ResponseEntity<Acta> agregarDietaAlergia(@PathVariable @NotNull Long id,
                                                    @PathVariable @NotNull Long dietaId) {
        return ResponseEntity.ok(service.agregarDietaAlergia(id, dietaId));
    }

    // ─── DELETE /api/actas/{id}/dietas-alergias/{dietaId} ────────────────────

    @DeleteMapping("/{id}/dietas-alergias/{dietaId}")
    public ResponseEntity<Acta> quitarDietaAlergia(@PathVariable @NotNull Long id,
                                                   @PathVariable @NotNull Long dietaId) {
        return ResponseEntity.ok(service.quitarDietaAlergia(id, dietaId));
    }

    // ─── POST /api/actas/{id}/platillos/{platilloId} ─────────────────────────

    @PostMapping("/{id}/platillos/{platilloId}")
    public ResponseEntity<Acta> agregarPlatillo(@PathVariable @NotNull Long id,
                                                @PathVariable @NotNull Long platilloId) {
        return ResponseEntity.ok(service.agregarPlatillo(id, platilloId));
    }

    // ─── DELETE /api/actas/{id}/platillos/{platilloId} ───────────────────────

    @DeleteMapping("/{id}/platillos/{platilloId}")
    public ResponseEntity<Acta> quitarPlatillo(@PathVariable @NotNull Long id, @PathVariable @NotNull Long platilloId) {
        return ResponseEntity.ok(service.quitarPlatillo(id, platilloId));
    }
}
