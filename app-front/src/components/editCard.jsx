import React, { Component } from 'react'
import withRouter from './common/withRouter'
import Joi from 'joi'
import cardsService from '../services/cardsService'
import { toast } from 'react-toastify'
import PageHeader from './pageHeader'
import Form from './common/form'

class EditCard extends Form {
  state = {
    form: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizImage: '',
    },
  }
  async componentDidMount() {
    const cardId = this.props.params.id

    const { data } = await cardsService.getCard(cardId)
    this.setState({ form: this.mapToViewMode(data) })
  }

  mapToViewMode({
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
  }) {
    return { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage }
  }

  handelCancel = (e) => {
    e.preventDefault()
    this.props.navigate('/my-cards')
  }
  schema = {
    _id: Joi.string().required(),
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
    try {
      await cardsService.editCard(this.state.form)
      toast('card is updated')
      this.props.navigate('/my-cards')
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { bizImage: response.data } })
      }
    }
  }

  render() {
    return (
      <>
        <PageHeader title={<> Edit The Card Here!</>} />
        <div className="row">
          <div className="col-12">
            <p>Edit The Buisness Card</p>
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

          <button
            onClick={this.handelCancel}
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>

          <div className="my-2">{this.renderButton('Save Changes')}</div>
        </form>
      </>
    )
  }
}

export default withRouter(EditCard)
