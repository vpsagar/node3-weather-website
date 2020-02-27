const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', '/public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar's engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Sagar'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About robot',
        name: 'Sagar'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is help page',
        title: 'Help',
        name: 'Sagar'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}  )=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address       
            })
            //console.log(location)
            //console.log(forecastData)
          })
    })    
    
    
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Sagar',
        title: '404'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Sagar',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})