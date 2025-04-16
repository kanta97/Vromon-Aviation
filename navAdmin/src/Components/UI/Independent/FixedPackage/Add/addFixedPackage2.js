import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './addFixedPackage.css'
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

const tour_type_array = [
  'REGULAR',
  'PREMIUM',
  'DELUXE'
]
const hotel_array = [
  {
    'id':123,
    'name': 'La meridian'
  },
  {
    'id':124,
    'name': 'Western'
  },{
    'id':125,
    'name': 'Radisson'
  }
]

class addFixedPackage extends Component {
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

  addFixedPackageHandle = (event) =>{
    event.preventDefault()
    console.log(this.state)
    let LOCATION = (this.state.controls['LOCATION'].value !== '' && this.state.controls['LOCATION'].value !== null && this.state.controls['LOCATION'].value !== undefined) ? this.state.controls['LOCATION'].value : ''
    let DESCRIPTION = (this.state.controls['DESCRIPTION'].value !== '' && this.state.controls['DESCRIPTION'].value !== null && this.state.controls['DESCRIPTION'].value !== undefined) ? this.state.controls['DESCRIPTION'].value : ''
    let HOUR = (this.state.controls['HOUR'].value !== '' && this.state.controls['HOUR'].value !== null && this.state.controls['HOUR'].value !== undefined && this.state.controls['HOUR'].value > 0 ) ? this.state.controls['HOUR'].value : 0
    let DAY = (this.state.controls['DAY'].value !== '' && this.state.controls['DAY'].value !== null && this.state.controls['DAY'].value !== undefined && this.state.controls['DAY'].value > 0 ) ? this.state.controls['DAY'].value : 0

    if(DAY > 0 || HOUR > 0){
      let DURATION = parseInt(DAY)*24 + parseInt(HOUR)
      let data = {
        'location': LOCATION,
        'description': DESCRIPTION,
        'duration':  DURATION.toString()
      }
      console.log(data)
      API.addFixedPackage(data).then(response=>{
        if(response.data.status === '200 OK'){
          this.props.onAddFixedPackageResponse(true, response.data.body.msg)
        } else {
          this.props.onAddFixedPackageResponse(false, 'FixedPackage not added. Invalid data supplied')
        }
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

    let tours = hotel_array.map((hotels,index)=>{
      let tour = tour_type_array.map(item=> {
        let hotel_id = `hotel_id_${item}`;
        let price = `price_${item}`;
        let currency = `currency_${item}`;
        return(
          <FormGroup key={item} row className="my-0">
            <Col xs="2">
              <FormGroup>
                <Label className={'tour_type_margin_top'} htmlFor="day">{item}</Label>
              </FormGroup>
            </Col>
            <Col xs="5">
              <FormGroup>
                <Label htmlFor="day">Amount</Label>
                <Input type="number" min="0" onChange={event => this.inputChangeHandler(event,'Amount')} placeholder="Enter Amount" />
              </FormGroup>
            </Col>
            <Col xs="5">
              <FormGroup>
                <Label htmlFor="hour">Currency</Label>
                <Input type="select" onChange={event => this.inputChangeHandler(event,'Currency')} >
                  <option value="0">TK</option>
                  <option value="1">Dollor</option>
                  <option value="2">Rupee</option>
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
        )
      })
      return(
        <div key={index}>
          <Card>
            <CardHeader>
              Hotel - {hotels.name}
            </CardHeader>
            <CardBody>
              {tour}
            </CardBody>
          </Card>
        </div>
      )
    })


    return (
      <div>
        <Col xs="12">
          <form>
            <Card>
              <CardHeader>
                Package info
              </CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="origin">Origin</Label>
                      <Input type="text" id="origin" onChange={event => this.inputChangeHandler(event,'origin')} placeholder="Enter Origin" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Destination</Label>
                      <Input type="text" id="destination" onChange={event => this.inputChangeHandler(event,'destination')} placeholder="Enter Destination" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="description" onChange={event => this.inputChangeHandler(event,'description')} placeholder="Enter Description" />
                    </FormGroup>
                  </Col>

                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="start_date">Start Day</Label>
                      <Input type="date" id="start_date" onChange={event => this.inputChangeHandler(event,'Start Day')} placeholder="Enter Start Day" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="end_date">End Day</Label>
                      <Input type="date" id="end_date" onChange={event => this.inputChangeHandler(event,'End Day')} placeholder="Enter End Day" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="exclusions">Exclusions</Label>
                      <Input type="text" id="exclusions" onChange={event => this.inputChangeHandler(event,'exclusions')} placeholder="Enter Exclusions" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="inclusions">Inclusions</Label>
                      <Input type="text" id="inclusions" onChange={event => this.inputChangeHandler(event,'inclusions')} placeholder="Enter Inclusions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="itinerary">Itinerary</Label>
                      <Input type="text" id="itinerary" onChange={event => this.inputChangeHandler(event,'itinerary')} placeholder="Enter Itinerary" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="minimum_number_people">Min people</Label>
                      <Input type="text" id="minimum_number_people" onChange={event => this.inputChangeHandler(event,'minimum_number_people')} placeholder="Enter Min people" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input type="select" id="status" onChange={event => this.inputChangeHandler(event,'status')} placeholder="Enter Status">
                        <option value="1">active</option>
                        <option value="2">inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="featured">Featured</Label>
                      <Input type="select" id="featured" onChange={event => this.inputChangeHandler(event,'featured')} placeholder="Enter Featured">
                        <option value="1">is featured</option>
                        <option value="2">not featured</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Price
              </CardHeader>
              <CardBody>
                {tours}
                {/*<FormGroup row className="my-0">
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="day">Day</Label>
                      <Input type="number" min="0" id="day" onChange={event => this.inputChangeHandler(event,'DAY')} placeholder="Enter day" />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="hour">Hour</Label>
                      <Input type="number" min="0" id="hour" onChange={event => this.inputChangeHandler(event,'HOUR')} placeholder="Enter Hour" />
                    </FormGroup>
                  </Col>
                </FormGroup>*/}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Resource
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
            <div>
              <div className='text-center'>
                <Button disabled={!this.state.formIsValid} onClick={this.addFixedPackageHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addFixedPackage;
