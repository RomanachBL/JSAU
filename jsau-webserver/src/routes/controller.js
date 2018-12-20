'usestrict'

//Promises
const P = require('bluebird')
//const util = require('util')
const readFile = P.promisify(require('fs').readFile)

let fs = require('fs')

let game = {
    id : 0,
    nom : '',
    nombre : 0,
    genre : ''
}

exports.submit = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
        data = JSON.parse(data)

        // On check pour avoir le dernier id
        let id = 0
        //console.log(id);
        if (data.length > 0) {
            id = data[data.length - 1].id
            id++
        }
        //console.log(id);

        game = {
            id,
            nom : '' + req.body.nom,
            nombre : req.body.nombre,
            genre : '' + req.body.genre
        }

        //Si le nom existe déjà, et qu'on appuie sur 'Valider', alors on ne fait rien
        // (On supprime l'élément et on réécrit le même)
        for (x in data) {
            if (data[x].nom == req.body.nom && data[x].id != id) {
                game = {
                    id : data[x].id,
                    nom : '' + data[x].nom,
                    nombre : (+data[x].nombre) + (+req.body.nombre), //+ devant pour bien dire que c'est un nombre et éviter la concaténation
                    genre : '' + data[x].genre
                }
                data.splice(x, 1)
            }
        }

        // Et on envoie
        data.push(game)
        let json = JSON.stringify(data)
        fs.writeFile('src/data.json', json, (err) => {
            if (err) {
                throw err
            }
            //console.log('Done !');
        })
    })
    res.redirect('/')
}
/*
exports.afficher = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
        data = JSON.parse(data)
        res.render('stock', {data : data});
    })
}
*/
// ###### Promise pour get stock ########

exports.afficher = (req, res) => {
  return readFile('src/data.json')
  .then (JSON.parse)
  .then ((text) => res.render('stock', {data : text}))
  .catch(SyntaxError, function(err) {
    console.error("Invalid JSON in file", err)
  })
  .catch(function(err) {
      console.error("Unable to read file", err)
  })
}

/*
exports.afficher_id = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
      data = JSON.parse(data)
      let id = req.params.id
      res.render('stock_id', {data : data , id : id});
    })
}
*/

exports.afficher_id = (req, res) => {
  return readFile('src/data.json')
  .then (JSON.parse)
  .then ((text) => res.render('stock_id', {data : text, id : req.params.id}))
  .catch(SyntaxError, function(err) {
    console.error("Invalid JSON in file", err)
  })
  .catch(function(err) {
      console.error("Unable to read file", err)
  })
}



// ########################################




exports.delete = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
      data = JSON.parse(data)

      for (x in data) {
          if (data[x].id == req.params.id) {
              data.splice(x, 1)
          }
      }
      let json = JSON.stringify(data)

      fs.writeFile('src/data.json', json, (err) => {
          if (err) {
              throw err
          }
          //console.log('Done !');
      })

    })
    res.redirect('/stock')
}

exports.form_put = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
        data = JSON.parse(data)
        let id = req.params.id

        res.render('put', {data : data, id : id});
    })
}

exports.mod_put = (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
      data = JSON.parse(data)

      game = {
          id : req.params.id,
          nom : '' + req.body.nom,
          nombre : req.body.nombre,
          genre : '' + req.body.genre
      }

      data.splice(req.params.id, 1, game)
      let json = JSON.stringify(data)

      fs.writeFile('src/data.json', json, (err) => {
          if (err) {
              throw err
          }
          //console.log('Done !');
      })
    })
    res.redirect("/stock")
}
