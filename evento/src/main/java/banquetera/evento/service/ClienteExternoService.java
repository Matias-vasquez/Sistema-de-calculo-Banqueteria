package banquetera.evento.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import banquetera.evento.dto.BebestibleDTO;
import banquetera.evento.dto.CuentaDTO;
import banquetera.evento.dto.PastelDTO;
import banquetera.evento.dto.PlatilloDTO;

@Service
public class ClienteExternoService {

    // ─── Completa estas URLs con las rutas reales de tus microservicios ───────
    private final WebClient clientePastel      = WebClient.create("http://localhost:8081"); // URL microservicio Pastel
    private final WebClient clienteBebestible  = WebClient.create("http://localhost:8081"); // URL microservicio Bebestible
    private final WebClient clientePlatillo    = WebClient.create("http://localhost:8081"); // URL microservicio Platillo
    private final WebClient clienteCuenta      = WebClient.create("http://localhost:8082"); // URL microservicio Cuenta

    // ─── Pastel ───────────────────────────────────────────────────────────────

    public PastelDTO buscarPastel(Long id) {
        return clientePastel
                .get()
                .uri("/api/pastel/{id}", id) // ruta del endpoint, ej: "/api/pasteles/{id}", id
                .retrieve()
                .onStatus(
                    status -> status.is4xxClientError(),
                    response -> { throw new RuntimeException("Pastel no encontrado con ID: " + id); }
                )
                .bodyToMono(PastelDTO.class)
                .block();
    }

    // ─── Bebestible ───────────────────────────────────────────────────────────

    public BebestibleDTO buscarBebestible(Long id) {
        return clienteBebestible
                .get()
                .uri("/api/bebestible/{id}", id) // ruta del endpoint, ej: "/api/bebestibles/{id}", id
                .retrieve()
                .onStatus(
                    status -> status.is4xxClientError(),
                    response -> { throw new RuntimeException("Bebestible no encontrado con ID: " + id); }
                )
                .bodyToMono(BebestibleDTO.class)
                .block();
    }

    // ─── Platillo ─────────────────────────────────────────────────────────────

    public PlatilloDTO buscarPlatillo(Long id) {
        return clientePlatillo
                .get()
                .uri("/api/platillo/{id}", id) // ruta del endpoint, ej: "/api/platillos/{id}", id
                .retrieve()
                .onStatus(
                    status -> status.is4xxClientError(),
                    response -> { throw new RuntimeException("Platillo no encontrado con ID: " + id); }
                )
                .bodyToMono(PlatilloDTO.class)
                .block();
    }

    // ─── Cuenta ───────────────────────────────────────────────────────────────

    public CuentaDTO buscarCuenta(Long id) {
        return clienteCuenta
                .get()
                .uri("/api/cuentas/{id}", id) // ruta del endpoint, ej: "/api/cuentas/{id}", id
                .retrieve()
                .onStatus(
                    status -> status.is4xxClientError(),
                    response -> { throw new RuntimeException("Cuenta no encontrada con ID: " + id); }
                )
                .bodyToMono(CuentaDTO.class)
                .block();
    }
}
