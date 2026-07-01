package banquetera.evento.model;
 
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ACTA")
public class Acta {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
 
    /**
     * 'S' = Sí, 'N' = No
     */
    @NotBlank(message = "La barra de alimentos es obligatoria")
    @Pattern(regexp = "[SN]", message = "La barra de alimentos debe ser 'S' o 'N'")
    @Column(name = "BARRA_ALIMENTOS", nullable = false, length = 1)
    private String barraAlimentos;
 
    @NotBlank(message = "La barra de alcohol es obligatoria")
    @Pattern(regexp = "[SN]", message = "La barra de alcohol debe ser 'S' o 'N'")
    @Column(name = "BARRA_ALCOHOL", nullable = false, length = 1)
    private String barraAlcohol;
 
    /**
     * 'B' = Buffet, 'P' = Plato servido
     */
    @NotBlank(message = "El formato de alimento es obligatorio")
    @Column(name = "FORMATO_ALIMENTO", nullable = false, length = 1)
    private String formatoAlimento;
 
    // ─── Tabla intermedia: ACTA_BEBESTIBLES ──────────────────────────────────
    // Guarda solo los IDs de bebestibles del microservicio externo
 
    @ElementCollection
    @CollectionTable(
        name = "ACTA_BEBESTIBLES",
        joinColumns = @JoinColumn(name = "ACTA_ID")
    )
    @Column(name = "BEBESTIBLES_ID")
    private Set<Long> bebestiblesIds = new HashSet<>();
 
    // ─── Tabla intermedia: ACTA_DIETA_ALERGIA ────────────────────────────────
    // DietaAlergia SÍ vive en este microservicio
 
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ACTA_DIETA_ALERGIA",
        joinColumns        = @JoinColumn(name = "ACTA_ID",            foreignKey = @ForeignKey(name = "FK_ADA_ACTA")),
        inverseJoinColumns = @JoinColumn(name = "DIETAS_ALERGIAS_ID", foreignKey = @ForeignKey(name = "FK_ADA_DIETA"))
    )
    private Set<DietaAlergia> dietasAlergias = new HashSet<>();
 
    // ─── Tabla intermedia: ACTA_PLATILLOS ────────────────────────────────────
    // Guarda solo los IDs de platillos del microservicio externo
 
    @ElementCollection
    @CollectionTable(
        name = "ACTA_PLATILLOS",
        joinColumns = @JoinColumn(name = "ACTA_ID")
    )
    @Column(name = "PLATILLOS_ID")
    private Set<Long> platillosIds = new HashSet<>();
}