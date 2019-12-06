const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) { //numero de ticket y escritorio que lo antenderá
        this.numero = numero;
        this.escritorio = escritorio;
    }

}



class TicketControl {

    constructor() { //inicilizo la clase

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //tickets pendientes de revisión
        this.ultimos4 = [];

        let data = require('../data/data.json'); //aquí ya tengo el objeto data aquí

        if (data.hoy === this.hoy) { //aquí continuo con el día de trabajo

            this.ultimo = data.ultimo; //aqui mantengo persistente los datos
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo(); //aquí reinicio el conteo si es otro día
        }

    }

    siguiente() {

        this.ultimo += 1; //incrementa en 1 el último ticket

        let ticket = new Ticket(this.ultimo, null); //creamos una nueva instancia de ese ultimo y null el escritorio
        this.tickets.push(ticket); //lo agregamos


        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //el primero pendiente
        this.tickets.shift(); //elimino ese elemento

        let atenderTicket = new Ticket(numeroTicket, escritorio); //ticket atendido en este momento

        this.ultimos4.unshift(atenderTicket); //lo agrego al inicio de ese arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }


    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString); //aqui ya puedo escribir, pasando el path y el archivo

    }



}



module.exports = {
    TicketControl //exporto la clase
}