const express = require('express')
const authRouter = express.Router()
const axios = require('axios')
const queryString = require('querystring')
const { LoginToken } = require('../models/index')

const client_id = "a9a5ffb4747f89ad5277"
const client_secret = "b57128a4237e73e042742fdf8a19560c52a07eb5"

authRouter.get("/login", (req, res) =>{
    res.render("auth/login")
})

authRouter.get('/callback', async (req, res) =>{
    console.log('=====================GITHUB RESPONSE=====================')
    console.log(req.query)
    console.log('=====================GITHUB RESPONSE=====================')
    const { code } = req.query
    const response = await axios.post("https://github.com/login/oauth/access_token", {
        code,
        client_id,
        client_secret
    })
    const { access_token } = queryString.parse(response.data)
    console.log(access_token)
    req.session.access_token = access_token
    const loginToken = await LoginToken.create({ token:access_token })
    res.redirect('http://localhost:3001?token=' + access_token)
})

authRouter.get('/token', async (req,res) =>{
    const token = await LoginToken.findOne({ where: {
        token: req.headers.token
    } })
    if(token){
        req.session.access_token = req.headers.token
        //^
        res.json(token)
    }else{
        res.json({ token: false })
    }
})

module.exports = authRouter;