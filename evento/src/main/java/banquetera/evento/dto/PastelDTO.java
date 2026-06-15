package banquetera.evento.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
/**
 * DTO que representa la respuesta del microservicio de Pastel.
 * Solo contiene los campos necesarios para este contexto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PastelDTO {
    private Long id;
    private String nombre;
    private String descripcion;
}