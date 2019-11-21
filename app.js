require('custom-env').env()
var express = require('express'),
    cors = require('cors'),
    corsConfig = require('./corsConfig'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'upload')))
app.use(cors(process.env.DEVER == 'prod' ? corsConfig : ''))
app.use('/', indexRouter)
app.use('/users', usersRouter)
// 404 - notfound
app.use((req, res) => {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' })
})
// 500 - Any server error
app.use((err, req, res) => {
    return res.status(500).send({ error: err })
})
app.listen(process.env.PORT || '3000', () => {
    console.log('Server start')
})
