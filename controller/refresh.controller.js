// const path = require('path')
// const pool = require("../database/Config")
// const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
require('dotenv').config()


const refreshController = {
    refresh: (req, res) => {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).end()
        }

        var payload
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }

            return res.status(400).end()
        }

        const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
        if (payload.exp - nowUnixSeconds > 30) {
            return res.status(400).end()
        }

        const newToken = jwt.sign({ phoneNumber: payload.phoneNumber }, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        
        // set cookies
        res.cookie("token", newToken, { maxAge: 8*60*60*1000 })
        res.end()
    }
}

module.exports = refreshController
