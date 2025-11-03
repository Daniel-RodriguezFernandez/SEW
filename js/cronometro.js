"use strict";

class Cronometro {
    constructor(){
        this.tiempo = 0;
        this.decimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.inicio = null;
        this.corriendo = null;
        this.mostrar(); 
    }

    arrancar(){
        try {
            this.inicio = Temporal.Now.instant();
        } catch(err) {
            this.inicio = new Date();
        }
        clearInterval(this.corriendo);
        this.corriendo = setInterval(this.actualizar.bind(this), 100);
    }

    actualizar(){
        let tiempoActual;
        try {
            tiempoActual = Temporal.Now.instant();
            this.tiempo = tiempoActual.since(this.inicio).total('milliseconds');
        } catch(err) {
            tiempoActual = new Date();
            this.tiempo = tiempoActual - this.inicio;
        }
        this.mostrar();
    }

    mostrar(){
        this.minutos = parseInt(this.tiempo / 60000, 10);
        this.segundos = parseInt((this.tiempo / 1000) % 60, 10);
        this.decimas = parseInt((this.tiempo % 1000) / 100, 10);

        const decimasStr = this.decimas.toString();
        const segundosStr = this.segundos.toString().padStart(2, '0');
        const minutosStr = this.minutos.toString().padStart(2, '0');

        const cadena = `${minutosStr}:${segundosStr}.${decimasStr}`;
        const parrafo = document.querySelector('main p');
        if (parrafo) {
            parrafo.textContent = cadena;
        }
    }

    parar(){
        clearInterval(this.corriendo);
    }

    reiniciar(){
        clearInterval(this.corriendo);
        this.tiempo = 0;
        this.decimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.mostrar();
    }
}

window.cronometro = new Cronometro();
