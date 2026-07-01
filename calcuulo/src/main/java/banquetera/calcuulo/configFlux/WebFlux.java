package banquetera.calcuulo.configFlux;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import banquetera.calcuulo.model.EventoDTO;

@Configuration
public class WebFlux {
    private final WebClient evento = WebClient.create("http://localhost:8083");

    public EventoDTO buscarEvento(Long id){
        return evento
            .get()
            .uri("/api/eventos/{id}", id)
            .retrieve()
            .onStatus(
                    status -> status.is4xxClientError(),
                    response -> { throw new RuntimeException("Evento no encontrado con id: " + id); }
                )
            .bodyToMono(EventoDTO.class)
            .block();
    }
}
