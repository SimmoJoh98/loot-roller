const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 3005

//MIDDLEWARE-----------------------------------//
app.use(express.json());
//FRONT END JS AND CSS :^)
app.use('/js', express.static(path.join(__dirname, '../public/index.js')))
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')))
//---------------------------------------------//



//GET ENDPOINTS//
app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

//PUT - UPDATE ENDPOINTS//


//POST - CREATE ENDPOINTS//


//DELETE - ENDPOINTS//

app.listen(PORT, () => console.log(`Listening on ${PORT}`))