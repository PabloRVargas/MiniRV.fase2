import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./basicas.js";
import { Celular, Isqueiro, Serra } from "./ferramentas.js";

// Define os objetos.
export class Prontuario extends Objeto{
    // Intenção: Exibir dinamicamente a descrição do objeto após ação de acordo com a ferramenta usada.
    // Não consegui obter esse resultado, acretido que pela validação de 'String' herdada de Objeto, tentei usar template string, sem sucesso.
    #msgCelular; 
    #msgIsqueiro;
    
    constructor(){
        super("prontuario", " Está escuro, não consigo ler direito...", "");
        this.#msgCelular = "Meus registros de digitais e arcada dentária e outros exames da emergência!";
        this.#msgIsqueiro = "Prontuário queimado! Agora não poderão me identificar...";
    }

//Objeto prontuário possui interação com duas ferramentas, sendo necessário exibir a mensagem adequada conforme a ferramenta usada.
    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Isqueiro){
            this.acaoOk = true;
            this.descricaoDepoisAcao = this.#msgIsqueiro;
            console.log(this.#msgIsqueiro);
            return true;
        } else if (ferramenta instanceof Celular){
            if (ferramenta.usar()){
                this.acaoOk = true;
                this.descricaoDepoisAcao = this.#msgCelular;
                console.log(this.#msgCelular);
                return true;
            }
        }
        return false;
    }
}

export class Bilhete extends Objeto{
    constructor(){
        super("bilhete", " Está escuro, não consigo ler direito...", " Márcio, entrei de férias e esqueci de devolver seu isqueiro.\nDeixei ele no meu armário do vestiário, pode pegá-lo, está aberto!\n Ass.: Terezinha.");
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Celular){
            if (ferramenta.usar()){ //Executar a contagem dos usos do celular.
                this.acaoOk = true;
                return true;
            }
        }
        return false;
    }    
}

export class Pote extends Objeto{
    constructor(){
        super("pote", " Um pote metálico lacrado. Parece ter algo útil aqui dentro.", " Só apetrechos médicos, isso não me ajuda em nada...");
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Serra){
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

export class Janela extends Objeto{
    constructor(){
        super("janela_sala_frigorifica", " Uma sala frigorífica trancada e escura... Será que consigo ver algum corpo ali dentro?", " Nada! Usei a bateria do celular à toa, Droga!");
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Celular){
            if (ferramenta.usar()){ //Executar a contagem dos usos do celular.
                this.acaoOk = true;
                return true;
            }
        }
        return false;
    }
}

export class Memorando extends Objeto{
    constructor(){
        super("memorando", " Está escuro, não consigo ler direito...", " \nSenhor Diretor-Geral,\nReiteramos o memorando anterior e pedimos providências urgentes para o conserto do ar-condicionado localizado na sala da chefia da Gerência de Medicina forense.\nConsiderando a estrutura do prédio, pensada para não conter janelas padrão, foi necessário solicitar a abertura da tranca fixa do vidro basculante para que o ambiente tivesse o mínimo de ventilação.\nReforçamos a urgência, visto que estamos no térreo e que o vidro está trancado por um simples cadeado, sendo necessário improvisarmos uma câmera de segurança ao lado da porta para vigiarmos o ambiente no período noturno.");
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Celular){
            if (ferramenta.usar()){ //Executar a contagem dos usos do celular.
                this.acaoOk = true;
                return true;
            }
        }
        return false;
    }
}

export class Cabo extends Objeto{
    constructor(){
        super("cabo", " Um cabo de dados sai dessa câmera que aponta para aquela janela.", " Um corte cirúrgico! Essa câmera não vigia mais...")
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Serra){
            this.acaoOk = true;
            return true;
        }
    }
}

export class Cadeado extends Objeto{
    constructor(){
        super("cadeado", " Esse cadeado é mais fraco que um osso humano!", " Consegui! Eu consigo passar por essa fresta!")
    }

    usar(ferramenta){
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Serra){
            this.acaoOk = true;
            return true;
        }
    }
}