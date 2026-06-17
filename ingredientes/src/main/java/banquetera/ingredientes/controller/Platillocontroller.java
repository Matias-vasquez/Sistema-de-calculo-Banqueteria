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

import banquetera.ingredientes.model.Platillo;
import banquetera.ingredientes.service.PlatilloService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;


@RestController
@RequestMapping("api/platillo")
public class Platillocontroller {
    @Autowired
    PlatilloService serv;

    @GetMapping
    public ResponseEntity<List<Platillo>> listarTodo() {
        return ResponseEntity.ok(serv.listarTodo());
    }
   
    @GetMapping("{id}")
    public ResponseEntity<Platillo> buscarXId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(serv.buscarId(id));
    }
    
    @PostMapping
    public ResponseEntity<Platillo> crear(@RequestBody @Valid Platillo platillo){
        return ResponseEntity.status(HttpStatus.CREATED).body(serv.crear(platillo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Platillo> actualizar(@PathVariable @NotNull Long id, @RequestBody @Valid Platillo platilloActualizado){
        return ResponseEntity.ok(serv.actualizar(id, platilloActualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable @NotNull Long id){
        serv.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
