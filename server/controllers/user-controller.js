const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const SQL = new Sequelize(process.env.LOOTDB, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    login: async (req, res) => {
        const { username, password } = req.query
        let userTmp
        
        await SQL.query(`
        SELECT user_id,username,password
        FROM users
        WHERE username = '${username}';
        `).then(
            dbRes => {
                userTmp = dbRes[0]
                console.log(`retrieved user with ID: ${userTmp[0].user_id}`)
            }
            ).catch(err => console.log(err))
            
        try {
            const verified = bcrypt.compareSync(password, userTmp[0].password)
            
            if(verified){
                delete userTmp[0].password
                console.log(`Logged in ${userTmp[0].username} with correct password.`)
                res.status(200).send(userTmp)
            }
            else if(userTmp[0].username === '' || userTmp[0].password === ''){
                res.status(400).send(`Username Or password cannot be empty.`)
                console.log(`Username or Password was left empty, not logging in.`)
            }
            else{
                res.status(400).send('Incorrect Password')
                console.log(`Incorrect password for ${userTmp[0].username}, not logging in.`)
            }
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }



        // if(verified){
        //     delete userTmp[0].password
        //     console.log(`Logged in ${userTmp[0].username} with correct password.`)
        //     res.status(200).send(userTmp)
        // }
        // else if(userTmp[0].username === '' || userTmp[0].password === ''){
        //     res.status(400).send(`Username Or password cannot be empty.`)
        //     console.log(`Username or Password was left empty, not logging in.`)
        // }
        // else{
        //     res.status(400).send('Incorrect Password')
        //     console.log(`Incorrect password for ${userTmp[0].username}, not logging in.`)
        // }
        
    },
    register: (req,res) => {
        let {username, password} = req.body
        const salt = bcrypt.genSaltSync(8)
        const passHash = bcrypt.hashSync(password, salt)

        SQL.query(`
        INSERT INTO users(username,password,isAdmin)
        VALUES('${username}', '${passHash}', True)
        `).then(
            dbRes => {
                res.status(200).send(`User ${username} created!`)
            }
        ).catch(err => {
            console.log(err)
            res.status(202).send(err.errors[0].message)
        })
    }
}