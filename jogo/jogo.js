import {Engine} from "./basicas.js"
import { SalaAutopsia, Corredor, SalaExame, Vestiario, SalaAdministrativa, SalaChefia} from "./salas.js";

export class jogoPronto extends Engine{
    constructor(){
        super();
    }

    criaCenario(){
        //Define quais salas existem.
        let sala_de_autopsia = new SalaAutopsia(this);
        let corredor = new Corredor(this);
        let sala_de_exames = new SalaExame(this);
        let vestiario = new Vestiario(this);
        let sala_administrativa = new SalaAdministrativa(this);
        let sala_chefia = new SalaChefia(this);

        //Cria a ligação entre as salas.
        sala_de_autopsia.portas.set(corredor.nome, corredor);
        corredor.portas.set(sala_de_autopsia.nome, sala_de_autopsia);
        corredor.portas.set(sala_de_exames.nome, sala_de_exames);
        corredor.portas.set(vestiario.nome, vestiario);
        corredor.portas.set(sala_administrativa.nome, sala_administrativa);
        sala_de_exames.portas.set(corredor.nome, corredor);
        vestiario.portas.set(corredor.nome, corredor);
        sala_administrativa.portas.set(corredor.nome, corredor);
        sala_administrativa.portas.set(sala_chefia.nome, sala_chefia);
        sala_chefia.portas.set(sala_administrativa.nome, sala_administrativa);

        //Local de início de jogo.
        this.salaCorrente = sala_de_autopsia;
    }
}