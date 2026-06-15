package banquetera.ingredientes.model

@Entity
@Table(name="BEBESTIBLES")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Bebestible(){
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "ID", nullable = false)
  private Long id;

  @NotBlank(message = "El nombre del ingrediente es obligatorio")
  @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
  @Column(name = "NOMBRE", nullable = false, lenght = 50)
  private String nombre;

  @Size(max = 200, message = "El nombre no puede superar los 200 caracteres")
  @Column(name = "DESCRIPCION", nullable = true, lenght = 200)
  private String descripcion;

}
