package banquetera.cuentainfo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="ROL")
@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
 
    @NotBlank(message = "El nombre del rol es obligatorio")
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    @Column(name = "NOMBRE", nullable = false, length = 50)
    private String nombre;
 
    @Size(max = 100, message = "La descripción no puede superar los 100 caracteres")
    @Column(name = "DESCRIPCION", length = 100)
    private String descripcion;
 
    @NotBlank(message = "Las acciones son obligatorias")
    @Column(name = "ACCIONES", nullable = false, columnDefinition = "TEXT")
    private String acciones;
 
    @NotNull(message = "El valor por hora es obligatorio")
    @Min(value = 0, message = "El valor por hora no puede ser negativo")
    @Column(name = "VALOR_HORA", nullable = false)
    private Integer valorHora;
}
