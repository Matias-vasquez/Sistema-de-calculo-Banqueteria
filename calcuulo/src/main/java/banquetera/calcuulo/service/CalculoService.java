package banquetera.calcuulo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banquetera.calcuulo.configFlux.WebFlux;
import banquetera.calcuulo.model.ActaDTO;
import banquetera.calcuulo.model.CalculosData;
import banquetera.calcuulo.model.CalculosParams;
import banquetera.calcuulo.model.EventoDTO;
import banquetera.calcuulo.repository.CalculosRepository;

@Service
public class CalculoService {

    @Autowired
    CalculosParams cp;

    @Autowired
    CalculosRepository repo;

    @Autowired
    WebFlux wf;

    public CalculosData generarCalculos(Long idevento){
    
        CalculosData cd = new CalculosData();

        EventoDTO ev = wf.buscarEvento(idevento);
        //El id sera el de el evento
        cd.setId(idevento);

        //cantidad de chefs por persona
        cd.setCantChefs(Math.round(ev.getCantidadInvitados() / cp.getPersonaXchef()));

        //cantidad minima de bebestibles
        if(ev.getTipoEspacio().equalsIgnoreCase("A")){
            cd.setLiquidoMinimo(Math.toIntExact(Math.round(ev.getCantidadInvitados() * (cp.getMinimoXliquido()*1.5))));
        }
        else {
            cd.setLiquidoMinimo(Math.toIntExact(Math.round(ev.getCantidadInvitados() * cp.getMinimoXliquido())));
        }
        //cantidad de producto por platillo
        cd.setCantidadXplato(Math.toIntExact(Math.round(cp.getMinimoXplato() * ev.getCantidadInvitados())));

        repo.save(cd);
        return cd;
        
    }

    public CalculosParams modificarCalculos(CalculosParams newCp){

        cp.setPersonaXchef(newCp.getPersonaXchef());
        cp.setMinimoXplato(newCp.getMinimoXplato());
        cp.setMinimoXliquido(newCp.getMinimoXliquido());

        return cp;
    }

    public List<CalculosData> listarTodo() {
        return repo.findAll();

    }


}
