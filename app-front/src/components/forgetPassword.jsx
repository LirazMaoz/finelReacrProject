import Joi from 'joi'
import { Navigate } from 'react-router-dom'
import ResetPassword from './resetPassword'
import userService from '../services/userService'
import Form from './common/form'
import { toast } from 'react-toastify'
import './css/sign-in.css'

class ForgetPassword extends Form {
  state = {
    form: {
      email: '',
    },
    token: '',
    reset_password: false,
  }

  schema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .email({ tlds: { allow: false } })
      .required(),
  }

  async doSubmit() {
    const { email } = this.state.form

    try {
      toast.success('Password reset has been Sent! check out your email.')
      await userService.forgetPassword(email)
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data)
      }
    }
  }

  componentDidMount() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })

    const token = params.token

    if (token) {
      this.setState({ reset_password: true, token })
    }
  }

  render() {
    if (userService.getUser()) {
      return <Navigate to="/" />
    }

    return (
      <div className="login-page">
        {this.state.reset_password ? (
          <ResetPassword token={this.state.token} />
        ) : (
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <h2>Forgot Password</h2>
            <p>Enter your email here</p>
            {this.renderInput({
              name: 'email',
              lable: 'Email:',
              type: 'email',
              required: true,
            })}

            <div className="btn-row mt-3">
              {this.renderButton('Send Email')}
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default ForgetPassword
