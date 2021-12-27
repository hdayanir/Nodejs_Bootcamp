const express = require('express');
const app = express();
const {pg_client} = require('../adapters/database/postgresql');


const getDeviceType = async(req, res)=>{
    try{
        
        const typeList = await pg_client.query("SELECT * FROM devices_type")
        console.log(typeList.rows);
        res.status(200).json(typeList.rows);
    }catch (err){
        console.error(err.message)
    }
};

const postDeviceType = async(req, res)=>{
    try{
        const type_name = req.body.type_name;
        const type_description = req.body.type_description;
        const is_active  = req.body.is_active;
        const typeAdd = await pg_client.query("INSERT INTO devices_type (type_name , type_description , is_active) VALUES($1,$2,$3) RETURNING *", [type_name,type_description,is_active])
        console.log(typeAdd.rows);
        res.status(201).json(typeAdd.rows);
    }catch (err){
        console.error(err.message)
    }
};

const deleteDeviceType = async(req, res)=>{
    try{
        const id = req.body.id;
        const data = await pg_client.query("SELECT * FROM devices_type WHERE id = $1", [id])
       if(data.rowCount>0){
            const typeDelete = await pg_client.query("DELETE FROM devices_type  WHERE id = $1", [id])
            res.send("Silme islemi basarilidir");
            res.status(201).json(typeDelete.rows);
        }else{
            res.send("Silme islemi gerceklesmedi. Sebep ise veri bulunamadi");
            console.log(data.rows);
            res.status(401).json(data.rows);
        }
    }catch (err){
        console.error(err.message)
    }
};

module.exports =  {
    getDeviceType,
    postDeviceType,
    deleteDeviceType
};