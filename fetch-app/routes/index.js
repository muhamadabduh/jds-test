const express = require('express')
const { convert, me, aggregate } = require('../app/handler/fetch')
const asyncHandler = require('express-async-handler')
const { body, validationResult, header } = require('express-validator');
const { isLogin, isAdmin } = require('../app/middlewares/auth')

const router = express.Router()

router.get('/api/aggregate', header('authorization'), asyncHandler(isLogin), asyncHandler(isAdmin), asyncHandler(aggregate))
router.get('/api/convert', header('authorization'), asyncHandler(isLogin), asyncHandler(convert))
router.get('/api/me', header('authorization'), asyncHandler(isLogin), me)

module.exports = router