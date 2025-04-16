import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './editActivity.css'
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

class addActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
      db_id: this.props.modal_data.id,
      controls:{
        LOCATION: {
          value: this.props.modal_data.location,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        DESCRIPTION: {
          value: this.props.modal_data.description,
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        HOUR: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        DAY: {
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

  async componentDidMount(){
    await this.getDay(this.props.modal_data.duration)
    await this.getHour(this.props.modal_data.duration)
  }
  async getHour (val){
    let hour = Math.floor(val%24)
   // console.log(hour)

    const updatedControls =  updateObject(this.state.controls,
      {
        ['HOUR']:  updateObject( this.state.controls['HOUR'], {
          value: hour,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        })
      })
    this.setState( { controls: updatedControls, formIsValid: true } )
  }
  async getDay(val){
    let day = Math.floor(val/24)
    //console.log(day)
    const updatedControls =  updateObject(this.state.controls,
      {
          ['DAY']:  updateObject( this.state.controls['DAY'], {
            value: day,
            validation: {
              required: false
            },
            valid: true,
            touched: false
        })

    })
    this.setState( { controls: updatedControls, formIsValid: true } )
  }

  editActivityHandle = (event) =>{
    event.preventDefault()
    //console.log(this.state)
    let LOCATION = (this.state.controls['LOCATION'].value !== '' && this.state.controls['LOCATION'].value !== null && this.state.controls['LOCATION'].value !== undefined) ? this.state.controls['LOCATION'].value : ''
    let DESCRIPTION = (this.state.controls['DESCRIPTION'].value !== '' && this.state.controls['DESCRIPTION'].value !== null && this.state.controls['DESCRIPTION'].value !== undefined) ? this.state.controls['DESCRIPTION'].value : ''
    let HOUR = (this.state.controls['HOUR'].value !== '' && this.state.controls['HOUR'].value !== null && this.state.controls['HOUR'].value !== undefined && this.state.controls['HOUR'].value > 0 ) ? this.state.controls['HOUR'].value : 0
    let DAY = (this.state.controls['DAY'].value !== '' && this.state.controls['DAY'].value !== null && this.state.controls['DAY'].value !== undefined && this.state.controls['DAY'].value > 0 ) ? this.state.controls['DAY'].value : 0

    if(DAY > 0 || HOUR > 0){
      let DURATION = parseInt(DAY)*24 + parseInt(HOUR)
      let data = {
        'location': LOCATION,
        'description': DESCRIPTION,
        'duration':  DURATION.toString(),
          'updatedBy':localStorage.getItem('number')
      }
      //console.log(data)
      API.editActivity(data, this.state.db_id).then(response=>{
        if(response.status === '200'){
          if(response.data.status === '200 OK'){
            this.props.onEditActivityResponse(true, response.data.body)
          } else {
            this.props.onEditActivityResponse(false, 'Activity not added. Invalid data supplied')
          }
        } else {
          this.props.onEditActivityResponse(false, 'Bad Request')
        }

      }).catch(error=>{
        this.props.onEditActivityResponse(false, 'Network error found')
      })

    } else {
      this.setState({
        modal: true,
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: 'Please enter day or hour'
      })
    }
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
              <Label htmlFor="location">Location</Label>
              <Input value={this.state.controls.LOCATION.value} type="text" id="location" onChange={event => this.inputChangeHandler(event,'LOCATION')} placeholder="Enter location" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input className='input_resize' col={4} value={this.state.controls.DESCRIPTION.value} onChange={event => this.inputChangeHandler(event,'DESCRIPTION')} type="textarea" id="description" placeholder="Enter Description" />
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="day">Day</Label>
                  <Input type="number" min="0" id="day" value={this.state.controls.DAY.value} onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="hour">Hour</Label>
                  <Input type="number" min="0" id="hour" value={this.state.controls.HOUR.value} onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                </FormGroup>
              </Col>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button onClick={this.editActivityHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addActivity;
