import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// **--REGISTER USER __**

export const register = async (req,res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
            friends,

        } = req.body
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impression: Math.floor(Math.random() * 100000)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
      
        res.status(500).json({error:error.message})
    }
}

//---Logging In ---

export const login = async (req, res) =>{
    try {
        const {email , password} = await req.body
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg: 'User does not exist!'})

       // console.log('User details from auth password:',  user.password)

        const isMatch = await bcrypt.compare(password, user.password)
       // console.log('ismatch result:', isMatch)
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentils'})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(201).json({token , user})
        
    } catch (error) {
        //console.log('error message :', error.message)
        res.status(500).json({error:error.message})
    }
}

