const axios = require('axios')

exports.isLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const { data } = await axios({
            url: 'http://localhost:8000/api/me',
            method: 'get',
            headers: {
                'Authorization': `${token}`,
                'Accept': 'application/json'
            }
        })
        if (!data) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        if (data) {
            req.user = data
            next()
        }

    } catch (error) {
        return res.status(400).json({ error: 'unauthorized' })
    }
}