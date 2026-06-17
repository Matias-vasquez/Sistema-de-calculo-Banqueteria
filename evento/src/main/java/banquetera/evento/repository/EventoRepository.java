package banquetera.evento.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.evento.model.Evento;


public interface EventoRepository extends JpaRepository<Evento, Long>{
    List<Evento> findByEstado(String estado);
}
