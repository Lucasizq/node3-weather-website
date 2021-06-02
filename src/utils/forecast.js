const request = require("request")



const forecast = (lat, long, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=40916660716c83c5b192211c9069338f&query=3'+lat+','+long+'&units=f'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike)
        }
    })
}




module.exports = forecast