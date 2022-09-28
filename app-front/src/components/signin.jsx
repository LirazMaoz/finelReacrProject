import Joi from 'joi'
import { Link, Navigate, NavLink } from 'react-router-dom'
import userService from '../services/userService'
import Form from './common/form'
import withRouter from './common/withRouter'
import PageHeader from './pageHeader'
import './css/sign-in.css'
import { toast } from 'react-toastify'
class Signup extends Form {
  state = {
    form: {
      email: '',
      password: '',
      name: '',
    },
  }

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
  }
  async doSubmit() {
    const { email, password } = this.state.form

    try {
      await userService.login(email, password)
      window.location = '/'
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data)
      }
    }
  }

  render() {
    if (userService.getUser()) {
      return <Navigate to="/" />
    }
    return (
      <>
        <PageHeader
          title={
            <>
              {' '}
              Sign In To Shop <i className="bi bi-suit-heart"></i> Now App!
            </>
          }
        />
        <div className="row">
          <div className="col-12 text-center">
            <p>
              Login To{' '}
              <span className="text-warning">
                Shop <i className="bi bi-suit-heart"></i> Now
              </span>{' '}
              App!
            </p>
            <h3 className="fw-bold text-center">
              Only A VIP's Users Can Add To Cart. <br />
              Login Or{' '}
              <Link className="register" to="/signup-biz">
                Register
              </Link>{' '}
              Now
            </h3>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} noValidate autoCapitalize="off">
          {this.renderInput({
            name: 'email',
            lable: 'Email',
            type: 'email',
            requierd: true,
          })}
          {this.renderInput({
            name: 'password',
            lable: 'Password',
            type: 'password',
            requierd: true,
          })}

          <div className="my-2">{this.renderButton('Sign In')}</div>
        </form>

        <div className="register mb-3 text-center">
          <NavLink to="/forget-password">Forgot Your Password?</NavLink>
        </div>
      </>
    )
  }
}

export default withRouter(Signup)
