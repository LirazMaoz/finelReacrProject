import Joi from 'joi'
import userService from '../services/userService'
import Form from './common/form'
import withRouter from './common/withRouter'
import PageHeader from './pageHeader'
import { Navigate } from 'react-router-dom'

class BusinessSignup extends Form {
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
    name: Joi.string().required().min(2),
  }

  async doSubmit() {
    const { form } = this.state
    const body = { ...form, biz: true }

    try {
      await userService.createUser(body)
      await userService.login(form.email, form.password)
      window.location = '/create-card'
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } })
      }
    }
  }

  render() {
    if (userService.getUser()) {
      return <Navigate to={'/'} />
    }
    return (
      <>
        <PageHeader
          title={
            <>
              {' '}
              Be A VIP User At Shop <i className="bi bi-suit-heart"></i> Now
              App!
            </>
          }
        />
        <div className="row">
          <div className="col-12">
            <p>
              Open Your Free VIP Account In{' '}
              <span className="text-warning">
                Shop <i className="bi bi-suit-heart"></i> Now
              </span>{' '}
              App!
            </p>
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
          {this.renderInput({
            name: 'name',
            lable: 'Name',
            requierd: true,
          })}

          <div className="my-2">{this.renderButton('Sign Up')}</div>
        </form>
      </>
    )
  }
}

export default withRouter(BusinessSignup)
