'usestrict'

//Promises
const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)

let fs = require('fs')

let game = {
    id : 0,
    nom : '',
    nombre : 0,
    genre : ''
}

/*
###############################################################

Avec PROMISES -> 'afficher' , 'form_put'.

Avec ASYNC/AWAIT -> 'submit' , 'afficher_id' , 'delete' , 'mod_put'.

/!\ J'ai laissé quelques fonctions CALLBACK en commentaires juste pour la comparaison.
###############################################################
*/


/*
// Fonction submit avec CALLBACK
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
*/

// Submit du formulaire principal avec ASYNC/AWAIT
exports.submit = async (req, res) => {
  try{
    const data = await readFile('src/data.json')
    const data_parse = await JSON.parse(data)

    // On check pour avoir le dernier id
    let id = 0
    if (data_parse.length > 0) {
        id = data_parse[data_parse.length - 1].id
        id++
    }

    game = {
        id,
        nom : '' + req.body.nom,
        nombre : req.body.nombre,
        genre : '' + req.body.genre
    }

    //Si le nom existe déjà, et qu'on appuie sur 'Valider', alors on ne fait rien
    // (On supprime l'élément et on réécrit le même)
    for (x in data_parse) {
        if (data_parse[x].nom == req.body.nom && data_parse[x].id != id) {
            game = {
                id : data_parse[x].id,
                nom : '' + data_parse[x].nom,
                nombre : (+data_parse[x].nombre) + (+req.body.nombre), //+ devant pour bien dire que c'est un nombre et éviter la concaténation
                genre : '' + data_parse[x].genre
            }
            await data_parse.splice(x, 1)
        }
    }

    // Et on envoie
    await data_parse.push(game)
    const json = await JSON.stringify(data_parse)
    await writeFile('src/data.json', json)
    await res.redirect('/stock')
  }catch(err) {
    console.error(res.status(500), err)
  }
}

//Afficher stock avec PROMISE normale
exports.afficher = (req, res) => {
  return readFile('src/data.json')
  .then (JSON.parse)
  .then ((text) => res.render('stock', {data : text}))
  .catch(SyntaxError, function(err) {
    console.error(res.status(500), err)
  })
  .catch(function(err) {
    console.error(res.status(404), err)
  })
}

// Affichage d'un article unique selon l'ID avec ASYNC/AWAIT
exports.afficher_id = async (req, res) => {
  try{
    const data = await readFile('src/data.json')
    const parse = await JSON.parse(data)
    await (res.render('stock_id', {data : parse, id : req.params.id}))
  }catch(err) {
    console.error(res.status(500), err)
  }
}

/*
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
*/

// Suppression d'un élément avec ASYNC/AWAIT
exports.delete = async (req, res) => {
  try{
    const data = await readFile('src/data.json')
    const parse = await JSON.parse(data)
    for (x in parse) {
        if (parse[x].id == req.params.id) {
            await parse.splice(x, 1)
        }
    }

    // Test dans le cas où on supprime un élément et qu'il y a plusieurs éléments après (il faut donc modifier les id)
    let count = 0 // Variable qui va compter les ids
    let count_test = 1 // Variable juste pour le while
    let z = 0 // Variable qui prendra la valeur du 'trou'
    while (count_test != 0){
      for (x in parse){
        if (count == parse[x].id ){
          count++
        } else {
          z = count + 1
          count_test = 0
        }
      }
    }
    if(count_test == 0){
      for (x in parse){
        if (parse[x].id >= z){
          (parse[x].id)--
        }
      }
    }
    // ===============================================================================================================
    const json = await JSON.stringify(parse)
    await writeFile('src/data.json', json)
    await res.redirect('/stock')
  }catch(err) {
    console.error(res.status(500), err)
  }
}


// Affichage GET du formulaire individuel de modification (PUT) avec PROMISES -> put.ejs
exports.form_put = (async function(req, res) {
  return readFile('src/data.json')
  .then (JSON.parse)
  .then ((text) => res.render('put', {data : text, id : req.params.id}))
  .catch(SyntaxError, function(err) {
    console.error(res.status(500), err)
  })
  .catch(function(err) {
    console.error(res.status(404), err)
  })
})

// Fonction de modification (PUT) avec ASYN/AWAIT
exports.mod_put = async (req, res) => {
  try{
    const data = await readFile('src/data.json')
    const parse = await JSON.parse(data)

    game = {
        id : req.params.id,
        nom : '' + req.body.nom,
        nombre : req.body.nombre,
        genre : '' + req.body.genre
    }

    await parse.splice(req.params.id, 1, game)

    const json = await JSON.stringify(parse)
    await writeFile('src/data.json', json)
    await res.redirect('/stock')
  }catch(err) {
    console.error(res.status(500), err)
  }
}
