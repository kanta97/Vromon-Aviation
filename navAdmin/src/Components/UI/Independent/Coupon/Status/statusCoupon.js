import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './statusCoupon.css'
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
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

class statusCoupon extends Component {
  constructor(props){
    super(props)
  //  console.log(this.props.modal_data)
    this.state = {
      controls:{
        channel: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        user_id: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        promo_id: {
          value: this.props.modal_data.val,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        }
      },
      options: [],
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

  async componentDidMount(){
    await this.loadUser()
  }

  async loadUser(){
    let data = 'user_type=3'
    API.getAllUser(data).then(res=>{
      if(res.data.success){
        let sub = {}
        let userArray = []
        res.data.data.map((item,index)=>{
          sub = {
            value: item.id, label: item.display_name
          }
          userArray.push(sub)
        })
        this.setState({
          options: userArray
        })
      }
    })
  }

  statusCouponHandle = (event) =>{
    event.preventDefault()
    //console.log(this.state)
    let channel = (this.state.controls['channel'].value !== '' && this.state.controls['channel'].value !== null && this.state.controls['channel'].value !== undefined) ? this.state.controls['channel'].value : ''
    let user_id = (this.state.controls['user_id'].value !== '' && this.state.controls['user_id'].value !== null && this.state.controls['user_id'].value !== undefined && this.state.controls['user_id'].value.length > 0) ? this.state.controls['user_id'].value : ''
    let promo_id = (this.state.controls['promo_id'].value !== '' && this.state.controls['promo_id'].value !== null && this.state.controls['promo_id'].value !== undefined) ? this.state.controls['promo_id'].value : 0
    if(channel!=='' && user_id !== '' && promo_id !== ''){
      let userArray = []
      user_id.map(item=>{
        userArray.push(item.value)
      })
      let data = {
        'channel': channel,
        'user_id': userArray,
        'promo_id': promo_id
      }
      //console.log(data)
      API.statusCoupon(data).then(response=>{
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            this.props.onStatusCouponResponse(true, response.data.body.msg)
          } else {
            this.props.onStatusCouponResponse(false, 'Coupon not assigned.')
          }
        } else {
          this.props.onStatusCouponResponse(false, 'Bad request')
        }

      })
    } else {
      this.props.onStatusCouponResponse(false, 'Network error')
    }

  };

  inputChangeHandler = (event, controlName) =>{
    if(controlName === 'channel'){
      event.preventDefault()
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event.target.value,
          touched: true
        })
      })

      this.setState( { controls: updatedControls} )
      //.log(updatedControls)
    } else {
    //  console.log(event)
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event,
          touched: true
        })
      })
      this.setState( { controls: updatedControls } )
     // console.log(updatedControls)
    }

  }

  render() {
    return (
      <div>
        <Col xs="12">
          <form>
            <FormGroup row className="my-0">
              <Col xs="6">
            <FormGroup>
              <Label htmlFor="channel">Channel</Label>
              <Input type="select" id="channel" onChange={event => this.inputChangeHandler(event,'channel')} placeholder="Enter channel">
                <option key={'1'} value="">Select Channel</option>
                <option key={'2'} value="SMS">SMS</option>
                <option key={'3'} value="EMAIL">Email</option>
                  <option key={'4'} value="BOTH">BOTH</option>
              </Input>
            </FormGroup>
              </Col>
              <Col xs="6">
            <FormGroup>
              <Label htmlFor="user_id">User</Label>
              <Select
                name="form-field-name2"
                value={this.state.controls.user_id.value}
                onChange={event => this.inputChangeHandler(event,'user_id')}
                options={this.state.options}
                multi
              />
            </FormGroup>
              </Col>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button onClick={this.statusCouponHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default statusCoupon;


