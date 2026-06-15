package banquetera.cuentainfo.model;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="CUENTA")
@Entity
public class Cuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
 
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    @Size(max = 150, message = "El email no puede superar los 150 caracteres")
    @Column(name = "EMAIL", nullable = false, length = 150, unique = true)
    private String email;
 
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(max = 200, message = "La contraseña no puede superar los 200 caracteres")
    @Column(name = "CONTRASENIA", nullable = false, length = 200)
    private String contrasenia;

    @Pattern(regexp = "[AI]", message = "El estado debe ser 'A' (Activo) o 'I' (Inactivo)")
    @Column(name = "ESTADO", length = 1)
    private String estado = "A";
 
    @NotNull(message = "La fecha de creación es obligatoria")
    @Column(name = "FECHA_CREACION", nullable = false)
    private LocalDateTime fechaCreacion;

    
    @NotNull(message = "El rol es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "ROL_ID",
        nullable = false,
        foreignKey = @ForeignKey(name = "FK_CUENTA_ROL")
    )
    private Rol rol;

    @OneToOne(
        mappedBy      = "cuenta",
        cascade       = CascadeType.ALL,
        fetch         = FetchType.LAZY,
        optional      = true
    )
    private DatosUsuario datosUsuario;
}
