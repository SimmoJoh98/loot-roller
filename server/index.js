const express = require('express');
const app = express();
const path = require('path')
const ctrlr = require('./controllers/controller.js') //ONLY FOR SEED FUNCTION
const userctrl = require('./controllers/user-controller.js')
const invctrlr = require('./controllers/inv-controller.js')
require('dotenv').config()
const port = process.env.PORT || 3005

//MIDDLEWARE-----------------------------------//
app.use(express.json());
//FRONT END JS AND CSS FOR LOGIN / SIGNUP :^)
app.use('/js', express.static(path.join(__dirname, '../public/index.js')))
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')))
app.use('/signup/js', express.static(path.join(__dirname, '../public/signup/signup.js')))
app.use('/signup/styles', express.static(path.join(__dirname, '../public/signup/signup.css')))
//USER HOME JS AND CSS....//
app.use('/homejs', express.static(path.join(__dirname, '../public/user-home/home.js')))
app.use('/homecss', express.static(path.join(__dirname, '../public/user-home/home.css')))
//USER ROLLPAGE AND VENDOR//
app.use('/rollpagejs', express.static(path.join(__dirname, '../public/rollpage/rollpage.js')))
app.use('/rollpagecss', express.static(path.join(__dirname, '../public/rollpage/rollpage.css')))
//---------------------------------------------//


//GET ENDPOINTS//
app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})
app.get('/signup', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signup/signup.html'))
})

app.get('/login', userctrl.login)
app.get('/home', userctrl.getHome)
app.get('/user/inv', userctrl.getUserInventory)
app.get(`/rollpage`, userctrl.getRollpage)
app.get(`/vendor`, userctrl.getVendorPage)
app.get('/genloot', invctrlr.genLoot)
app.get(`/user/items`, invctrlr.getUserItems)
//PUT - UPDATE ENDPOINTS//

//POST - CREATE ENDPOINTS//
app.post('/seed', ctrlr.DBSEED)
app.post('/register', userctrl.register)
//DELETE - ENDPOINTS//

app.listen(port, () => console.log(`Listening on ${port}`))