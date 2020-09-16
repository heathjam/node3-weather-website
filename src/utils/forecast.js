const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91a85ed249d424c090f0ffcfe2ce9bd1&query=' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, 'It is currently ' + body.current.temperature + 'C and feels like ' +  body.current.feelslike  + 'C. The sky is ' + body.current.weather_descriptions[0] +   ' and there is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast