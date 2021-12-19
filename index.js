const express = require('express')
const app = express()
const quizzesCtrl = require('./src/controllers/quizzes')
const questionCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')
const quiz = require('./src/models/quiz')
const authRouter = require('./src/controllers/auth')
var session = require('express-session')
const { Quiz } = require('./src/models')
const isAuthenticated = require('./src/middleware/auth')
const cors = require('cors')

app.use(cors())

app.use(session(
    {
        secret:"keyboard cat",
        cookie: { maxAge:60000 },
        saveUninitialized: false
    }
))
app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

//GET / HTTP/1.1
app.get('/', async (req, res) =>{
    // res.send('Home Page! GET...')
    const quiz = await Quiz.findByPk(1)
    res.render('home/home')
})

app.use('/quizzes', isAuthenticated, quizzesCtrl)
app.use('/questions', isAuthenticated, questionCtrl)
app.use('/choices', isAuthenticated, choicesCtrl)
app.use('/auth', authRouter)

// //POST / HTTP/1.1
// app.post('/', (req, res) =>{
//     res.send('Home Page! POST...')
// })

// //GET /products HTTP/1.1
// app.get('/products', (req, res) =>{
//     res.send('All products...')
// })

// // POST /products HTTP/1.1
// app.post('/products', (req, res) =>{
//     res.send('Created new product...')
// })

// //POST /products/89 HTTP/1.1
// app.post('/products/:productID', (req, res) =>{
//     res.send('Updated a product with an ID of ' + req.params.productID)
// })

// // GET /products/nike-large-white-shoe HTTP/1.1
// app.get('/products/:productName', (req, res) =>{
//     res.send('Product Page! Product name: ' + req.params.productName)
// })

app.listen(3000)

//in terminal
//curl -x GET http://localhost:3000
//curl -x POST http://localhost:3000
