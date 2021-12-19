const express = require('express')
const router = express.Router()
const { Quiz, Question, Choice } = require('../models')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async (req, res) =>{
    // res.send("Quizzes Index")
    const quizzes = await Quiz.findAll({
        include: [
            {model: Question, include: [Choice] }
        ]
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quizzes)
    }else{
        res.render('quiz/index', { quizzes })
    }
})

router.get('/new', (req, res) =>{
    res.render('quiz/create')
})

//curl -X POST --data "id=4&name=ASLTest4" http://localhost:3000/quizzes
router.post('/', async (req, res) =>{
    const quiz = await Quiz.create({ ...req.body })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quiz)
    }else{
        res.redirect('/quizzes/' + quiz.id)
    }
    // res.send("Quizzes Create")
})

router.get('/:id', async (req, res) =>{
    const quiz = await Quiz.findByPk(req.params.id, {
        include: [
            {model: Question, include: [Choice] }
        ]
    })
    // const permissions = await quiz.Question.getPermissions()
    // res.send({ quiz, permissions })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quiz)
    }else{
        res.render('quiz/show', { quiz })
    }
})

router.get('/:id/edit', async (req, res) =>{
    const quiz = await Quiz.findByPk(req.params.id)
    res.render('quiz/edit', { quiz })
})

router.post('/:id', async (req, res) =>{
    const { id } = req.params
    const quiz = await Quiz.update({ ...req.body }, {
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(quiz)
    }else{
        res.redirect('/quizzes/' + id)
    }
    // res.send("Quizzes Update")
})

router.get('/:id/delete', async (req, res) =>{
    const { id } = req.params
    const deleted = await Quiz.destroy({
        where: { id },
        // truncate: true
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json({"success":deleted})
    }else{
        res.redirect('/quizzes')
    }
})

module.exports = router