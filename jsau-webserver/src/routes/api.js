'use strict'

let cont = require ('./controller.js')

module.exports = function(app) {
  //route stock
  app.get('/stock', cont.afficher)

  //route d'un jeu en particulier
  app.get('/stock/:id', cont.afficher_id)

  //post : récupère formulaire
  app.post('/submit', cont.submit)

  //DELETE
  app.delete('/del/:id', cont.delete)

  //get la page de modif
  app.get('/put/:id', cont.form_put)

  //PUT
  app.put('/putMod/:id', cont.mod_put)
}
