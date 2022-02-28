const conexionBD = require("./conexionBD.js")
// const request = require('request');
const axios = require('axios');


async function peticion () {
    var jugadores = await solicitudAPi()
    console.log('peticion')
}
async function solicitudAPi () {
    var cantidadPaginas = 908
    var pagina = 1;
    var jugadores = [];
    for (let i = 0; i < cantidadPaginas; i++) {
        await axios.get('https://www.easports.com/fifa/ultimate-team/api/fut/item?page=' + pagina)
        .then(res => {
            console.log('Pagina:', res.data.page);
            res.data.items.forEach(function(jugador) {
                var datosJugador = {
                    nombre: jugador.name,
                    pais: jugador.nation.name,
                    club: jugador.club.name,
                    posicion: jugador.position,
                    edad: jugador.age,
                    pierna: jugador.foot,
                    rating: jugador.rating
                }
                jugadores.push(datosJugador)
            });
            pagina++;
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
    }
    console.log(jugadores.length)
    var resultadoInsercionBD = conexionBD.insercion(jugadores)
    console.log(resultadoInsercionBD);
}


peticion();



// var resultadoInsercionBD = conexionBD.insercion(jugadores)
// console.log(resultadoInsercionBD);