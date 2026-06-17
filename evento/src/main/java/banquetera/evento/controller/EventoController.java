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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import banquetera.evento.model.Evento;
import banquetera.evento.service.EventoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {
    @Autowired
    private EventoService service;

    @GetMapping
    public ResponseEntity<List<Evento>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(service.buscarId(id));
    }

    @GetMapping("/estado")
    public ResponseEntity<List<Evento>> buscarEstado(@RequestParam @NotBlank String estado) {
        return ResponseEntity.ok(service.buscarEstado(estado));
    }

    @GetMapping("/nombre")
    public ResponseEntity<Evento> buscarNombre(@RequestParam @NotBlank String nombre) {
        return ResponseEntity.ok(service.buscarNombre(nombre));
    }
    
    @PostMapping
    public ResponseEntity<Evento> crear(@RequestBody @Valid Evento evento) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(evento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizar(@PathVariable @NotNull Long id,
                                             @RequestBody @Valid Evento evento) {
        return ResponseEntity.ok(service.actualizar(id, evento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/{id}/cuentas/{cuentaId}")
    public ResponseEntity<Evento> agregarCuenta(@PathVariable @NotNull Long id,
                                                @PathVariable @NotNull Long cuentaId) {
        return ResponseEntity.ok(service.agregarCuenta(id, cuentaId));
    }

    @DeleteMapping("/{id}/cuentas/{cuentaId}")
    public ResponseEntity<Evento> quitarCuenta(@PathVariable @NotNull Long id,
                                               @PathVariable @NotNull Long cuentaId) {
        return ResponseEntity.ok(service.quitarCuenta(id, cuentaId));
    }
}
