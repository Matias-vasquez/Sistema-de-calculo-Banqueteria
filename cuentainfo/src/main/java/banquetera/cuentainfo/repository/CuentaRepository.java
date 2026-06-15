package banquetera.cuentainfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.cuentainfo.model.Cuenta;

public interface CuentaRepository extends JpaRepository<Cuenta, Long>{

}
