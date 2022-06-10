const axios = require('axios')
const fromCurrency = "USD"
const toCurrency = "IDR"
const apiKeyConverter = process.env.api_key_converter
const baseUrl = "https://api.apilayer.com/fixer"
const urlConversion = `${baseUrl}/convert?to=${toCurrency}&from=${fromCurrency}&amount=1`

const conversionRate = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: urlConversion,
            method: 'get',
            headers: {
                apikey: apiKeyConverter
            }
        })
            .then(({ data }) => {
                resolve(data.result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = conversionRate