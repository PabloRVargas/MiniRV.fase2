import {validate} from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});

//Construção de classes básicas.

export class Mochila{
    #ferramentas;
//Cria o array vazio que conterá as ferramentas.
    constructor(){
        this.#ferramentas = [];
    }
//Define os métodos que atuarão sobre as ferramentas.
    guarda(ferramenta){
        validate(ferramenta,Ferramenta);
        this.#ferramentas.push(ferramenta);
    }

    pega(nomeFerramenta){
        validate(arguments,["String"]);
        let ferramenta = this.#ferramentas.find(f=>f.nome === nomeFerramenta);
        return ferramenta;
    }

    tem(nomeFerramenta){
        validate(arguments,["String"]);
        return this.#ferramentas.some(f=>f.nome === nomeFerramenta);
    }

    inventario() {
        return this.#ferramentas.map(obj=>obj.nome).join(", ");
    }
}
//Define a classe das ferramentas
export class Ferramenta{
    #nome;

    constructor(nome){
        validate(nome, "String");
        this.#nome = nome
    }
    
	get nome(){
		return this.#nome;
	}
//Método de uso da ferramenta.	
	usar(){
		return true;
	}
}
//Define os objetos.
export class Objeto{
	#nome;
    #descricaoAntesAcao;
    #descricaoDepoisAcao;
    #acaoOk;
    	
	constructor(nome,descricaoAntesAcao, descricaoDepoisAcao){
		validate(arguments,["String","String","String"]);
		this.#nome = nome;
		this.#descricaoAntesAcao = descricaoAntesAcao;
		this.#descricaoDepoisAcao = descricaoDepoisAcao;
		this.#acaoOk = false;
	}
	
	get nome(){
		return this.#nome;
	}

	get acaoOk() {
		return this.#acaoOk;
	}

	set acaoOk(acaoOk){
		validate(acaoOk,"Boolean");
		this.#acaoOk = acaoOk;
	}
//Objetos têm status pré o pós uso.
	get descricao(){
		if (!this.acaoOk){
			return this.#descricaoAntesAcao;
		}else {
			return this.#descricaoDepoisAcao;
		}
	}

	usa(ferramenta,objeto){
	}
}
//Define as salas.
export class Sala{
	#nome;
	#objetos;
	#ferramentas;
	#portas;
	#engine;
	
	constructor(nome,engine){
		validate(arguments,["String",Engine]);
		this.#nome = nome;
		this.#objetos = new Map();
		this.#ferramentas = new Map();
		this.#portas = new Map();
		this.#engine = engine;
	}

	get nome(){
		return this.#nome;
	}
	
	
	get objetos(){
		return this.#objetos;
	}

	get ferramentas(){
		return this.#ferramentas;
	}
	
	get portas(){
		return this.#portas;
	}

	get engine(){
		return this.#engine;
	}
//Lista de objetos.
	objetosDisponiveis(){
		let arrObjs = [...this.#objetos.values()];
    	return arrObjs.map(obj=>obj.nome+":"+obj.descricao);
	}
//lista de ferramentas.
	ferramentasDisponiveis(){
		let arrFer = [...this.#ferramentas.values()];
    	return arrFer.map(f=>f.nome);		
	}
//Acessos possíveis conforme estrutura definida na classe jogoPronto.
	portasDisponiveis(){
		let arrPortas = [...this.#portas.values()];
    	return arrPortas.map(sala=>sala.nome);
	}
//Comando para retirar a ferramenta da sala e colocar na mochila.	
	pega(nomeFerramenta){
		validate(nomeFerramenta,"String");
		let ferramenta = this.#ferramentas.get(nomeFerramenta);
		if (ferramenta != null){
			this.#engine.mochila.guarda(ferramenta);
			this.#ferramentas.delete(nomeFerramenta);
			return true;
		}else{
			return false;
		}
	}
//Comando de navegação entre as salas.
	sai(porta){
		validate(porta,"String");
		return this.#portas.get(porta);
	}
//Fornecimento de informações sobre a sala, situando o jogador.
	textoDescricao(){
		let descricao = "Você está no "+this.nome+"\n";
        if (this.objetos.size == 0){
            descricao += "Não há objetos na sala\n";
        }else{
            descricao += "Objetos: "+this.objetosDisponiveis()+"\n";
        }
        if (this.ferramentas.size == 0){
            descricao += "Não há ferramentas na sala\n";
        }else{
            descricao += "Ferramentas: "+this.ferramentasDisponiveis()+"\n";
        }
        descricao += "Portas: "+this.portasDisponiveis()+"\n";
		return descricao;
	}

	usa(ferramenta,objeto){ 
		return false;
	}
}

export class Engine{
	#mochila;
	#salaCorrente;
	#fim;
	#prontuarioQueimado; //Condição para ganhar/perder o jogo.

	constructor(){
		this.#mochila = new Mochila();
		this.#salaCorrente = null;
		this.#fim = false;
		this.#prontuarioQueimado = false; //Inicia o jogo com prontuário intácto, condição de perda do jogo.
		this.criaCenario();
	}

	get mochila(){
		return this.#mochila;
	}

	get salaCorrente(){
		return this.#salaCorrente;
	}

	get prontuarioQueimado(){
		return this.#prontuarioQueimado;
	}

	set salaCorrente(sala){
		validate(sala,Sala);
		this.#salaCorrente = sala;
	}

	set prontuarioQueimado(queimado){
		this.#prontuarioQueimado = queimado;
	}

	indicaFimDeJogo(){
		this.#fim = true;
	}

	criaCenario(){}

	joga(){
		let novaSala = null;
		let acao = "";
		let tokens = null;
		while (!this.#fim) {
			console.log("-------------------------");
			console.log(this.salaCorrente.textoDescricao());
			acao = prompt("O que voce deseja fazer? ");
			tokens = acao.split(" ");
			switch (tokens[0]) {
			case "fim":
				this.#fim = true;
				break;
			case "pega":
				if (this.salaCorrente.pega(tokens[1])){
					console.log("Ok! " + tokens[1] + " guardado!");
				} else {
					console.log("Objeto " + tokens[1] + " não encontrado.");
				}
				break;
			case "inventario":
				console.log("Ferramentas disponiveis para serem usadas: " + this.#mochila.inventario());
				break;
			case "usa":
					if (this.salaCorrente.usa(tokens[1],tokens[2])){
						console.log("Feito !!");						
					} else {
						console.log("Não é possível usar " + tokens[1] + " sobre " + tokens[2] + " nesta sala");
					}
				break;
			case "sai":
				novaSala = this.salaCorrente.sai(tokens[1]);
				if (novaSala == null) {
					console.log("Sala desconhecida ...");
				} else {
					this.#salaCorrente = novaSala;
				}
				break;
			default:
				console.log("Comando desconhecido: " + tokens[0]);
				break;
			}
		}
		console.log("Jogo encerrado!");
	}
}