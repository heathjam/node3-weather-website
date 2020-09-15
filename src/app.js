const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paul Heath'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Paul Heath'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Here is a help message',
        title: 'Help',
        name: 'Paul Heath'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        debugger
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecast,
                location: location
            })
        })
    })
})

app.get('/products', (req, res) => {
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

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found',
        title: 'Help 404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('app started on port 3000')
})