package banquetera.ingredientes.model;

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

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="PASTEL")
@Entity
public class Pastel {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;
    
    @NotBlank(message = "El nombre del pastel es obligatorio")
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    @Column(name = "NOMBRE", nullable = false, length = 50)
    private String nombre;

    @Size(max = 200, message = "La descripcion no puede superar 200 caracteres")
    @Column(name = "descripcion", nullable = false, length = 200)
    private String descripcion;

    

}
