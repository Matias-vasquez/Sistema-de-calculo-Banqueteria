package banquetera.ingredientes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.ingredientes.model.Pastel;
import banquetera.ingredientes.repository.PastelRepository;

@Service
@Validated
public class PastelService {
    @Autowired
    PastelRepository repo;

    public List<Pastel>listarTodo(){
        List<Pastel> ing = repo.findAll();
        return ing;
    }

    public Pastel buscarId( Long id){
        Optional<Pastel> retorno = repo.findById(id);
        if(!retorno.isPresent()) throw new RuntimeException("Pastel no encontrado");
        return retorno.get();
    }

    public Pastel crear( Pastel pastel){
        Pastel nuevoPastel = repo.save(pastel);
        return nuevoPastel;
    }  
    
    public Pastel actualizar( Long id, Pastel pastelActualizado){
        Pastel pastelExistente = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Pastel no encontrado"));

        pastelExistente.setNombre(pastelActualizado.getNombre());
        pastelExistente.setDescripcion(pastelActualizado.getDescripcion());
    
        return repo.save(pastelExistente);
    }

    public void eliminar( Long id){
        if(!repo.existsById(id)) throw new RuntimeException("Pastel no encontrado");
        repo.deleteById(id);
    }
}
