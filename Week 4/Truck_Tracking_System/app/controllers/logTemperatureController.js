const express = require('express');
const {pg_client} = require('../adapters/database/postgresql');



const getTemp = async(req, res)=>{
    try{
        
        const tempList = await pg_client.query("SELECT * FROM log_temperature")
        console.log(tempList.rows);
        res.status(200).json(tempList.rows);
    }catch (err){
        console.error(err.message)
    }
};
 

const postTemp = async(req, res)=>{
    try{
        const vehicle_id = req.body.vehicle_id;
        const device_id = req.body.device_id;
        const read_data = req.body.read_data;
        const created_at  = req.body.created_at;
        const tempAdd = await pg_client.query("INSERT INTO log_temperature (vehicle_id , device_id , read_data, created_at) VALUES($1,$2,$3,$4) RETURNING *", [vehicle_id , device_id , read_data, created_at])
        console.log(tempAdd.rows);
        res.status(201).json(tempAdd.rows);
    }catch (err){
        console.error(err.message)
    }
};

module.exports =  {
    getTemp,
    postTemp
};
