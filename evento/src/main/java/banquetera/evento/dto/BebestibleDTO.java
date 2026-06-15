package banquetera.evento.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
/**
 * DTO que representa la respuesta del microservicio de Bebestible.
 * Solo contiene los campos necesarios para este contexto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BebestibleDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String alcoholica;
}
