const express = require('express')
const router = express.Router()
const { Question, Choice, Quiz } = require('../models/index')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async (req, res) =>{
    // res.send("Question Index")
    const questions = await Question.findAll({
        include: [Choice]
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(questions)
    }else{
        res.render("question/index", { questions })
    }
})

router.get('/new', async (req, res) =>{
    const quizzes = await Quiz.findAll()
    res.render('question/create', { quizzes })
})

//curl -X POST --data "id=4&name=ASLTest4" http://localhost:3000/questions
router.post('/', async (req, res) =>{
    const questions = await Question.create({ ...req.body })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(questions)
    }else{
        res.redirect("questions/" + questions.id)
    }
    // res.send("Question Create")
})

router.get('/:id', async (req, res) =>{
    const question = await Question.findByPk(req.params.id)
    // res.send("Question Show")
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(question)
    }else{
        res.render("question/show", { question })
    }
})

router.get('/:id/edit', async (req, res) =>{
    const question = await Question.findByPk(req.params.id)
    const quizzes = await Quiz.findAll()
    // res.send("Question Show")
    res.render("question/edit", { question, quizzes })
})

router.post('/:id', async (req, res) =>{
    const { id } = req.params
    const question = await Question.update({ ...req.body }, {
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json(question)
    }else{
        res.redirect("/questions/" + id)
    }
    // res.send("Question Update")
})

router.get('/:id/delete', async (req, res) =>{
    const { id } = req.params
    const deleted = await Question.destroy({
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1){
        res.json({'success':deleted})
    }else{
        res.redirect('/questions')
    }
})

module.exports = router