const express = require('express');
const app = express();
const path = require('path')
const ctrlr = require('./controllers/controller.js')
const userctrl = require('./controllers/user-controller.js')
require('dotenv').config()
const PORT = process.env.PORT || 3005

//MIDDLEWARE-----------------------------------//
app.use(express.json());
//FRONT END JS AND CSS :^)
app.use('/js', express.static(path.join(__dirname, '../public/index.js')))
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')))
app.use('/signup/js', express.static(path.join(__dirname, '../public/signup/signup.js')))
app.use('/signup/styles', express.static(path.join(__dirname, '../public/signup/signup.css')))
//---------------------------------------------//



//GET ENDPOINTS//
app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})
app.get('/signup', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signup/signup.html'))
})
//----------------------------------------------//
app.get('/login', userctrl.login)

//PUT - UPDATE ENDPOINTS//


//POST - CREATE ENDPOINTS//
app.post('/seed', ctrlr.DBSEED)
app.post('/register', userctrl.register)

//DELETE - ENDPOINTS//

app.listen(PORT, () => console.log(`Listening on ${PORT}`))