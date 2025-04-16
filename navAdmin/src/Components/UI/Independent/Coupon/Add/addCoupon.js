import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import '../ExcelUploadWindow/addCoupon.css'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
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

class addCoupon extends Component {
  constructor(props){
    super(props)
    this.state = {
      controls:{
        NAME: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        NUMBER: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        DISCOUNT: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        VALID_TILL: {
          value: '',
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

  addCouponHandle = (event) =>{
    event.preventDefault()
  //  console.log(this.state)
    let NAME = (this.state.controls['NAME'].value !== '' && this.state.controls['NAME'].value !== null && this.state.controls['NAME'].value !== undefined) ? this.state.controls['NAME'].value : ''
    let NUMBER = (this.state.controls['NUMBER'].value !== '' && this.state.controls['NUMBER'].value !== null && this.state.controls['NUMBER'].value !== undefined && this.state.controls['NUMBER'].value > 0) ? this.state.controls['NUMBER'].value : ''
    let DISCOUNT = (this.state.controls['DISCOUNT'].value !== '' && this.state.controls['DISCOUNT'].value !== null && this.state.controls['DISCOUNT'].value !== undefined && this.state.controls['DISCOUNT'].value > 0 ) ? this.state.controls['DISCOUNT'].value : 0
    let VALID_TILL = (this.state.controls['VALID_TILL'].value !== '' && this.state.controls['VALID_TILL'].value !== null && this.state.controls['VALID_TILL'].value !== undefined) ? this.state.controls['VALID_TILL'].value : 0

    let data = {
      'name': NAME,
      'numberofpromo': NUMBER,
      'discount': DISCOUNT,
      'valid_till': VALID_TILL
    }
    //console.log(data)
    API.addCoupon(data).then(response=>{
      if(response.status === 200){
        if(response.data.status === '200 OK'){
          this.props.onAddCouponResponse(true, response.data.body.msg)
        } else {
          this.props.onAddCouponResponse(false, 'Coupon not added. Invalid data supplied')
        }
      } else {
        this.props.onAddCouponResponse(false, 'Bad request')
      }

    }).catch(error=>{
      this.props.onAddCouponResponse(false, 'Network error')
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
            <FormGroup row className="my-0">
              <Col xs="6">
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" onChange={event => this.inputChangeHandler(event,'NAME')} placeholder="Enter name" />
            </FormGroup>
              </Col>
              <Col xs="6">
            <FormGroup>
              <Label htmlFor="number">Number of promo</Label>
              <Input min="0" onChange={event => this.inputChangeHandler(event,'NUMBER')} type="number" id="number" placeholder="Enter number of promo" />
            </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="discount">Discount</Label>
                  <Input type="number" min="0" id="discount" onChange={event => this.inputChangeHandler(event,'DISCOUNT')} placeholder="Enter discount" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="valid_till">Vaild till</Label>
                  <Input type="date" id="valid_till" onChange={event => this.inputChangeHandler(event,'VALID_TILL')} placeholder="Enter vaild till" />
                </FormGroup>
              </Col>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button disabled={!this.state.formIsValid} onClick={this.addCouponHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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
