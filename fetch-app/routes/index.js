const express = require('express')
const { convert } = require('../app/handler/fetch')
const asyncHandler = require('express-async-handler')
const { body, validationResult, header } = require('express-validator');
const { isLogin } = require('../app/middlewares/auth')

const router = express.Router()

router.get('/api/convert', header('authorization'), isLogin, asyncHandler(convert))


module.exports = router