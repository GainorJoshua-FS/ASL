const express = require('express')
const router = express.Router()
const { Choice, Question } = require('../models/index')
const bodyParser = require('body-parser')
const choice = require('../models/choice')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async (req, res) =>{
    // res.send("Choice Index")
    const choices = await Choice.findAll()
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(choices)
    }else{
        res.render("choice/index", { choices })
    }
})

router.get('/new', async (req, res) =>{
    const questions = await Question.findAll()
    res.render('choice/create', { questions })
})

//curl -X POST --data "id=4&name=ASLTest4" http://localhost:3000/choices
router.post('/', async (req, res) =>{
    const choice = await Choice.create({ ...req.body })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(choice)
    }else{
        res.redirect("/choices/" + choice.id)
    }
    // res.send("Choice Create")
})

router.get('/:id', async (req, res) =>{
    const choice = await Choice.findByPk(req.params.id)
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(choice)
    }else{
        res.render("choice/show", { choice })
    }
})

router.get('/:id/edit', async (req, res) =>{
    const choice = await Choice.findByPk(req.params.id)
    const questions = await Question.findAll()
    res.render('choice/edit', { choice, questions })
})

router.post('/:id', async (req, res) =>{
    // const { name } = req.body
    const { id } = req.params
    const choice = await Choice.update({ ...req.body }, {
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(choice)
    }else{
        res.redirect("/choices/" + id)
    }
    // res.send("Choice Update")
})

router.get('/:id/delete', async (req, res) =>{
    const { id } = req.params
    const deleted = await Choice.destroy({
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json({'success':deleted})
    }else{
        res.redirect('/choices')
    }
})

module.exports = router