const parseData = (data, rate) => data.map(item => ({ ...item, ['price-idr']: (parseFloat(item.price) * rate).toFixed(2) }))


module.exports = parseData