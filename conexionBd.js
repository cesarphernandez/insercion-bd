var mysql = require('mysql');

var conexionBD = mysql.createConnection({
  host: "fifafut21.cxoyamjuaana.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "lLGDHxlQPEjW8vKZcHTi",
  database: "FifaFut21"
});

const insercion = function ingresarDatosBd (jugadores) {
    conexionBD.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO jugadores (nombre_jugador, pais, club, posicion, edad, pierna, rating) VALUES ?";
        var values = [];
        jugadores.forEach(function(jugador) {
            var datosJugador = [
                jugador.nombre, 
                jugador.pais,
                jugador.club,
                jugador.posicion,
                jugador.edad,
                jugador.pierna,
                jugador.rating
            ];
            values.push(datosJugador);
        });
        conexionBD.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
          return result.affectedRows; 
        });
    });
}
module.exports ={
    insercion
}