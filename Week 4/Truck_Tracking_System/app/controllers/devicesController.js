const express = require('express');
const {pg_client} = require('../adapters/database/postgresql');


const getDevice = async(req, res)=>{
    try{
        
        const deviceList = await pg_client.query("SELECT * FROM devices")
        console.log(deviceList.rows);
        res.status(200).json(deviceList.rows);
    }catch (err){
        console.error(err.message)
    }
};

const postDevice = async(req, res)=>{
    try{
        const vehicle_id = req.body.vehicle_id;
        const device_type_id = req.body.device_type_id;
        const device_name  = req.body.device_name;
        const is_online = req.body.is_online;
        const is_active  = req.body.is_active;
        const deviceAdd = await pg_client.query("INSERT INTO devices (vehicle_id , device_type_id , device_name, is_online, is_active) VALUES($1,$2,$3,$4,$5) RETURNING *", [vehicle_id , device_type_id , device_name, is_online,is_active])
        console.log(deviceAdd.rows);
        res.status(201).json(deviceAdd.rows);
    }catch (err){
        console.error(err.message)
    }
};

const patchDevice = async(req, res)=>{
    try{
        const id = req.body.id;
        const vehicle_id = req.body.vehicle_id;
        const device_type_id = req.body.device_type_id;
        const device_name  = req.body.device_name;
        const is_online = req.body.is_online;
        const is_active  = req.body.is_active;
        const deviceUpdate = await pg_client.query("UPDATE devices SET vehicle_id = $1 , device_type_id = $2 , device_name = $3 , is_online = $4 , is_active = $5 WHERE id = $6 RETURNING *", [vehicle_id , device_type_id , device_name, is_online, is_active, id])
        console.log(deviceUpdate.rows);
        res.status(201).json(deviceUpdate.rows);
    }catch (err){
        console.error(err.message)
    }
};

const deleteDevice = async(req, res)=>{
    try{
        const id = req.body.id;
        const data = await pg_client.query("SELECT * FROM devices WHERE id = $1", [id])
       if(data.rowCount>0){
        const deviceDelete = await pg_client.query("DELETE FROM devices  WHERE id = $1", [id])
        res.send("Silme islemi basarilidir");
            res.status(201).json(deviceDelete.rows);
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
    getDevice,
    postDevice,
    patchDevice,
    deleteDevice
};