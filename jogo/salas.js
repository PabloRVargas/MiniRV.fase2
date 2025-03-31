import { validate } from "bycontract";
import { Sala, Engine, Ferramenta, Objeto } from "./basicas.js";
import { Celular, Serra, Isqueiro } from "./ferramentas.js";
import { Prontuario, Bilhete, Pote, Janela, Memorando, Cabo, Cadeado } from "./objetos.js";

//Constrói as salas e distriui ferrametas/objetos nos ambientes

export class SalaAutopsia extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("sala_de_autopsia", engine);
        let celular = new Celular();
        this.ferramentas.set(celular.nome,celular);
        let prontuario = new Prontuario();
        this.objetos.set(prontuario.nome,prontuario);
    }

    usa(ferramenta, objeto){
        validate(arguments,["String", "String"]);
        if(!this.engine.mochila.tem(ferramenta)){
            return false;
        }
        if (!this.objetos.has(objeto)){
            return false;
        }
        let prontuario = this.objetos.get(objeto);
        let ferramentaObj = this.engine.mochila.pega(ferramenta);
        let resultado = prontuario.usar(ferramentaObj);
        if(resultado && ferramentaObj instanceof Isqueiro){
            this.engine.prontuarioQueimado = true; //Altera a condição para possibilitar a vitória.
        }
        return resultado;
    }
}

export class Corredor extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("corredor", engine);
        let serra = new Serra();
        this.ferramentas.set(serra.nome, serra);
        let pote = new Pote();
        this.objetos.set(pote.nome, pote);
        let janela = new Janela();
        this.objetos.set(janela.nome, janela);
    }

    usa(ferramenta, objeto){
        validate(arguments,["String", "String"]);
        if (!this.engine.mochila.tem(ferramenta)){
            return false;
        }
        if (!this.objetos.has(objeto)){
            return false;
        }
        let pote = this.objetos.get(objeto);
        return pote.usar(this.engine.mochila.pega(ferramenta));
    }
}

export class SalaExame extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("sala_de_exames", engine);
        let bilhete = new Bilhete();
        this.objetos.set(bilhete.nome, bilhete);
    }

    usa(ferramenta, objeto){
        validate(arguments,["String", "String"]);
        if(!this.engine.mochila.tem(ferramenta)){
            return false;
        }
        if (!this.objetos.has(objeto)){
            return false;
        }
        let bilhete = this.objetos.get(objeto);
        return bilhete.usar(this.engine.mochila.pega(ferramenta));
    }
}

export class Vestiario extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("vestiario", engine);
        let isqueiro = new Isqueiro();
        this.ferramentas.set(isqueiro.nome, isqueiro);
    }
}

export class SalaAdministrativa extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("sala_administrativa", engine);
        let memorando = new Memorando();
        this.objetos.set(memorando.nome, memorando);
    }

    usa(ferramenta, objeto){
        validate(arguments, ["String", "String"]);
        if(!this.engine.mochila.tem(ferramenta)){
            return false;
        }
        if(!this.objetos.has(objeto)){
            return false;
        }
        let memorando = this.objetos.get(objeto);
        return memorando.usar(this.engine.mochila.pega(ferramenta));
    }
}

export class SalaChefia extends Sala{
    constructor(engine){
        validate(engine, Engine);
        super("sala_chefia", engine);
        let cabo = new Cabo();
        this.objetos.set(cabo.nome, cabo);
        let cadeado = new Cadeado();
        this.objetos.set(cadeado.nome, cadeado);
    }

    usa(ferramenta, objeto){
        validate(arguments, ["String", "String"]);
        if(!this.engine.mochila.tem(ferramenta)){
            return false;
        }
        if(!this.objetos.has(objeto)){
            return false;
        }

        let item = this.objetos.get(objeto);
        let usou = item.usar(this.engine.mochila.pega(ferramenta));
        //Verificação da condição de vitória/derrota.
        if (item instanceof Cadeado && usou) {
            this.engine.indicaFimDeJogo();
                if (this.engine.prontuarioQueimado) {
                    console.log("\nVocê pulou a janela e conseguiu fugir sem deixar pistas!\nSua fascinação pelos répteis peçonhentos se manterá?\n!!!--- VOCÊ VENCEU ---!!!");
                } else {
                    console.log("\nVocê escapou pela janela! Porém, 2 dias depois a polícia te encontrou.\nAgora terá muito tempo na prisão para pensar onde foi que errou...\n!!!--- GAME OVER ---!!!");
                }
            }
        
            return usou;
        }
    }