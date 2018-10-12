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

app.post('', function(req,res) {
  fs.appendFile('src/data.json', JSON.stringify(req.body, null, 2)+'\r\n', function(err) {
    if (err) throw err;
    //console.log('Done !');
  });
  res.redirect('');
});

app.get('/stock', function(req, res){
  let jsonData = require('../src/data.json');
  //console.log(jsonData);
  res.send(jsonData);
});

// !!!!!!!!!!!!!!!!!!!!! PROBLEME => LE FICHIER JSON S'ECRIT MAL POUR PLUSIEURS OBJETS (MAIS BON POUR UN SEUL OBJET)


app.listen(8083)

/*
TODO -> Bouton sur l'interface "voir ci, voir ça " etc ...
Utiliser le tuto du prof pour utiliser les méthodes get pour afficher des choses spécifiques
*/
