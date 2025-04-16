import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import * as helper from '../../../../../Helpers'
import './editFixedPackage.css'
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

const tour_type_array = [
  'REGULAR',
  'PREMIUM',
  'DELUXE'
]

class editFixedPackage extends Component {
  constructor(props){
    super(props)

    console.log(this.props.modal_data)

    this.state = {
      isChanged: 0,
      package_id: this.props.modal_data.id,
      controls:{
        origin: {
          value: this.props.modal_data.origin,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        destination: {
          value: this.props.modal_data.destination,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        name: {
          value: this.props.modal_data.name,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        summary: {
          value: this.props.modal_data.summary,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        duration: {
          value: this.props.modal_data.duration,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        start_date: {
          value: helper.dateYYYMMDDHyphens(this.props.modal_data.vaidFrom),
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        end_date: {
          value: helper.dateYYYMMDDHyphens(this.props.modal_data.validTo),
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        description: {
          value: this.props.modal_data.description,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        status: {
          value: this.props.modal_data.status,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        exclusions: {
          value: this.props.modal_data.exclusions,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        itinerary: {
          value: this.props.modal_data.itinerary,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        inclusions: {
          value: this.props.modal_data.inclusions,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        terms_conditions: {
          value: this.props.modal_data.terms_conditions,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        minimum_number_people: {
          value: this.props.modal_data.minimum_number_people,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        isFeatured: {
          value: this.props.modal_data.isFeatured,
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        price:[
          {
            tour_type:'',
            price:'',
            currency:'',
            hotel_id:''
          }
        ],
        resource:[],
      },
      price: [],
      hotelOption:[],
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
      warning: false,
      modal_data: this.props.modal_data
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
    await this.getAllHotelItem()
    await this.loadPrice(this.props.modal_data)
  }
  async loadPrice(val){
      if(val !== undefined){
        if(val.tourTypeDetails.length > 0){
          val.tourTypeDetails.map((item, index)=>{
            let hotel_id = `${item.hotel_id}_hotel_${item.tour_type}`;
            let price = `price_${item.tour_type}`;
            let currency = `currency_${item.tour_type}`;
            console.log(currency)
            console.log(price)
            console.log(hotel_id)
            const updatedControls = updateObject( this.state.controls, {
              [hotel_id]: updateObject( this.state.controls[hotel_id], {
                value: item.hotel_id,
                touched: true
              })
            })
            this.setState( { controls: updatedControls} )

            const updatedControls1 = updateObject( this.state.controls, {
              [price]: updateObject( this.state.controls[price], {
                value: item.price,
                touched: true
              })
            })
            this.setState( { controls: updatedControls1} )
            const updatedControls2 = updateObject( this.state.controls, {
              [currency]: updateObject( this.state.controls[currency], {
                value: item.currency,
                touched: true
              })
            })
            this.setState( { controls: updatedControls2} )
          })

        }
      }
  }
  async getAllHotelItem(){
    API.getAllHotel().then(response=>{
      if(response.data.status === '200 OK'){
        if(response.data.body.length > 0){
          //console.log(response.data.body)
          this.setState({
            hotelOption: response.data.body
          })
        }
      }
    }).catch((error)=>{
      alert(error)
    })
  }

  editFixedPackageHandle = (event) =>{
    event.preventDefault()
    console.log(this.state)
    let priceArray = [];
    let sub = {}
    let inner_flag = true
    let errorMessage = '';
    let flag = false;
    this.props.modal_data.tourTypeDetails.map(item=>{
      console.log(item.tour_type)
      let hotel_id = `hotel_${item.tour_type}`;
      let price = `price_${item.tour_type}`;
      let currency = `currency_${item.tour_type}`;
      let amount = ''
      let hotel = ''
      let curr = ''
      console.log(this.state.controls[hotel_id])
      console.log(this.state.controls[price])
      console.log(this.state.controls[currency])
      if(this.state.controls[hotel_id] !== '' && this.state.controls[hotel_id] !== undefined && this.state.controls[hotel_id] !== null){
        if(this.state.controls[hotel_id].value === '' || this.state.controls[hotel_id].value === undefined || this.state.controls[hotel_id].value === null){
          errorMessage = 'Hotel missing for tour type '+ item.tour_type
          inner_flag = false
        } else {
          hotel = this.state.controls[hotel_id].value
        }
      } else {
        hotel = item.hotel_id
      }
      if(this.state.controls[price] !== '' && this.state.controls[price] !== undefined && this.state.controls[price] !== null) {
        if(this.state.controls[price].value === '' || this.state.controls[price].value === undefined || this.state.controls[price].value === null || this.state.controls[price].value < 0){
          errorMessage = 'Amount missing for tour type '+ item.tour_type
          inner_flag = false
          console.log(item.tour_type)
        } else {
          amount = this.state.controls[price].value;
        }
      } else {
        amount = item.price
      }
      if(this.state.controls[currency] !== '' && this.state.controls[currency] !== undefined && this.state.controls[currency] !== null) {
        if(this.state.controls[currency].value === '' || this.state.controls[currency].value === undefined || this.state.controls[currency].value === null){
          errorMessage = 'Currency missing for tour type '+ item.tour_type
          inner_flag = false
          console.log(item.tour_type)
        } else {
          curr = this.state.controls[currency].value
        }
      } else {
        curr = item.currency
      }

      if(inner_flag){
        sub = {
          'tour_type':item.tour_type,
          'price': amount,
          'currency': curr,
          'hotel_id': hotel
        }
        priceArray.push(sub)
      }
    })

    let resource  = []
    if(this.state.controls['resource'].value === '' || this.state.controls['resource'].value === undefined || this.state.controls['resource'].value === null){
      resource = []
    } else {
      resource = this.state.controls['resource'].value
    }
    console.log(resource)
    console.log(priceArray)
    let origin = ''
    if(this.state.controls['origin'].value === '' || this.state.controls['origin'].value === undefined || this.state.controls['origin'].value === null){
      errorMessage = 'Origin required'
      inner_flag = false
    } else {
      origin = this.state.controls['origin'].value
    }

    let destination = ''
    if(this.state.controls['destination'].value === '' || this.state.controls['destination'].value === undefined || this.state.controls['destination'].value === null){
      errorMessage = 'Destination required'
      inner_flag = false
    } else {
      destination = this.state.controls['destination'].value
    }

    let start_date = ''
    if(this.state.controls['start_date'].value === '' || this.state.controls['start_date'].value === undefined || this.state.controls['start_date'].value === null){
      errorMessage = 'Start date required'
      inner_flag = false
    } else {
      start_date = this.state.controls['start_date'].value
    }

    let end_date = ''
    if(this.state.controls['end_date'].value === '' || this.state.controls['end_date'].value === undefined || this.state.controls['end_date'].value === null){
      errorMessage = 'End date required'
      inner_flag = false
    } else {
      end_date = this.state.controls['end_date'].value
    }

    let minimum_number_people = ''
    if(this.state.controls['minimum_number_people'].value === '' || this.state.controls['minimum_number_people'].value === undefined || this.state.controls['minimum_number_people'].value === null || this.state.controls['minimum_number_people'].value < 0){
      errorMessage = 'Minimum people required'
      inner_flag = false
    } else {
      minimum_number_people = this.state.controls['minimum_number_people'].value
    }

    let description = ''
    if(this.state.controls['description'].value === '' || this.state.controls['description'].value === undefined || this.state.controls['description'].value === null){
      description = ''
    } else {
      description = this.state.controls['description'].value
    }

    let status = ''
    if(this.state.controls['status'].value === '' || this.state.controls['status'].value === undefined || this.state.controls['status'].value === null){
      status = 0
    } else {
      status = this.state.controls['status'].value
    }

    let exclusions = ''
    if(this.state.controls['exclusions'].value === '' || this.state.controls['exclusions'].value === undefined || this.state.controls['exclusions'].value === null){
      exclusions = ''
    } else {
      exclusions = this.state.controls['exclusions'].value
    }

    let itinerary = ''
    if(this.state.controls['itinerary'].value === '' || this.state.controls['itinerary'].value === undefined || this.state.controls['itinerary'].value === null){
      itinerary = ''
    } else {
      itinerary = this.state.controls['itinerary'].value
    }

    let inclusions = ''
    if(this.state.controls['inclusions'].value === '' || this.state.controls['inclusions'].value === undefined || this.state.controls['inclusions'].value === null){
      inclusions = ''
    } else {
      inclusions = this.state.controls['inclusions'].value
    }

    let isFeatured = ''
    if(this.state.controls['isFeatured'].value === '' || this.state.controls['isFeatured'].value === undefined || this.state.controls['isFeatured'].value === null){
      isFeatured = 0
    } else {
      isFeatured = this.state.controls['isFeatured'].value
    }

    let multiple_files_uploads = document.querySelector('input[type="file"]').files[0]

    if(inner_flag){
      let mainObject = {
        'isChanged': this.state.isChanged,
        'origin': origin,
        'destination': destination,
        'description': description,
        'start_date': start_date,
        'end_date': end_date,
        'status': status,
        'exclusions': exclusions,
        'itinerary': itinerary,
        'inclusions': inclusions,
        'minimum_number_people': minimum_number_people,
        'isFeatured': isFeatured,
        'price': JSON.stringify(priceArray),
        'files': resource
      }
      console.log(mainObject)
      let data = new FormData();
      for (let item of resource) {
        console.log(item)
        data.append('files', item);
      }
      data.append('isChanged', this.state.isChanged);
      data.append('origin', origin);
      data.append('destination', destination);
      data.append('description', description);
      data.append('start_date', start_date);
      data.append('end_date', end_date);
      data.append('status', status);
      data.append('exclusions', exclusions);
      data.append('itinerary', itinerary);
      data.append('inclusions', inclusions);
      data.append('minimum_number_people', minimum_number_people);
      data.append('isFeatured', isFeatured);
      data.append('price', JSON.stringify(priceArray));

      API.editFixedPackage(data, this.state.package_id).then(response=>{
        console.log(response)
        /*if(response.data.status === '200 OK'){
          this.props.onAddFixedPackageResponse(true, response.data.body.msg)
        } else {
          this.props.onAddFixedPackageResponse(false, 'FixedPackage not added. Invalid data supplied')
        }*/
      })
    } else {
      this.setState({
        modal: true,
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: errorMessage
      })
    }
  }

  inputChangeHandler = (event, controlName) =>{
    event.preventDefault()
    if(controlName === 'resource'){
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event.target.files,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true
        })
      })

      this.setState( { controls: updatedControls, isChanged: 1 } )
      console.log(updatedControls)
    } else {
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event.target.value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true
        })
      })
      this.setState( { controls: updatedControls} )



      console.log(this.state)
    }
  }

  render() {
      let tour = this.state.modal_data.tourTypeDetails.map((item, index)=> {
      let hotel_id = `${item.hotel_id}_hotel_${item.tour_type}`;
      let price = `price_${item.tour_type}`;
      let currency = `currency_${item.tour_type}`;
      return(
        <FormGroup key={hotel_id} row className="my-0">
          <Col xs="3">
            <FormGroup>
              <Label className={'tour_type_margin_top'} htmlFor="day">{item.tour_type}</Label>
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="day">Amount</Label>
              <Input value={this.state.controls[price] !== undefined ? this.state.controls[price].value : ''} type="number" min="0" onChange={event => this.inputChangeHandler(event,price)} placeholder="Enter Amount" />
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="hour">Hotel</Label>
              <Input value={this.state.controls[hotel_id] !== undefined ? this.state.controls[hotel_id].value : ''} type="select" onChange={event => this.inputChangeHandler(event,hotel_id)} >
                <option value="">Select Hotel</option>
                {
                  this.state.hotelOption.map((hotel_item,index)=>{
                    if(item.tour_type === hotel_item.tour_type){
                      return(
                        <option key={index} value={hotel_item.id}>{hotel_item.name}</option>
                      )
                    }
                  })
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="hour">Currency</Label>
              <Input value={this.state.controls[currency] !== undefined ? this.state.controls[currency].value : ''}  type="select" onChange={event => this.inputChangeHandler(event,currency)} >
                <option value="">Select Currency</option>
                <option value="tk">TK</option>
                <option value="dollor">Dollor</option>
                <option value="euro">Euro</option>
              </Input>
            </FormGroup>
          </Col>
        </FormGroup>
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
                      <Input value={this.state.controls.origin.value} type="text" id="origin" onChange={event => this.inputChangeHandler(event,'origin')} placeholder="Enter Origin" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Destination</Label>
                      <Input value={this.state.controls.destination.value} type="text" id="destination" onChange={event => this.inputChangeHandler(event,'destination')} placeholder="Enter Destination" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Min people</Label>
                      <Input value={this.state.controls.name.value} type="text" id="name" onChange={event => this.inputChangeHandler(event,'name')} placeholder="Enter name" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="minimum_number_people">Min people</Label>
                      <Input value={this.state.controls.minimum_number_people.value} type="number" id="minimum_number_people" onChange={event => this.inputChangeHandler(event,'minimum_number_people')} placeholder="Enter Min people" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="start_date">Valid From</Label>
                      <Input value={this.state.controls.start_date.value} type="date" id="start_date" onChange={event => this.inputChangeHandler(event,'start_date')} placeholder="Enter Start Day" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="end_date">Valid To</Label>
                      <Input value={this.state.controls.end_date.value} type="date" id="end_date" onChange={event => this.inputChangeHandler(event,'end_date')} placeholder="Enter End Day" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input value={this.state.controls.description.value}  className={'input_resize'} type="textarea" colSpan="4" id="description" onChange={event => this.inputChangeHandler(event,'description')} placeholder="Enter Description" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="summary">Summary</Label>
                      <Input value={this.state.controls.summary.value}  className={'input_resize'} type="textarea" colSpan="4" id="summary" onChange={event => this.inputChangeHandler(event,'summary')} placeholder="Enter summary" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="terms_conditions">Terms Conditions</Label>
                      <Input value={this.state.controls.terms_conditions.value}  className={'input_resize'} type="textarea" colSpan="4" id="terms_conditions" onChange={event => this.inputChangeHandler(event,'terms_conditions')} placeholder="Enter terms conditions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="exclusions">Exclusions</Label>
                      <Input value={this.state.controls.exclusions.value} className={'input_resize'} type="textarea" colSpan="4" id="exclusions" onChange={event => this.inputChangeHandler(event,'exclusions')} placeholder="Enter Exclusions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="inclusions">Inclusions</Label>
                      <Input value={this.state.controls.inclusions.value} className={'input_resize'} type="textarea" colSpan="4" id="inclusions" onChange={event => this.inputChangeHandler(event,'inclusions')} placeholder="Enter Inclusions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="itinerary">Itinerary</Label>
                      <Input value={this.state.controls.itinerary.value} className={'input_resize'} type="textarea" colSpan="4" id="itinerary" onChange={event => this.inputChangeHandler(event,'itinerary')} placeholder="Enter Itinerary" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input value={this.state.controls.status.value} type="select" id="status" onChange={event => this.inputChangeHandler(event,'status')} placeholder="Enter Status">
                        <option value="">Select Status</option>
                        <option value="0">Active</option>
                        <option value="1">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="isFeatured">Featured</Label>
                      <Input value={this.state.controls.isFeatured.value} type="select" id="isFeatured" onChange={event => this.inputChangeHandler(event,'isFeatured')} placeholder="Enter Featured">
                        <option value="">Select Featured</option>
                        <option value="1">Is featured</option>
                        <option value="0">Not featured</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="duration">Duration</Label>
                      <Input value={this.state.controls.duration.value}  className={'input_resize'} type="number" id="duration" onChange={event => this.inputChangeHandler(event,'duration')} placeholder="Enter duration" />
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
                {tour}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Resource
              </CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  {/*<Col xs="6">
                    <FormGroup>
                      <Label htmlFor="featured">File Type</Label>
                      <Input type="select" id="featured" onChange={event => this.inputChangeHandler(event,'featured')}>
                        <option value="1">Image</option>
                        <option value="2">Media</option>
                      </Input>
                    </FormGroup>
                  </Col>*/}
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">File</Label>
                      <Input type="file" id={'multiple_files_uploads'} multiple onChange={event => this.inputChangeHandler(event,'resource')} placeholder="Enter file" />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
            <div>
              <div className='text-center'>
                <Button onClick={this.editFixedPackageHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default editFixedPackage;
