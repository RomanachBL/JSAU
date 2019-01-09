'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let fs = require('fs')

//for d3
const D3Node = require('d3-node')
const d3n = new D3Node()      // initializes D3 with container element
d3n.createSVG(10,20).append('g') // create SVG w/ 'g' tag and width/height
d3n.svgString() // output: <svg width=10 height=20 xmlns="http://www.w3.org/2000/svg"><g></g></svg>

// set the view engine to ejs
app.set('view engine', 'ejs')

const morgan = require('morgan')
app.use(morgan('dev'))
app.use("/", express.static(__dirname));

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//Methode override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

require('./routes/api')(app);

let x

//UN TEST => Si le fichier est vide, alors on met les crochets
fs.readFile('src/data.json', (err, data) => {
    if (data.length == 0) {
        fs.writeFile('src/data.json', '[]', (err) => {
            if (err) {
                throw err
            }
        })
    }
})

// ###############################################################

// Page de d3
app.get('/graph/', (req, res) => {
  fs.readFile('src/data.json', (err, data) => {
      data = JSON.parse(data)
      res.render('stock_graph', {data : data});
  })
})

app.listen(8089)
