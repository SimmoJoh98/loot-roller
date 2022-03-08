const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config()
// let { DATABASE_URL } = process.env //USE THIS IMPORT FOR HEROKU DEPLOYMENT!!!
let { LCL_DEV } = process.env // USE THIS IMPORT FOR LOCAL DEVELOPMENT!!!
const SQL = new Sequelize(LCL_DEV, {
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
    },
    register: (req,res) => {
        let {username, password} = req.body
        const salt = bcrypt.genSaltSync(8)
        const passHash = bcrypt.hashSync(password, salt)

        SQL.query(`
        INSERT INTO users(username,password,isAdmin)
        VALUES('${username}', '${passHash}', False);
        
        INSERT INTO inventory(gold)
        VALUES(1000);

        INSERT INTO head_slot(item_id)
        VALUES(null);

        INSERT INTO shoulder_slot(item_id)
        VALUES(null);

        INSERT INTO chest_slot(item_id)
        VALUES(null);

        INSERT INTO leg_slot(item_id)
        VALUES(null);

        INSERT INTO boot_slot(item_id)
        VALUES(null);
        
        INSERT INTO main_slot(item_id)
        VALUES(null);

        INSERT INTO off_slot(item_id)
        VALUES(null);

        UPDATE inventory 
        SET user_id = inv_id;

        UPDATE head_slot
        SET user_id = slot_id;

        UPDATE shoulder_slot
        SET user_id = slot_id;

        UPDATE chest_slot
        SET user_id = slot_id;

        UPDATE leg_slot
        SET user_id = slot_id;

        UPDATE boot_slot
        SET user_id = slot_id;

        UPDATE main_slot
        SET user_id = slot_id;

        UPDATE off_slot
        SET user_id = slot_id;

        `).then(
            dbRes => {
                res.status(200).send(`User ${username} created!`)
            }
        ).catch(err => {
            console.log(err)
            res.status(202).send(err.errors[0].message)
        })


    },
    getHome: (req,res) => {
         res.status(200).sendFile(path.join(__dirname, '../../public/user-home/home.html'))
    },
    getUserInventory: async (req,res) => {
        let { userId } = req.query
        await SQL.query(`
        SELECT * FROM inventory
        WHERE user_id = ${userId}
        `).then(
            dbRes => {
                res.status(200).send(dbRes[0])
            }
        ).catch(err => console.log(err))
        
    },
    getRollpage: (req,res) => {
        res.status(200).sendFile(path.join(__dirname ,'../../public/rollpage/rollpage.html'))
    },
    getVendorPage: (req,res) => {
        res.status(200).sendFile(path.join(__dirname ,'../../public/vendor/vendor.html'))
    }
}