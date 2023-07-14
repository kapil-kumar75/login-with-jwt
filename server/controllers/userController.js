import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userRegisterController = async (req, res) => {
  try {
    const {name, email, password} = req.body
    let msg = ''
    let invalid = false

    if (!name) {
      invalid = true
      msg = 'Name is required'
    } else if (!email) {
      invalid = true
      msg = 'Email is required'
    } else if (!password) {
      invalid = true
      msg = 'Password is required'
    }

    if (invalid) {
      return res.status(201).send({
        success: false,
        message: msg,
      })
    }

    const existUser = await userModel.findOne({email})
    if (existUser) {
      return res.status(201).send({
        success: false,
        message: 'User already register',
      })
    }

    let hashedPassword
    if (password) {
      const salt = 10
      hashedPassword = await bcrypt.hash(password, salt)
    }

    const userData = new userModel({
      name,
      email,
      password: hashedPassword,
    })
    const user = await userData.save()
    if (user) {
      return res.status(200).send({
        success: true,
        message: 'Registration has been successfully',
        user,
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    let JWT_SECRET = 'sjkdfjkasdfjkgajkds'
    let msg = ''
    let invalid = false

    if (!email) {
      invalid = true
      msg = 'Email is required'
    } else if (!password) {
      invalid = true
      msg = 'Password is required'
    }

    if (invalid) {
      return res.status(201).send({
        success: false,
        message: msg,
      })
    }

    const existUser = await userModel.findOne({email})

    if (!existUser) {
      return res.status(201).send({
        success: true,
        message: 'User is not register',
      })
    }

    const match = await bcrypt.compare(password, existUser.password)

    if (!match) {
      return res.status(201).send({
        success: false,
        message: 'Invalid password',
      })
    }
    let token = await jwt.sign(
      {_id: existUser._id, name: existUser?.name, email: existUser?.email},
      JWT_SECRET,
      {expiresIn: '7d'}
    )
    if (existUser) {
      req.session.user_id = existUser._id
      return res.status(200).send({
        success: true,
        message: 'User login successfully',
        user: existUser,
        token,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}
