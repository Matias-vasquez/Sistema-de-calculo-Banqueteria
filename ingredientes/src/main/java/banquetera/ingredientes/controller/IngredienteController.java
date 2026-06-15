package banquetera.ingredientes.controller;

import java.util.List;

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

import banquetera.ingredientes.model.Ingrediente;
import banquetera.ingredientes.service.IngredienteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;




@RestController
@RequestMapping("api/ingrediente")
public class IngredienteController {
    IngredienteService serv;

    @GetMapping("all")
    public ResponseEntity<List<Ingrediente>> listarTodo() {
        return ResponseEntity.ok(serv.listarTodo());
    }
   
    @GetMapping("{id}")
    public ResponseEntity<Ingrediente> buscarXId(@PathVariable Long id) {
        return ResponseEntity.ok(serv.buscarId(id));
    }
    
    @PostMapping
    public ResponseEntity<Ingrediente> crear(@RequestBody @Valid Ingrediente ingrediente){
        return ResponseEntity.status(HttpStatus.CREATED).body(serv.crear(ingrediente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> actualizar(@PathVariable @NotEmpty Long id, @RequestBody @Valid Ingrediente ingredienteActualizado){
        return ResponseEntity.ok(serv.actualizar(id, ingredienteActualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotEmpty Long id){
        serv.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
