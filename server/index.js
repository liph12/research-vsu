require('dotenv').config()

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user-model')
const Client = require('./models/client-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: ['https://hidden-river-10555.herokuapp.com'],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(
    process.env.DB_HOST,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.post('/api/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        })
        res.status(200).res.json({
            isRegistered : true, 
            message: 'Account registered successfully.'
        })
    }catch(e){
        res.status(202).res.json({
            isRegistered : false, 
            message: 'Email is already been used.'
        })
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({
        email: req.body.email
    })
    if(user){
        const passwordVerified = await bcrypt.compare(req.body.password, user.password);

        if(passwordVerified){
            const accessToken = generateAccessToken(user, res);

            res.json({
                message: 'You are now logged in.', 
                success: true, 
                user: {accessToken: accessToken, email: user.email}
            })
        }else{
            res.json({
                message: 'Invalid password.', 
                success: false
            })
        }
    }else{
        res.json({
            message: 'Invalid email supplied.',
            success: false
        })
    }
})

const generateAccessToken = (user, res) => {
    const maxAge = 3 * 24 * 60 * 60;
    const accessToken = jwt.sign({
        id: user._id
    },process.env.ACCESS_TOKEN_SECRET, { expiresIn :  '60m'})

    res.cookie('jwt', accessToken, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge
    })

    return accessToken;
}

//middleware
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(405).json({message: 'Not permitted.'});
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(202).json({auth: false, message: 'Session is expired.'})
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/api/auth', verifyAccessToken, (req, res) => {
    res.status(200).json({auth: true, message: 'User authenticated.'})
})

app.post('/api/add', verifyAccessToken, async (req, res) => {
    try{
        const client = await Client.create({
            userId: mongoose.Types.ObjectId(req.userId),
            LRN: req.body.LRN,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        res.json({
            isRegistered : true, 
            message: 'Account registered successfully.'
        })
    }catch(e){
        res.json({
            isRegistered : false, 
            message: 'LRN is already taken.'
        })
    }
})

app.get('/api/enrolls', verifyAccessToken, (req, res) => {
    const client = Client.find((err, data) => {
        res.json(data)
    })
})

app.get('/api/count-enrolls', verifyAccessToken, (req, res) => {
    const client = Client.count((err, count) => {
        res.json({schoolYear: "2022 - 2021", count : count})
    })
})

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})