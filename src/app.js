const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Lucas I'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Lucas I'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is the help page',
        title: 'Help',
        name: 'Lucas Izquierdo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'There is no adress entered'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) =>{

        if(error){
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude ,(error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastdata
            })

            
          })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
    products: []
})
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404 Help',
        name: 'Lucas Izquierdo',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Lucas Izquierdo',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})