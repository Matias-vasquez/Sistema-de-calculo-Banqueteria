package banquetera.ingredientes.model

@Entity
@Table(name="BEBESTIBLES")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Bebestible(){
  @Id
  @Column()
  private Long id;

  @Column()
  private String nombre;

  @Column()
  private String descripcion;

}
