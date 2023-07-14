import express from 'express'
import {
  userRegisterController,
  login,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', userRegisterController)
router.post('/login', login)

export default router
