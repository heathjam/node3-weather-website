const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF1bGhlYXRoMTAiLCJhIjoiY2tlZDlmdWsxMHE3bDJ3c2J0cTk3ZmFmNCJ9.rLaptZRMuRLceFYYi-5s_g'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services')
        }else if (body.message){
            callback(body.message)
        }else{
            const data = body.features[0].center
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode