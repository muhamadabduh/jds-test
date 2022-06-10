const aggregate = (data, groupBy) => {
    let currentAgg = []
    data.map(item => {
        let found = currentAgg.findIndex(curr => curr[groupBy] == item[groupBy])
        if (found !== -1) {
            currentAgg[found] = {
                ...currentAgg[found],
                'total-price-idr': parseFloat(currentAgg[found]['total-price-idr']) + parseFloat(item['price-idr']),
                'total-items': currentAgg[found]['total-items'] + 1
            }
        } else {
            currentAgg = [
                ...currentAgg,
                {
                    [groupBy]: item[groupBy],
                    'total-price-idr': parseFloat(item['price-idr']),
                    'total-items': 1
                }
            ]
        }
    })
    return currentAgg.sort((a, b) => a['total-price-idr'] - b['total-price-idr'])
}

module.exports = aggregate