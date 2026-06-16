package banquetera.ingredientes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banquetera.ingredientes.model.Platillo;
import banquetera.ingredientes.repository.PlatilloRepository;

@Service

public class PlatilloService {
    @Autowired
    PlatilloRepository repo;

    public List<Platillo>listarTodo(){
        List<Platillo> ing = repo.findAll();
        return ing;
    }

    public Platillo buscarId( Long id){
        Optional<Platillo> retorno = repo.findById(id);
        if(!retorno.isPresent()) throw new RuntimeException("Platillo no encontrado");
        return retorno.get();
    }

    public Platillo crear (Platillo platillo){
        Platillo nuevoPlatillo = repo.save(platillo);
        return nuevoPlatillo;
    }  
    
    public Platillo actualizar( Long id, Platillo platilloActualizado){
        Platillo platilloexistente = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Platillo no encontrado"));

        platilloexistente.setNombre(platilloActualizado.getNombre());
        platilloexistente.setDescripcion(platilloActualizado.getDescripcion());
        platilloexistente.setDieta(platilloActualizado.getDieta());
    
        return repo.save(platilloexistente);
    }

    public void eliminar( Long id){
        if(!repo.existsById(id)) throw new RuntimeException("Platillo no encontrado");
        repo.deleteById(id);
    }
}
