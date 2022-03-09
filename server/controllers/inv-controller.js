const Sequelize = require('sequelize')
const path = require('path')
const chests = require('../chests/chests.js')
const chest2 = require(`../chests/chest2.js`)
const chest3 = require(`../chests/chest3.js`)
require('dotenv').config()
let { DATABASE_URL } = process.env //USE THIS IMPORT FOR HEROKU DEPLOYMENT!!!
// let { LCL_DEV } = process.env // USE THIS IMPORT FOR LOCAL DEVELOPMENT!!!
const SQL = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
// // Item qualities are as follows:
// // fair: green
// // magical: blue
// // mystic: purple
// // godsent: teal / super light blue
// // cosmic: shiny orange border
// // demonic: shiny red border

module.exports = {
    genLoot: async (req,res) => {
        let {userId, chestId} = req.query
        let goldCost = 0
        let loot = null

        if(chestId == 1){
            let pcent = Math.round(Math.random() * 100)
            tmpRoll = Math.round(Math.random() * (chests.length - 1))
            loot = chests[tmpRoll]
            goldCost = 100

            if(loot.type === `gear`){
                switch(pcent !== null){
                    case pcent <= 2:
                      loot.itemQuality = 'demonic'
                      loot.itemName = `Demonic ${loot.itemName}`
                      break;
                    case pcent >= 3 && pcent <= 11:
                      loot.itemQuality = 'cosmic'
                      loot.itemName = `Cosmic ${loot.itemName}`
                      break;
                    case pcent >= 12 && pcent <= 34:
                      loot.itemQuality = 'godsent'
                      loot.itemName = `Godsent ${loot.itemName}`
                      break;
                    case pcent >= 35 && pcent <= 50:
                      loot.itemQuality = 'mystic'
                      loot.itemName = `Mystical ${loot.itemName}`
                      break;
                    case pcent >= 51 && pcent <= 75:
                      loot.itemQuality = 'magical'
                      loot.itemName = `Magical ${loot.itemName}`
                      break;
                    case pcent >= 76:
                      loot.itemQuality = 'fair'
                      loot.itemName = `Fair ${loot.itemName}`
                      break;
                  }
            }

            if(loot.type === `gear`){
                let modifier = 0
                switch(loot.itemQuality !== null){
                    case loot.itemQuality == 'magical':
                        modifier = 100
                        break;
                    case loot.itemQuality == 'mystic':
                        modifier = 1000
                        break;
                    case loot.itemQuality == 'godsent':
                        modifier = 10000
                        break;
                    case loot.itemQuality == 'cosmic':
                        modifier = 11000
                        break;
                    case loot.itemQuality == 'demonic':
                        modifier = 15000
                        break;
                    case loot.itemQuality == 'fair':
                        modifier = 20
                        break;
                }
                loot.stats = {
                    HP: Math.floor(Math.random() * modifier),
                    PATK: Math.floor(Math.random() * modifier),
                    MATK: Math.floor(Math.random() * modifier),
                    PDEF: Math.floor(Math.random() * modifier),
                    MDEF: Math.floor(Math.random() * modifier),
                    CRIT: Math.floor((Math.random() * modifier) * .01),
                    DODGE: Math.floor((Math.random() * modifier) * .1),
                    SPEED: Math.floor((Math.random() * modifier) * .02)
                }
            }
            let pkgdLoot = JSON.stringify(loot)
            
            await SQL.query(`
            INSERT INTO items (user_id, inv_id, item_props, item_icon)
            VALUES(${userId}, ${userId}, '${pkgdLoot}', 0);

            UPDATE inventory SET gold = gold-${goldCost} WHERE user_id = ${userId};
            `).then(
                dbRes => {
                    console.log(`${userId} generated ${loot}`)
                }
            ).catch(err => console.log(err))

            let itemId = null
            await SQL.query(`
                SELECT item_id
                FROM items 
                WHERE user_id = ${userId}
                GROUP BY item_id 
                ORDER BY item_id DESC
                LIMIT 1
                `).then(
                    dbRes => {
                        itemId = dbRes[0]
                    }
                ).catch(err => console.log(err))
                console.log(itemId)

            await SQL.query(`
                UPDATE inventory
                SET items = items || ${itemId[0].item_id}
                WHERE user_id = ${userId}
                `).then(
                    dbRes => {
                        console.log(`updated ${userId}'s inventory with ${itemId[0].item_id}`)
                    }
                ).catch(err => console.log(err))
            res.status(200).type('text').send(pkgdLoot)
            //END OF CHEST 1
        }
        // else if(chestId === 2){
           
        // }
        // else if(chestId === 3){
            
        // }

    },
    getUserItems: async (req,res) => {
        let {userId} = req.query

        await SQL.query(`
        SELECT * 
        FROM items
        WHERE user_id = ${userId};
        `).then(
            dbRes => {
                console.log(`retrieved ${dbRes[0]}`)
                res.status(200).send(dbRes[0])
            }
        ).catch(err => console.log(err))
    }
}