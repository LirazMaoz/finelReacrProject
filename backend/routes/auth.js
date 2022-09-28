require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../models/user.js')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('config')

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password.')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.')

  res.json({ token: user.generateAuthToken() })
})

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })

  return schema.validate(req)
}

router.post('/', async (req, res) => {
  // Validate user's inputs
  const { error } = validateUser(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Validate system
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(400).send('Invaild email or password.')
    return
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password)

  if (!isValidPassword) {
    res.status(400).send('Invaild email or password.')
    return
  }

  // Process
  // Generate jsonwebtoken to Authentication
  const token = user.generateAuthToken()

  // Response

  res.json({
    token,
  })
})

// FORGET PASSWORD

router.post('/forget-password', async (req, res) => {
  const { error } = validateForgetPassword(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(400).send('Invaild email.')
    return
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    config.get('jwtKey'),
  )

  user.reset_token = token

  await user.save()

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRACT_URI,
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken()
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'oAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      })
      const mailOptions = {
        from: `Shop Now <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Password Reset Request for Shop Now',
        text: 'Please Click On The Link Below',
        html: `<h1>Please Click On The Link Below</h1>
    <a href="http://localhost:3000/reset-password?token=${token}">Reset Link</a>
        `,
      }

      const result = await transporter.sendMail(mailOptions)
      return result
    } catch (error) {
      return error
    }
  }
  sendMail()
    .then((result) => console.log('Email Sent..', result))
    .catch((error) => console.log(error.message))
})

function validateForgetPassword(email) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
  })

  return schema.validate(email)
}

// RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  const { error } = validateResetPassword(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  if (req.body.password !== req.body.confirm_password) {
    res.status(400).send('Password is not match.')
    return
  }

  const user = await User.findOne({ reset_token: req.body.token })

  if (!user) {
    res.status(400).send('User does not exist.')
    return
  }

  user.reset_token = null

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(req.body.password, salt)

  await user.save()

  res.json(user)
})

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/,
      )
      .required(),
  })

  return schema.validate(user)
}

function validateResetPassword(password) {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/,
      )
      .required(),
    confirm_password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/,
      )
      .required(),
    token: Joi.string(),
  })

  return schema.validate(password)
}


module.exports = router
