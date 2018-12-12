var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require ('fs')

//app.use('/api',require('./routes/api'));

const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.static(__dirname + '/'))

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var game = {
  id : 0,
  nom : "",
  nombre : 0,
  genre : ""
}

//UN TEST => Si le fichier est vide, alors on met les crochets
fs.readFile('src/data.json', function (err, data) {
  if(data.length == 0){
    fs.writeFile('src/data.json', '[]', (err) => {
      if (err) throw err;
    })
  }
})

//Là, on écrit les données dans 'data.json'
app.post('/submit', function(req,res) {
  fs.readFile('src/data.json', function (err, data) {
    data = JSON.parse(data);

    // On check pour avoir le dernier id
    var id = 0;
    //console.log(id);
    if(data.length>0){
      id = data[data.length-1].id;
      id++
    }
    //console.log(id);

    var game = {
      id : id,
      nom : ""+req.body.nom,
      nombre : req.body.nombre,
      genre : ""+req.body.genre
    }


    //Si le nom existe déjà, et qu'on appuie sur 'Valider', alors on ne fait rien
    // (On supprime l'élément et on réécrit le même)
    for (x in data){
        if (data[x].nom==req.body.nom && data[x].id != id){
          var game = {
            id : data[x].id,
            nom : ""+data[x].nom,
            nombre : (+data[x].nombre)+(+req.body.nombre), //+ devant pour bien dire que c'est un nombre et éviter la concaténation
            genre : ""+data[x].genre
          }
          data.splice(x,1);
        }
    }

    // Et on envoie
    data.push(game)
    var json = JSON.stringify(data)
    fs.writeFile('src/data.json', json, (err) => {
      if (err) throw err;
      //console.log('Done !');
    })
  })
  res.redirect('/');
});

//Pour l'affichage dans 'stock'
app.get('/stock', function(req, res){
  fs.readFile('src/data.json',function (err, data) {
    var data = JSON.parse(data)
    var html = "<table>"
    html += "<tr>"
    html += "<th>ID</th>"
    html += "<th>Nom</th>"
    html += "<th>Nombre</th>"
    html += "<th>Genre</th>"
    html += "</tr>"
    for (x in data){
      html += "<tr><td>"+data[x].id+"</td>"
      html += "<td><a href='/stock/"+data[x].id+"'>"+data[x].nom+"</a></td>"
      html += "<td>"+data[x].nombre+"</td>"
      html += "<td>"+data[x].genre+"</td>"
      html += "<td><form method='get' action='/delete/"+data[x].id+"'> <input type='submit' value='Supprimer'/> </form></td></tr>"
    }
    html += "</table>"
    res.send(html);
  });
});

// Juste un petit test d'affichage en prenant un id
app.get('/stock/:id', function (req, res) {
  fs.readFile('src/data.json',function (err, data) {
    var data = JSON.parse(data)
    var html = "<table>"
    html += "<tr>"
    html += "<th>ID</th>"
    html += "<th>Nom</th>"
    html += "<th>Nombre</th>"
    html += "<th>Genre</th>"
    html += "</tr>"
    for (x in data){
      if(data[x].id==req.params.id){
        html += "<tr><td>"+data[x].id+"</td>"
        html += "<td>"+data[x].nom+"</td>"
        html += "<td>"+data[x].nombre+"</td>"
        html += "<td>"+data[x].genre+"</td>"
        html += "<td><form method='get' action='/delete/"+data[x].id+"'> <input type='submit' value='Supprimer'/> </form></td></tr>"
      }
    }
    html += "</table>"
    res.send(html);
  });
})


// Suppression d'un élément
app.get('/delete/:id', function (req, res) {
  fs.readFile('src/data.json', function (err, data) {
    data = JSON.parse(data);

    for (x in data){
        if(data[x].id==req.params.id){
          data.splice(x,1);
        }
    }
    var json = JSON.stringify(data)

    fs.writeFile('src/data.json', json, (err) => {
      if (err) throw err;
      //console.log('Done !');
    })
  });
  res.redirect('/stock');
})


//Modification d'un élément
app.post('/modif', function (req, res) {
  fs.readFile('src/data.json', function (err, data) {
    data = JSON.parse(data);

    for (x in data){
        if(data[x].nom==req.body.nom){
          var game = {
            id : x,
            nom : ""+req.body.nom,
            nombre : req.body.nombre,
            genre : ""+req.body.genre
          }

          data.splice(x,1, game);
        }
    }
    var json = JSON.stringify(data)

    fs.writeFile('src/data.json', json, (err) => {
      if (err) throw err;
      //console.log('Done !');
    })
  });
  res.redirect('/');
})


app.listen(8083)
