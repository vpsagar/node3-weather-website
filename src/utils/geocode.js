const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FnYXJwYXRpbCIsImEiOiJjazVzMm5rZmYwOTl5M2xud3Z1NXA2YnJwIn0.Abkvghtsfy9Hzv7axxC2KQ&limit=1'
    request({url: url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect the location services', undefined)
        } else if (body.features.length === 0) {
            callback('Location is not correct, please try another search', undefined)             
        } else {
            callback(undefined, {
                
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode