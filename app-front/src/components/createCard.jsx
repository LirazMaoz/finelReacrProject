import Joi from 'joi'
import { toast } from 'react-toastify'
import cardsService from '../services/cardsService'
import Form from './common/form'
import withRouter from './common/withRouter'
import PageHeader from './pageHeader'

class CreateCard extends Form {
  state = {
    form: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizImage: '',
    },
  }

  schema = {
    bizName: Joi.string().min(2).max(255).required().label('Name'),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label('Description'),
    bizAddress: Joi.string().min(2).max(400).required().label('Address'),
    bizPhone: Joi.string()
      .label('Phone')
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).label('Image').allow(''),
  }

  async doSubmit() {
    console.log('submitted', this.state.form)
    const {
      form: { bizImage, ...body },
    } = this.state

    if (bizImage) {
      body.bizImage = bizImage
    }

    try {
      await cardsService.createCard(body)
      toast('Your New Card Is Succesfuly Opend!')
      this.props.navigate('/my-cards')
    } catch ({ response }) {
      if (response && response === 400) {
        this.state({ errors: { bizImage: response.data } })
      }
    }
  }

  render() {
    return (
      <>
        <PageHeader
          title={
            <>
              {' '}
              Create A new Card With Shop <i className="bi bi-bag"></i> Now App!
            </>
          }
        />
        <div className="row">
          <div className="col-12">
            <p>
              Create Your New Buisiness Card In Shop Now App!{' '}
              <span className="text-warning">
                Shop <i className="bi bi-bag"></i> Now
              </span>{' '}
              App!
            </p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} noValidate autoCapitalize="off">
          {this.renderInput({ name: 'bizName', lable: 'Buisiness Name' })}
          {this.renderInput({
            name: 'bizDescription',
            lable: 'Buisiness Description',
          })}
          {this.renderInput({ name: 'bizAddress', lable: 'Buisiness Address' })}
          {this.renderInput({ name: 'bizPhone', lable: 'Buisiness Phone' })}
          {this.renderInput({ name: 'bizImage', lable: 'Buisiness Image' })}

          <div className="my-2">{this.renderButton('Create Card')}</div>
        </form>
      </>
    )
  }
}

export default withRouter(CreateCard)
