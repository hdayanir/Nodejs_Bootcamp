const express = require('express');
const {pg_client} = require('../adapters/database/postgresql');

const getVehicle = async(req, res)=>{
    try{
        
        const vehicleList = await pg_client.query("SELECT * FROM vehicles")
        console.log(vehicleList.rows);
        res.status(200).json(vehicleList.rows);
    }catch (err){
        console.error(err.message)
    }
};

const postVehicle = async(req, res)=>{
    try{
        const vehicle_plate = req.body.vehicle_plate;
        const current_status = req.body.current_status;
        const is_active  = req.body.is_active;
        const vehicleAdd = await pg_client.query("INSERT INTO vehicles (vehicle_plate , current_status , is_active) VALUES($1,$2,$3) RETURNING *", [vehicle_plate,current_status,is_active])
        console.log(vehicleAdd.rows);
        res.status(201).json(vehicleAdd.rows);
    }catch (err){
        console.error(err.message)
    }
};

const patchVehicle = async(req, res)=>{
    try{
        const id = req.body.id;
        const vehicle_plate = req.body.vehicle_plate;
        const current_status = req.body.current_status;
        const is_active  = req.body.is_active;
        const vehicleUpdate = await pg_client.query("UPDATE vehicles SET vehicle_plate = $1 , current_status = $2 , is_active = $3 WHERE id = $4 RETURNING *", [vehicle_plate,current_status,is_active,id])
        console.log(vehicleUpdate.rows);
        res.status(201).json(vehicleUpdate.rows);
    }catch (err){
        console.error(err.message)
    }
};

const deleteVehicle = async(req, res)=>{
    try{
        const id = req.body.id;
        const data = await pg_client.query("SELECT * FROM vehicles WHERE id = $1", [id])
       if(data.rowCount>0){
        const vehicleDelete = await pg_client.query("DELETE FROM vehicles  WHERE id = $1", [id])
        res.send("Silme islemi basarilidir");
            res.status(201).json(vehicleDelete.rows);
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
    getVehicle,
    postVehicle,
    patchVehicle,
    deleteVehicle
};