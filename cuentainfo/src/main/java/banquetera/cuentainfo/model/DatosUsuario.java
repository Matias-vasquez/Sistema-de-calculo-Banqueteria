package banquetera.cuentainfo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "DATOS_USUARIO")
public class DatosUsuario {
    @Id
    @Column(name = "CUENTA_ID")
    private Long id;
 
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    @Column(name = "NOMBRE", nullable = false, length = 50)
    private String nombre;
 
    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede superar los 50 caracteres")
    @Column(name = "APELLIDO", nullable = false, length = 50)
    private String apellido;
 
    @NotBlank(message = "El teléfono es obligatorio")
    @Size(max = 8, message = "El teléfono no puede superar los 8 caracteres")
    @Pattern(regexp = "\\d{1,8}", message = "El teléfono solo debe contener dígitos")
    @Column(name = "TELEFONO", nullable = false, length = 8, unique = true)
    private String telefono;
 
    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 100, message = "La dirección no puede superar los 100 caracteres")
    @Column(name = "DIRECCION", nullable = false, length = 100)
    private String direccion;
 
    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    @Column(name = "FECHA_NACIMIENTO", nullable = false)
    private LocalDate fechaNacimiento;
 
    // ─── Relación: DATOS_USUARIO → CUENTA (OneToOne, PK compartida) ─────────
 
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId                                       // reutiliza el ID de CUENTA como PK propia
    @JoinColumn(
        name = "CUENTA_ID",
        foreignKey = @ForeignKey(name = "FK_DATOS_USUARIO_CUENTA")
    )
    private Cuenta cuenta;
}
