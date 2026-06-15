package banquetera.evento.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "DIETAS_ALERGIAS")
public class DietaAlergia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    @Column(name = "NOMBRE", nullable = false, length = 50)
    private String nombre;

    /**
     * Tipo: 'D' = Dieta, 'A' = Alergia
     * Se almacena como VARCHAR(2)
     */
    @NotBlank(message = "El tipo es obligatorio")
    @Size(max = 2, message = "El tipo no puede superar los 2 caracteres")
    @Column(name = "TIPO", nullable = false, length = 2)
    private String tipo;
}