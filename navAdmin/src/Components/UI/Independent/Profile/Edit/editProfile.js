import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './editProfile.css'
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

class editProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      db_id: this.props.modal_data.id,
      controls:{

          USERNAME: {
              value: this.props.modal_data.usernm,
              validation: {
                  required: false
              },
              valid: true,
              touched: false
          },
        DISPLAY_NAME: {
          value: this.props.modal_data.display_name,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        PHONE_NO: {
          value: this.props.modal_data.phone_no,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        EMAIL: {
          value: this.props.modal_data.email,
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
    };
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
  }

  editHotelHandle = (event) =>{
    event.preventDefault()
   // console.log(this.state)
    let DISPLAY_NAME = (this.state.controls['DISPLAY_NAME'].value !== '' && this.state.controls['DISPLAY_NAME'].value !== null && this.state.controls['DISPLAY_NAME'].value !== undefined) ? this.state.controls['DISPLAY_NAME'].value : ''
    let PHONE_NO = (this.state.controls['PHONE_NO'].value !== '' && this.state.controls['PHONE_NO'].value !== null && this.state.controls['PHONE_NO'].value !== undefined) ? this.state.controls['PHONE_NO'].value : ''
    let EMAIL = (this.state.controls['EMAIL'].value !== '' && this.state.controls['EMAIL'].value !== null && this.state.controls['EMAIL'].value !== undefined) ? this.state.controls['EMAIL'].value : ''
      let USERNAME = (this.state.controls['USERNAME'].value !== '' && this.state.controls['USERNAME'].value !== null && this.state.controls['USERNAME'].value !== undefined) ? this.state.controls['USERNAME'].value : ''

    let data = {
      'display_name': DISPLAY_NAME,
      'phone_no': PHONE_NO,
      'email': EMAIL,
        'username':USERNAME,
    }
    //console.log(data)
    API.editUser(data, this.state.db_id).then(response=>{
      if(response.data.success){
        this.props.onEditProfileResponse(true,'Profile Updated')
      } else {
        this.props.onEditProfileResponse(false, 'Info not Edited. Invalid data supplied')
      }
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
              <Label htmlFor="email">Display Name</Label>
              <Input type="text" value={this.state.controls.EMAIL.value} id="email" onChange={event => this.inputChangeHandler(event,'EMAIL')} placeholder="Enter email" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="display_name">Display Name</Label>
              <Input value={this.state.controls.DISPLAY_NAME.value} type="text" id="display_name" onChange={event => this.inputChangeHandler(event,'DISPLAY_NAME')} placeholder="Enter Display Name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input  value={this.state.controls.USERNAME.value} onChange={event => this.inputChangeHandler(event,'USERNAME')} type="text" id="username" placeholder="Enter Username" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone_no">Phone Number</Label>
              <Input className='input_resize' col={4} value={this.state.controls.PHONE_NO.value} onChange={event => this.inputChangeHandler(event,'PHONE_NO')} type="textarea" id="phone_no" placeholder="Enter phone no" />
            </FormGroup>

            <div>
              <div className='text-center'>
                <Button onClick={this.editHotelHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default editProfile;
