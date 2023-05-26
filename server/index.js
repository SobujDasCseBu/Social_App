import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import userRoutes from './routes/users.js'
import postRoute from './routes/posts.js'
import {register} from './controllers/auth.js'
import {createPost} from './controllers/post.js'
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv' 
import { verifyToken } from './middleware/auth.js'

import Post from './models/Post.js'
import User from './models/User.js'
import {posts , users}  from './data/index.js'
dotenv.config()

//**--CONFIGURATION--**

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use('/assets', express.static(path.join(__dirName, 'public/assets')))

// ***---FILE STORAGE ---***

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/assets')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

// **---Route with files ---**
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken,upload.single('picture'), createPost)
// ---Routes---

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoute)

// ***---MONGOOSE_SETUP ---***

const PORT = process.env.PORT || 6001
//console.log(`Mongo URl : ${process.env.PORT}`)
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
}).then(() =>{
        app.listen(PORT , ()=>console.log(`Server Port: ${PORT}`))

        /*Add data one time */
        // User.insertMany(users)
        // Post.insertMany(posts)


    }).catch((error)=>console.log(`${error} did not connect`))