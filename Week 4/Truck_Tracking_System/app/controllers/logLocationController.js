const express = require('express');
const {pg_client} = require('../adapters/database/postgresql');

const getGps = async(req, res)=>{
    try{
        
        const gpsList = await pg_client.query("SELECT * FROM log_location")
        console.log(gpsList.rows);
        res.status(200).json(gpsList.rows);
    }catch (err){
        console.error(err.message)
    }
};

const postGps = async(req, res)=>{
    try{
        const vehicle_id = req.body.vehicle_id;
        const device_id = req.body.device_id;
        const latitude = req.body.latitude;
        const longitude  = req.body.longitude;
        const created_at  = req.body.created_at;
        const gpsAdd = await pg_client.query("INSERT INTO log_location (vehicle_id , device_id , latitude , longitude , created_at) VALUES($1,$2,$3,$4,$5) RETURNING *", [vehicle_id , device_id , latitude , longitude , created_at])
        console.log(gpsAdd.rows);
        res.status(201).json(gpsAdd.rows);
    }catch (err){
        console.error(err.message)
    }
};

module.exports =  {
    getGps,
    postGps
};
