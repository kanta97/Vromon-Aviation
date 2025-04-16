import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './addHotel.css'
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

class addHotel extends Component {
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
        LOCATION: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        TOUR_TYPE: {
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
        }
      },
      formIsValid: false,
      modal: false,
      loader: false,
      tourTypeOption:[],
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
  async componentDidMount(){
    await this.loadTourType()
  }
  async loadTourType(){
    let tour_type = API.loadtourTypeSession()
   // console.log(tour_type)
    this.setState({
      tourTypeOption: tour_type
    })
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

  addHotelHandle = (event) =>{
    event.preventDefault()
    //console.log(this.state)
    let LOCATION = (this.state.controls['LOCATION'].value !== '' && this.state.controls['LOCATION'].value !== null && this.state.controls['LOCATION'].value !== undefined) ? this.state.controls['LOCATION'].value : ''
    let DESCRIPTION = (this.state.controls['DESCRIPTION'].value !== '' && this.state.controls['DESCRIPTION'].value !== null && this.state.controls['DESCRIPTION'].value !== undefined) ? this.state.controls['DESCRIPTION'].value : ''
    let NAME = (this.state.controls['NAME'].value !== '' && this.state.controls['NAME'].value !== null && this.state.controls['NAME'].value !== undefined) ? this.state.controls['NAME'].value : ''
    let TOUR_TYPE = (this.state.controls['TOUR_TYPE'].value !== '' && this.state.controls['TOUR_TYPE'].value !== null && this.state.controls['TOUR_TYPE'].value !== undefined) ? this.state.controls['TOUR_TYPE'].value : ''

    let data = {
      'location': LOCATION,
      'description': DESCRIPTION,
      'tour_type':  TOUR_TYPE,
      'name':  NAME
    }
  //  console.log(data)
    API.addHotel(data).then(response=>{
      if(response.status === 200){
        if(response.data.status === '200 OK'){
          this.props.onAddHotelResponse(true, response.data.body.msg)
        } else {
          this.props.onAddHotelResponse(false, 'Hotel not added. Invalid data supplied')
        }
      } else {
        this.props.onAddHotelResponse(false, 'Bad request')
      }

    }).catch(error=>{
      this.props.onAddHotelResponse(false, 'Network error')
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
              <Label htmlFor="location">Name</Label>
              <Input type="text" id="name" onChange={event => this.inputChangeHandler(event,'NAME')} placeholder="Enter Name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Location</Label>
              <Input type="text" id="location" onChange={event => this.inputChangeHandler(event,'LOCATION')} placeholder="Enter location" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Tour Type</Label>
              <Input  onChange={event => this.inputChangeHandler(event,'TOUR_TYPE')} type="select" id="tour_type" placeholder="Enter Tour Type">
                <option key={'123'} value="">Select Tour Type</option>
                {
                this.state.tourTypeOption.length > 0 ?
                  this.state.tourTypeOption.map(item=>{
                    return(
                      <option key={item.tour_type} value={item.tour_type}>{item.tour_type}</option>
                    )
                  })
                  : ''
              }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input className='input_resize' col={4} onChange={event => this.inputChangeHandler(event,'DESCRIPTION')} type="textarea" id="description" placeholder="Enter Description" />
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button disabled={!this.state.formIsValid} onClick={this.addHotelHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addHotel;
