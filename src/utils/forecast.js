const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=91a85ed249d424c090f0ffcfe2ce9bd1&query=37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('unable to connect to weather service')
//     }else if (response.body.error){
//         console.log('Unable to find location')
//     }else{
//         const temp = response.body.current.temperature
//         const precip = response.body.current.precip
//         console.log('It is currently ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.')
//     }
// })


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91a85ed249d424c090f0ffcfe2ce9bd1&query=' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, 'It is currently ' + body.current.temperature + '. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast