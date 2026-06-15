package banquetera.ingredientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.ingredientes.model.Platillo;

public interface PlatilloRepository extends JpaRepository<Platillo, Long>{

}
