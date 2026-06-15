package banquetera.evento.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import banquetera.evento.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long>{

}
