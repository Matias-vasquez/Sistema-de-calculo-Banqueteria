package banquetera.evento.model;
 
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "EVENTO")
public class Evento {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
 
    @NotBlank(message = "El tipo de evento es obligatorio")
    @Size(max = 50, message = "El tipo de evento no puede superar los 50 caracteres")
    @Column(name = "TIPO_EVENTO", nullable = false, length = 50)
    private String tipoEvento;
 
    @NotNull(message = "La fecha de inicio del evento es obligatoria")
    @Column(name = "FECHA_EVENTO", nullable = false)
    private LocalDate fechaEvento;
 
    @NotNull(message = "La fecha de término del evento es obligatoria")
    @Column(name = "TERMINO_EVENTO", nullable = false)
    private LocalDate terminoEvento;
 
    /**
     * 'I' = Interior, 'E' = Exterior
     */
    @Column(name = "TIPO_ESPACIO", length = 1)
    private String tipoEspacio;
 
    @NotNull(message = "La cantidad de invitados es obligatoria")
    @Min(value = 1, message = "Debe haber al menos 1 invitado")
    @Column(name = "CANTIDAD_INVITADOS", nullable = false)
    private Integer cantidadInvitados;
 
    @NotNull(message = "La fecha de cotización es obligatoria")
    @Column(name = "FECHA_COTIZACION", nullable = false)
    private LocalDateTime fechaCotizacion;
 
    /**
     * 'A' = Activo, 'P' = Pendiente, 'R' = Realizado, 'C' = Cancelado
     */
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "[APRC]", message = "El estado debe ser 'A', 'P', 'R' o 'C'")
    @Column(name = "ESTADO", nullable = false, length = 1)
    private String estado;
 
    // ─── Relación: EVENTO → ACTA (OneToOne, vive en este microservicio) ──────
 
    @NotNull(message = "El acta es obligatoria")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "ACTA_ID",
        nullable = false,
        unique = true,
        foreignKey = @ForeignKey(name = "FK_EVENTO_ACTA")
    )
    private Acta acta;
 
    // ─── Tabla intermedia: CUENTA_EVENTO ─────────────────────────────────────
    // Guarda solo los IDs de cuentas del microservicio externo
 
    @ElementCollection
    @CollectionTable(
        name = "CUENTA_EVENTO",
        joinColumns = @JoinColumn(name = "EVENTO_ID")
    )
    @Column(name = "CUENTA_ID")
    private Set<Long> cuentasIds = new HashSet<>();
}