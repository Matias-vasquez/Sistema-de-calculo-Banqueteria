package banquetera.ingredientes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import banquetera.ingredientes.model.Bebestible;
import banquetera.ingredientes.repository.BebestibleRepository;

@Service
@Validated
public class BebestibleService {
    @Autowired
    BebestibleRepository repo;

    public List<Bebestible> listarTodo(){
        return repo.findAll();
    }

    public Bebestible buscarId( Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("No se encontro un bebestible con esa id"));
    }

    public Bebestible crear( Bebestible bebestible){
        return repo.save(bebestible);
    }

    public Bebestible actualizar( Long id, Bebestible bebestibleActualizado){
        Bebestible bebestible = buscarId(id);

        bebestible.setNombre(bebestibleActualizado.getNombre());
        bebestible.setDescripcion(bebestibleActualizado.getDescripcion());

        return repo.save(bebestible);
    }

    public void eliminar( Long id){
        if(!repo.existsById(id)) throw new RuntimeException("Ingrediente no encontrado");
        repo.deleteById(id);
    }
}
