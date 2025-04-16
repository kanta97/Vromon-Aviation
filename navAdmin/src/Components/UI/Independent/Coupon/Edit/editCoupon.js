import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './editCoupon.css'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import * as helper from "../../../../../Helpers";

class addCoupon extends Component {
  constructor(props){
    super(props)
    this.state = {
      db_id: this.props.modal_data.id,
      controls:{
        NAME: {
          value: this.props.modal_data.name,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        DISCOUNT: {
          value: this.props.modal_data.discount,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        VALID_TILL: {
          value: helper.dateYYYMMDDHyphens(this.props.modal_data.valid_till),
          validation: {
            required: false
          },
          valid: true,
          touched: false
        }
      },
      formIsValid: false,
      modal: false,
      loader: false,
      statusPreviewModal: true,
      statusEditModal: true,
      activePreviewModal: false,
      activeEditModal: false,
      successModalTitle: '',
      infoModalTitle: '',
      dangerModalTitle: '',
      warningModalTitle: '',
      successModalBody: '',
      infoModalBody: '',
      dangerModalBody: '',
      warningModalBody: '',
      success: false,
      info: false,
      danger: false,
      warning: false
    }
    this.toggleSuccess = this.toggleSuccess.bind(this)
    this.toggleDanger = this.toggleDanger.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    })
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    })
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    })
  }



  editCouponHandle = (event) =>{
    event.preventDefault()
   // console.log(this.state)
    let NAME = (this.state.controls['NAME'].value !== '' && this.state.controls['NAME'].value !== null && this.state.controls['NAME'].value !== undefined) ? this.state.controls['NAME'].value : ''
    let VALID_TILL = (this.state.controls['VALID_TILL'].value !== '' && this.state.controls['VALID_TILL'].value !== null && this.state.controls['VALID_TILL'].value !== undefined) ? this.state.controls['VALID_TILL'].value : ''
    let DISCOUNT = (this.state.controls['DISCOUNT'].value !== '' && this.state.controls['DISCOUNT'].value !== null && this.state.controls['DISCOUNT'].value !== undefined && this.state.controls['DISCOUNT'].value > 0 ) ? this.state.controls['DISCOUNT'].value : 0

    let data = {
      'name': NAME,
      'discount': DISCOUNT,
      'valid_till': VALID_TILL
    }
    API.editCoupon(data, this.state.db_id).then(response=>{
      if(response.status === 200){
        if(response.data.status === '200 OK'){
          this.props.onEditCouponResponse(true, response.data.body.msg)
        } else {
          this.props.onEditCouponResponse(false, 'Coupon not added. Invalid data supplied')
        }
      } else {
        this.props.onEditCouponResponse(false, 'Bad request')
      }

    }).catch(err=>{
      this.props.onEditCouponResponse(false, 'Network error')
    })


  }

  inputChangeHandler = (event, controlName) =>{
    event.preventDefault()
    const updatedControls = updateObject( this.state.controls, {
      [controlName]: updateObject( this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
        touched: true
      })
    })

    let formIsValid = true
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid
    }
    this.setState( { controls: updatedControls, formIsValid: formIsValid } )
  }

  render() {
    return (
      <div>
        <Col xs="12">
          <form>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" value={this.state.controls.NAME.value} onChange={event => this.inputChangeHandler(event,'NAME')} placeholder="Enter name" />
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="discount">Discount</Label>
                  <Input type="number" min="0" value={this.state.controls.DISCOUNT.value} id="discount" onChange={event => this.inputChangeHandler(event,'DISCOUNT')} placeholder="Enter discount" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="valid_till">Vaild till</Label>
                  <Input type="date" id="valid_till" value={this.state.controls.VALID_TILL.value} onChange={event => this.inputChangeHandler(event,'VALID_TILL')} placeholder="Enter vaild till" />
                </FormGroup>
              </Col>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button onClick={this.editCouponHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
              </div>
            </div>
          </form>
        </Col>
        <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
               className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccess}>{this.state.successModalTitle}</ModalHeader>
          <ModalBody>{this.state.successModalBody}</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleSuccess}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
               className={'modal-danger ' + this.props.className}>
          <ModalHeader toggle={this.toggleDanger}>{this.state.dangerModalTitle}</ModalHeader>
          <ModalBody>{this.state.dangerModalBody}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleDanger}>Cancel</Button>{' '}
          </ModalFooter>
        </Modal>
        <Modal backdrop='static' size='md' isOpen={this.state.warning} toggle={this.toggleWarning}
               className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning}>{this.state.warningModalTitle}</ModalHeader>
          <ModalBody>{this.state.warningModalBody}</ModalBody>
          <ModalFooter>
            <Button color="warning" className='text-white' onClick={this.toggleWarning}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default addCoupon;
