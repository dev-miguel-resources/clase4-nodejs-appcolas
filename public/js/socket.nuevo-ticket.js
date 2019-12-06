// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket'); //referencia al label de nuevo-ticket.html


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual'
socket.on('estadoActual', function(resp) {

    console.log(resp);
    label.text(resp.actual);

});


$('button').on('click', function() { //cada vez que se haga click en un button lance esta función

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});