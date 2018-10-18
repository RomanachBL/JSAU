var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require ('fs')

const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static(__dirname + '/'))

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

fs.readFile('src/data.json', function (err, data) {
  if(data.toString() == ''){
    fs.writeFile('src/data.json', '[]', (err) => {
      if (err) throw err;
    })
  }
})

app.post('', function(req,res) {
  fs.readFile('src/data.json', function (err, data) {
    data = JSON.parse(data);
    data.push(req.body)
    var json = JSON.stringify(data)
    fs.writeFile('src/data.json', json+'\n\r', (err) => {
      if (err) throw err;
      //console.log('Done !');
    })
  })
  res.redirect('');
});

app.get('/stock', function(req, res){
  fs.readFile('src/data.json',function (err, data) {
    var data = JSON.parse(data)
    var html = "<table>"
    html += "<tr>"
    html += "<th>Nom</th>"
    html += "<th>Prix</th>"
    html += "<th>Nombre</th>"
    html += "<th>Genre</th>"
    html += "</tr>"
    for (x in data){
      html += "<tr><td>"+data[x]["nom"]+"</td>"
      html += "<td>"+data[x]["prix"]+"</td>"
      html += "<td>"+data[x]["nombre"]+"</td>"
      html += "<td>"+data[x]["genre"]+"</td></tr>"
    }
    html += "</table>"
    res.send(html);
  });
});

app.get('/stock/:genre', function (req, res) {
  fs.readFile('src/data.json', function (err, data) {
    var jeux = JSON.parse(data)
    var liste_genres = []
    for (x in jeux){
      if (jeux[x]["genre"] == req.params.genre){
        liste_genres.push(jeux[x])
      }
    }
    res.json(liste_genres)
  });
})

app.get('/:nom', function (req, res) {
  fs.readFile('src/data.json', function (err, data) {
    var nom = JSON.parse(data)
    var liste_noms = []
    for (x in nom){
      if (nom[x]["nom"] == req.params.nom){
        liste_noms.push(nom[x])
      }
    }
    res.json(liste_noms)
  });
})

app.delete('/delete/:nom', function (req, res) {
  fs.readFile('src/data.json', function (err, data) {
    var nom = JSON.parse(data)
    for (var x in nom){
      if (nom[x]["nom"] == req.params.nom){
        delete nom[x]
      }
    }
    fs.writeFile('src/data.json', JSON.stringify(data.filter(x => x)), (err) => {
      if (err) throw err;
      //console.log('Done !');
    })
    res.redirect('');
  });
})

//modifier les méthodes d'affichage (HTML et non JSON)
//methode override
// FETCH DELETE, PUT etc ...
//browserify
//CSS d3?

app.listen(8083)
