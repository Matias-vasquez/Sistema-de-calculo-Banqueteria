package banquetera.ingredientes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.ingredientes.model.Platillo;
import banquetera.ingredientes.repository.PlatilloRepository;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class PlatilloService {
    PlatilloRepository repo;

    public List<Platillo>listarTodo(){
        List<Platillo> ing = repo.findAll();
        return ing;
    }

    public Platillo buscarId(@NotEmpty Long id){
        Optional<Platillo> retorno = repo.findById(id);
        if(!retorno.isPresent()) throw new RuntimeException("Platillo no encontrado");
        return retorno.get();
    }

    public Platillo crear(@NotNull Platillo platillo){
        Platillo nuevoPlatillo = repo.save(platillo);
        return nuevoPlatillo;
    }  
    
    public Platillo actualizar(@NotEmpty Long id, Platillo platilloActualizado){
        Platillo platilloexistente = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Platillo no encontrado"));

        platilloexistente.setNombre(platilloActualizado.getNombre());
        platilloexistente.setDescripcion(platilloActualizado.getDescripcion());
        platilloexistente.setDieta(platilloActualizado.getDieta());
    
        return repo.save(platilloexistente);
    }

    public void eliminar(@NotEmpty Long id){
        if(!repo.existsById(id)) throw new RuntimeException("Platillo no encontrado");
        repo.deleteById(id);
    }
}
