package banquetera.calcuulo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import banquetera.calcuulo.model.CalculosData;
import banquetera.calcuulo.model.CalculosParams;
import banquetera.calcuulo.service.CalculoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/calculos")
public class CalculosController {

    @Autowired
    CalculoService serv;

    @GetMapping("")
    public ResponseEntity<List<CalculosData>> generarCalculos() {
        return ResponseEntity.ok(serv.listarTodo());
    }

    @GetMapping("generar/{id}")
    public ResponseEntity<CalculosData> getMethodName(@PathVariable Long id) {
        return ResponseEntity.ok(serv.generarCalculos(id));
    }

    @PostMapping("modificar")
    public ResponseEntity<CalculosParams> postMethodName(@RequestBody CalculosParams cp) {
        
        return ResponseEntity.ok(serv.modificarCalculos(cp));
    }
        

}
