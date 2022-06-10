const axios = require('axios');
const conversionRate = require('../helpers/conversion-rate')
const parseData = require('../helpers/parse-data-conversion')
const aggregate = require('../helpers/aggregate');

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

exports.aggregate = async (req, res) => {
    let groupBy = req.query.group_by

    const { data } = await axios({
        url: 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product',
        method: 'GET'
    });

    let toBeConverted = data
    const rate = await conversionRate()
    let output = parseData(toBeConverted, rate)

    let aggregateData = aggregate(output, groupBy)

    return res.status(200).json({ message: 'success fetch data', data: aggregateData })

}

exports.me = (req, res) => {
    return res.status(200).json(req.user)
}

