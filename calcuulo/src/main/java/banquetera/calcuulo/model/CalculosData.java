package banquetera.calcuulo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name= "CALCULOS")
@Entity
public class CalculosData {

    @Id
    @Column(unique = true)
    Long id;
    
    @Column(name = "CANT_CHEFS")
    int cantChefs;

    @Column(name = "LIQUIDO")
    int liquidoMinimo;

    @Column(name = "PORCION")
    int cantidadXplato;

}
