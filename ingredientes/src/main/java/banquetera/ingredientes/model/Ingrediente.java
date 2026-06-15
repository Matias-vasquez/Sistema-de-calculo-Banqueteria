package banquetera.ingredientes.model;

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
@Table(name="INGREDIENTE")
@Entity
public class Ingrediente {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;
    
    @NotBlank(message = "El nombre del ingrediente es obligatorio")
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    @Column(name = "NOMBRE", nullable = false, length = 50)
    private String nombre;

    @NotBlank(message = "El campo alergia es obligatorio")
    @Size(max = 2, message = "El código de alergia no puede superar 2 caracteres")
    @Column(name = "ALERGIA", nullable = false, length = 2)
    private String alergia;

    @NotNull(message = "El valor calórico es obligatorio")
    @Min(value = 0, message = "El valor calórico no puede ser negativo")
    @Column(name = "VALOR_K", nullable = false)
    private Integer valorK;

}


