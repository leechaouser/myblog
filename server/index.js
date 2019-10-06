const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./router')(app)

app.listen(8080, () => {
    console.log('http://localhost:8080')
})