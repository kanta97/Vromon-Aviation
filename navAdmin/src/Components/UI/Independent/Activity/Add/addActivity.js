import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './addActivity.css'
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

class addActivity extends Component {
  constructor(props){
    super(props)
    this.state = {
      controls:{
        LOCATION: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        DESCRIPTION: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
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
        },
        activityName: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        price: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        resource: {
          value: [],
          validation: {
            required: true
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

  addActivityHandle = (event) =>{
    event.preventDefault()
   // console.log(this.state)
    let LOCATION = (this.state.controls['LOCATION'].value !== '' && this.state.controls['LOCATION'].value !== null && this.state.controls['LOCATION'].value !== undefined) ? this.state.controls['LOCATION'].value : ''
    let DESCRIPTION = (this.state.controls['DESCRIPTION'].value !== '' && this.state.controls['DESCRIPTION'].value !== null && this.state.controls['DESCRIPTION'].value !== undefined) ? this.state.controls['DESCRIPTION'].value : ''
    let HOUR = (this.state.controls['HOUR'].value !== '' && this.state.controls['HOUR'].value !== null && this.state.controls['HOUR'].value !== undefined && this.state.controls['HOUR'].value > 0 ) ? this.state.controls['HOUR'].value : 0
    let DAY = (this.state.controls['DAY'].value !== '' && this.state.controls['DAY'].value !== null && this.state.controls['DAY'].value !== undefined && this.state.controls['DAY'].value > 0 ) ? this.state.controls['DAY'].value : 0
    let activityName = (this.state.controls['activityName'].value !== '' && this.state.controls['activityName'].value !== null && this.state.controls['activityName'].value !== undefined) ? this.state.controls['activityName'].value : 0
    let price = (this.state.controls['price'].value !== '' && this.state.controls['price'].value !== null && this.state.controls['price'].value !== undefined && this.state.controls['price'].value > 0 ) ? this.state.controls['price'].value : 0
    let resource = (this.state.controls['resource'].value !== '' && this.state.controls['resource'].value !== null && this.state.controls['resource'].value !== undefined) ? this.state.controls['resource'].value : 0
   // console.log(activityName)
  //  console.log(price)
  //  console.log(resource)
    if(DAY > 0 || HOUR > 0){
      let DURATION = parseInt(DAY)*24 + parseInt(HOUR)
      let data = {
        'location': LOCATION,
        'description': DESCRIPTION,
        'duration':  DURATION.toString()
      }
      //console.log(data)
      API.addActivity(data).then(response=>{
        if(response.status === '200'){
          if(response.data.status === '200 OK'){
            this.props.onAddActivityResponse(true, response.data.body.msg)
          } else {
            this.props.onAddActivityResponse(false, 'Activity not added. Invalid data supplied')
          }
        } else {
          this.props.onAddActivityResponse(false, 'Bad request')
        }

      }).catch(error=>{
        this.props.onAddActivityResponse(false, 'Network error found')
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
    if(controlName === 'resource'){
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event.target.files,
        //  valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true
        })
      })

      let formIsValid = true
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid
      }
      this.setState( { controls: updatedControls, formIsValid: formIsValid } )
    } else {
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

  }

  render() {
    return (
      <div>
        <Col xs="12">
          <form>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="activityName">Activity</Label>
                  <Input type="text" id="activityName" onChange={event => this.inputChangeHandler(event,'activityName')} placeholder="Enter activity name" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input type="text" id="location" onChange={event => this.inputChangeHandler(event,'LOCATION')} placeholder="Enter location" />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input className='input_resize' col={4} onChange={event => this.inputChangeHandler(event,'DESCRIPTION')} type="textarea" id="description" placeholder="Enter Description" />
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="day">Day</Label>
                  <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="hour">Hour</Label>
                  <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="price">Price</Label>
                  <Input type="number" min="0" id="price" onChange={event => this.inputChangeHandler(event,'price')} placeholder="Enter price" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="resource">Resource</Label>
                  <Input type="file"  id="resource" onChange={event => this.inputChangeHandler(event,'resource')} placeholder="Enter resource" />
                </FormGroup>
              </Col>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button disabled={!this.state.formIsValid} onClick={this.addActivityHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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
