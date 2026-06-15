package banquetera.cuentainfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.cuentainfo.model.DatosUsuario;

public interface DatosUsuarioRepository extends JpaRepository<DatosUsuario, Long>{

}
