const nodemailer = require('nodemailer')
require('dotenv').config()
const { google } = require('googleapis')

/* 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orrmaoz1@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
})

const options = {
  to: 'lirazbaruch62@gmail.com',
  from: 'orrmaoz1@gmail.com',
  subject: `Hello Shop Now User!`,
  text: 'Hi Please Follow The Link Below To Reset Your Password',
}

transporter.sendMail(options, function (err, info) {
  if (err) {
    console.log(err)
    return
  }
  console.log('sent: ' + info.response)
})
 */

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
      html: '<h1>Please Click On The Link Below</h1>',
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
}
sendMail()
  .then((result) => console.log('email sent..', result))
  .catch((error) => console.log(error.message))
