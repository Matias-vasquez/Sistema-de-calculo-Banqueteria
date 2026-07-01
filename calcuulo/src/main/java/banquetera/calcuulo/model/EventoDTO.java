package banquetera.calcuulo.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class EventoDTO {
    private Long id;
 
    private String tipoEvento;
 
    private LocalDate fechaEvento;
 
    private LocalDate terminoEvento;
 
    private String tipoEspacio;
 
    private Integer cantidadInvitados;
 
    private LocalDateTime fechaCotizacion;
 
    private String estado;
 
    private ActaDTO acta;

    private Set<Long> cuentasIds = new HashSet<>();
}
