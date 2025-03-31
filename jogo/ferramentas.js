import { Ferramenta } from "./basicas.js";

export class Celular extends Ferramenta { //Ferramenta descartável.
    #usos;

    constructor() {
        super("celular_com_lanterna");
        this.#usos = 3; // Quantidade de usos possíveis.
    }

    //Contador de usos e mensagens para ciência da carga.
    usar(){
        if(this.#usos <= 0){
            console.log("A bateria acabou. Não é possível usar o celular.");
            return false;
        }
        //Contagem dos usos do celular.
        this.#usos = this.#usos -1;
        if (this.#usos > 1){
            console.log(`A bateria está acabando, acho que só consigo usar lanterna mais ${this.#usos} vezes.`);
        } else if (this.#usos === 1){
            console.log(`A bateria está acabando, só consigo usar mais ${this.#usos} vez.`);
        } else {
            console.log("A bateria acabou. Esse foi o último uso!");
        }
        return true;
    }
}

export class Serra extends Ferramenta{
    constructor(){
        super("serra_de_ossos");
    }
}

export class Isqueiro extends Ferramenta{
    constructor(){
        super("isqueiro");
    }
}