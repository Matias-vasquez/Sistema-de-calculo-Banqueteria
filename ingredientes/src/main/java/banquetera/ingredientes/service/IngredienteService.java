package banquetera.ingredientes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.ingredientes.model.Ingrediente;
import banquetera.ingredientes.repository.Ingredienterepository;

@Service
@Validated
public class IngredienteService {
    @Autowired
    Ingredienterepository repo;

    public List<Ingrediente>listarTodo(){
        return repo.findAll();
    }

    public Ingrediente buscarId( Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Id del ingrediente no encontrado"));
    }

    public Ingrediente crear( Ingrediente ingrediente){
        Ingrediente nuevoIngrediente = repo.save(ingrediente);
        return nuevoIngrediente;
    }  
    
    public Ingrediente actualizar( Long id, Ingrediente ingredienteActualizado){
        Ingrediente ingredienteExistente = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado"));

        ingredienteExistente.setNombre(ingredienteActualizado.getNombre());
        ingredienteExistente.setAlergia(ingredienteActualizado.getAlergia());
        ingredienteExistente.setValorK(ingredienteActualizado.getValorK());
    
        return repo.save(ingredienteExistente);
    }

    public void eliminar( Long id){
        if(!repo.existsById(id)) throw new RuntimeException("Ingrediente no encontrado");
        repo.deleteById(id);
    }
    
}
