const request = require("request")


// const url = 'https://api.darksky.net/forecast/d5a47ed6890604f5553653700e065f3b/37.8267,-122.4233'
// request({url: url, json: true}, (error, response)=>{
//     if(error){
//         console.log('Unable to connect with weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find the location')
//     } else{
//         console.log(response.body.currently.summary)
//         console.log(response.body.currently.temperature)
//         console.log(response.body.currently.precipProbability)
//     }
// })

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/d5a47ed6890604f5553653700e065f3b/'+ latitude + ','+longitude
    request({url: url, json:true}, (error, {body})=> {
        if(error){
            callback('Unable to connect weather service', undefined)
        } else if(body.error) {
            callback('Unable to find the lcoation', undefined)
        } else  {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
