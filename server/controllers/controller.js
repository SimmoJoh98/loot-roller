const Sequelize = require('sequelize')
require('dotenv').config()
let { LCL_DEV } = process.env // USE THIS IMPORT FOR LOCAL DEVELOPMENT!!!:
// let { DATABASE_URL } = process.env //USE THIS IMPORT FOR HEROKU DEPLOYMENT!!!: 
const SQL = new Sequelize(LCL_DEV, {
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
            equipment int[],
            CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
        );
        
        CREATE TABLE Inventory (
            inv_id serial,
            user_id int,
            gold bigint,
            items int[],
            CONSTRAINT "inventory_pk" PRIMARY KEY ("inv_id")
        );
        
        CREATE TABLE Items (
            item_id serial,
            inv_id int,
            user_id int,
            item_props json,
            item_icon int,
            CONSTRAINT "Items_pk" PRIMARY KEY ("item_id")
        );

        CREATE TABLE head_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE shoulder_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE chest_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE leg_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE boot_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE main_slot(
            slot_id serial,
            item_id int,
            user_id int
        );

        CREATE TABLE off_slot(
            slot_id serial,
            item_id int,
            user_id int
        );
        `).then(
            res => {
                console.log(`DB seeded successfully`)
            }
        ).catch(err => console.log(err))
    }
}