package banquetera.ingredientes.controller;

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

import banquetera.ingredientes.model.Pastel;
import banquetera.ingredientes.service.PastelService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("api/pastel")
public class PastelController {
    @Autowired
    PastelService serv;

    @GetMapping
    public ResponseEntity<List<Pastel>> listarTodo() {
        return ResponseEntity.ok(serv.listarTodo());
    }
   
    @GetMapping("{id}")
    public ResponseEntity<Pastel> buscarXId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(serv.buscarId(id));
    }
    
    @PostMapping
    public ResponseEntity<Pastel> crear(@RequestBody @Valid Pastel pastel){
        return ResponseEntity.status(HttpStatus.CREATED).body(serv.crear(pastel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pastel> actualizar(@PathVariable @NotNull Long id, @RequestBody @Valid Pastel pastelactualizado){
        return ResponseEntity.ok(serv.actualizar(id, pastelactualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id){
        serv.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}
