
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYourName;

//middleware
const verifyToken = async(req, resizeBy, next)=>{
    const token = req.headers.token;

    if(!token){
        return resizeBy.status(401).json({error:"Token is required"});
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const vendor = await Vendor.findById(decoded.vendorId);
        //here we have decoded the ID which is from databse to compare both db and req ID
        if(!vendor){
            return resizeBy.status(404).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id

        next()
    }catch (error){
        console.error(error)
        return res.status(500).json({error:"invalid token"})
    }
}

module.exports = verifyToken