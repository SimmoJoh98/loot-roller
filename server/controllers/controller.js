const Sequelize = require('sequelize')
require('dotenv').config()
const SQL = new Sequelize(process.env.LOOTDB, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

//I know this doesn't have the "drop table if exists", but PgAdmin4 was being weird about it, same with the herokuDB. It was making tables that just couldn't be accessed...
module.exports = {
    DBSEED: () => {
        SQL.query(`
        CREATE TABLE Users (
            user_id serial,
            username varchar(20),
            password varchar(255),
            isAdmin BOOLEAN,
            equipment json,
            user_modifiers json,
            CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
        );
        
        CREATE TABLE Inventory (
            inv_id serial,
            gold bigint,
            inventory json,
            user_id serial,
            item_id int,
            CONSTRAINT "inventory_pk" PRIMARY KEY ("inv_id")
        );
        
        
        
        CREATE TABLE Items (
            item_id serial,
            item_props json,
            item_icon int,
            CONSTRAINT "Items_pk" PRIMARY KEY ("item_id")
        );
        
        
        
        CREATE TABLE User_Stronghold (
            usr_base_id serial NOT NULL,
            stronghold_bldgs json NOT NULL,
            CONSTRAINT "User_Stronghold_pk" PRIMARY KEY ("usr_base_id")
        );
        `).then(
            res => {
                console.log(`DB seeded successfully`)
                res.sendStatus(200).send(`It did the thing.`)
            }
        ).catch(err => console.log(err))
    }
}