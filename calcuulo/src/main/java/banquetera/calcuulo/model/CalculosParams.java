package banquetera.calcuulo.model;

import java.beans.JavaBean;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Configuration
public class CalculosParams {
    
    int personaXchef = 20;

    double minimoXplato = 300;

    double minimoXliquido = 1000;


}
