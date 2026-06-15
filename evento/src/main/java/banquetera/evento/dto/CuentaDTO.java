package banquetera.evento.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
/**
 * DTO que representa la respuesta del microservicio de Cuenta.
 * Solo contiene los campos necesarios para este contexto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CuentaDTO {
    private Long id;
    private String email;
    private String estado;
}