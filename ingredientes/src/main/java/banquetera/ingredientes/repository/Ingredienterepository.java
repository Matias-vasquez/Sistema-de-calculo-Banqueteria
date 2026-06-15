package banquetera.ingredientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.ingredientes.model.Ingrediente;


public interface Ingredienterepository extends JpaRepository<Ingrediente,Long> {

}
