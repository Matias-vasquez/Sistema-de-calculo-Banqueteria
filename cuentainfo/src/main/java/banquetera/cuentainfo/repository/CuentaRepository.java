package banquetera.cuentainfo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.cuentainfo.model.Cuenta;

public interface CuentaRepository extends JpaRepository<Cuenta, Long>{
    
    List<Cuenta> findByEstado(String estado);
    
    Cuenta findByRol(int n);

    Cuenta findByEmail(String email);

}
