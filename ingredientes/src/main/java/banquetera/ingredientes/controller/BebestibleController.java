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

import banquetera.ingredientes.model.Bebestible;
import banquetera.ingredientes.service.BebestibleService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("api/bebestible")
public class BebestibleController {
    @Autowired
    BebestibleService serv;

    @GetMapping("all")
    public ResponseEntity<List<Bebestible>> listarTodo() {
        return ResponseEntity.ok(serv.listarTodo());
    }
   
    @GetMapping("{id}")
    public ResponseEntity<Bebestible> buscarXId( @PathVariable @NotNull Long id) {
        return ResponseEntity.ok(serv.buscarId(id));
    }
    
    @PostMapping
    public ResponseEntity<Bebestible> crear(@RequestBody @Valid Bebestible bebestible){
        return ResponseEntity.status(HttpStatus.CREATED).body(serv.crear(bebestible));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bebestible> actualizar(@PathVariable @NotNull Long id, @RequestBody @Valid Bebestible bebestibleActualizado){
        return ResponseEntity.ok(serv.actualizar(id, bebestibleActualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id){
        serv.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
