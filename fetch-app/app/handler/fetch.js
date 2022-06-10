const axios = require('axios');
const conversionRate = require('../helpers/conversion-rate')
const parseData = require('../helpers/parse-data-conversion')

exports.convert = async (req, res) => {
    const { data } = await axios({
        url: 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product',
        method: 'get'
    });
    let toBeConverted = data
    const rate = await conversionRate()
    let output = parseData(toBeConverted, rate)

    return res.status(200).json({ message: 'success fetch data', data: output })
}


