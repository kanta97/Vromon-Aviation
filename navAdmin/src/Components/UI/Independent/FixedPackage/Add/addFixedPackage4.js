import React, {Component, Fragment} from 'react';
import Loadable from "react-loadable";
import axios from 'axios';
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import * as helper from '../../../../../Helpers'
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


class addFixedPackage extends Component {
  constructor(props){
    super(props)
    this.state = {
      controls:{
        origin: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        destination: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        start_date: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        end_date: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        description: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        name: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        summary: {
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        status: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        exclusions: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        itinerary: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        inclusions: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        minimum_number_people: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        duration_day: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
          duration_night: {
              value: '',
              validation: {
                  required: false
              },
              valid: true,
              touched: false
          },
        isFeatured: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        terms_conditions: {
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        price:[
          {
            tour_type:{
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            price:{
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            currency:{
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            hotel_id:{
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            }
          }
        ],
        resource:[],
        featured_image:[],
      },
      hotelOption:[],
      counter: 0,
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
      tourTypeOption:[],
      fullData:[{
        tour_type: '',
        hotel: '',
        duration: '',
      }]
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
    await this.loadTourType()
  }

  async loadTourType(){
    let tour_type = API.loadtourTypeSession()
    //console.log(tour_type)
    this.setState({
      tourTypeOption: tour_type
    })
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

  addFixedPackageHandle = (event) =>{
    event.preventDefault()
    //console.log(this.state)
    let totalArray = []
    let priceArray = [];
    let sub = {}
    let inner_flag = true
    let priceFlag = false
    let currencyFlag = false
    let errorMessage = '';
    let amount = 0
    let cur = ''
    let flag = false;
    this.state.tourTypeOption.map(item=>{
      currencyFlag = false;
      priceFlag = false;
    //  console.log(item)
      let hotel_id = `hotel_${item.tour_type}`;
      let price = `price_${item.tour_type}`;
      let currency = `currency_${item.tour_type}`;
      let amount = ''
      let hotel = ''
      let curr = ''

      if(this.state.controls[price] !== '' && this.state.controls[price] !== undefined && this.state.controls[price] !== null) {
        if(this.state.controls[price].value !== '' && this.state.controls[price].value !== undefined && this.state.controls[price].value !== null && this.state.controls[price].value > 0){
          if(!priceFlag){
            priceFlag = true
            amount = this.state.controls[price].value
          }
        } else {
          errorMessage = 'Amount missing for tour type '+ item.tour_type
          inner_flag = false
          //   console.log(item.tour_type)
        }
      } else {
        errorMessage = 'Amount missing for tour type '+ item.tour_type
        inner_flag = false
        //console.log(item.tour_type)
      }
      if(this.state.controls[currency] !== '' && this.state.controls[currency] !== undefined && this.state.controls[currency] !== null) {
        if(this.state.controls[currency].value !== '' && this.state.controls[currency].value !== undefined && this.state.controls[currency].value !== null){
          if(!currencyFlag){
            currencyFlag = true
            cur = this.state.controls[currency].value
          }
         // console.log(item.tour_type)
        } else {
          errorMessage = 'Currency missing for tour type '+ item.tour_type
          inner_flag = false
        }
      } else {
        errorMessage = 'Currency missing for tour type '+ item.tour_type
        inner_flag = false
        //console.log(item.tour_type)
      }

      let hotelArray = [];
      let s = {}
      if(this.state.fullData.length > 0){
        this.state.fullData.map(it=>{
          if(it !== undefined &&  it !== '' && it !== null){
            if(it.tour_type === item.tour_type){
              totalArray.push(it.tour_type)
              let as = it.hotel.split('||')
              s = {
                'hotel_id': as[0],
                'tour_type': it.tour_type ,
                'duration': it.duration
              }
              hotelArray.push(s)
            }
          }
        })
        //console.log(hotelArray)
      }
      console.log(inner_flag)
      console.log(hotelArray)
     /* if(hotelArray.length < 1 ){
        errorMessage = 'Hotel and duration not defined'
        inner_flag = false
      }*/
     // console.log(inner_flag)
    //  console.log(hotelArray.length)
      if(priceFlag && currencyFlag){
        sub = {
          'tour_type':item.tour_type,
          'price': amount,
          'currency': cur,
          'hotel': hotelArray
        }
        priceArray.push(sub)
      }
    })
    console.log(totalArray)
    let uniqueItems = Array.from(new Set(totalArray))
    console.log(uniqueItems)
    console.log(priceArray)
    if(uniqueItems.length > 0){
      errorMessage = 'Please add price at least one tour type'
      inner_flag = false
    }
    let resource  = []
    if(this.state.controls['resource'].value === '' || this.state.controls['resource'].value === undefined || this.state.controls['resource'].value === null){
      resource = []
    } else {
      resource = this.state.controls['resource'].value
    }

    let featuredImage  = []
    if(this.state.controls['featured_image'].value === '' || this.state.controls['featured_image'].value === undefined || this.state.controls['featured_image'].value === null){
      errorMessage = 'Featured image required'
      inner_flag = false
    } else {
      featuredImage = this.state.controls['featured_image'].value
    }

    //console.log(resource)
   // console.log(priceArray)
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

    let name = ''
    if(this.state.controls['name'].value === '' || this.state.controls['name'].value === undefined || this.state.controls['name'].value === null){
      name = ''
    } else {
      name = this.state.controls['name'].value
    }

    let summary = ''
    if(this.state.controls['summary'].value === '' || this.state.controls['summary'].value === undefined || this.state.controls['summary'].value === null){
      summary = ''
    } else {
      summary = this.state.controls['summary'].value
    }

    let terms_conditions = ''
    if(this.state.controls['terms_conditions'].value === '' || this.state.controls['terms_conditions'].value === undefined || this.state.controls['terms_conditions'].value === null){
      terms_conditions = ''
    } else {
      terms_conditions = this.state.controls['terms_conditions'].value
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

    let duration_day = ''
    if(this.state.controls['duration_day'].value === '' || this.state.controls['duration_day'].value === undefined || this.state.controls['duration_day'].value === null){
      duration_day = ''
    } else {
        duration_day = this.state.controls['duration_day'].value
    }
      let duration_night = ''
      if(this.state.controls['duration_night'].value === '' || this.state.controls['duration_night'].value === undefined || this.state.controls['duration_night'].value === null){
          duration_night = ''
      } else {
          duration_night = this.state.controls['duration_night'].value
      }

    let isFeatured = ''
    if(this.state.controls['isFeatured'].value === '' || this.state.controls['isFeatured'].value === undefined || this.state.controls['isFeatured'].value === null){
      isFeatured = 0
    } else {
      isFeatured = this.state.controls['isFeatured'].value
    }
    let multiple_files_uploads = document.querySelector('input[type="file"]').files[0]
    if(inner_flag){
      let data = new FormData();

      for (let item of featuredImage) {
       // console.log(item)
        data.append('files', item);
      }
      for (let item of resource) {
       // console.log(item)
        data.append('files', item);
      }
      data.append('featuredresourceindex', 0);
      data.append('origin', origin);
      data.append('duration_day', duration_day);
      data.append('duration_night', duration_night);
      data.append('summary', summary);
      data.append('terms_conditions', terms_conditions);
      data.append('name', name);
      data.append('destination', destination);
      data.append('description', description);
      data.append('vaidFrom', start_date);
      data.append('validTo', end_date);
      data.append('status', status);
      data.append('exclusions', exclusions);
      data.append('itinerary', itinerary);
      data.append('inclusions', inclusions);
      data.append('minimum_number_people', minimum_number_people);
      data.append('isFeatured', isFeatured);
      data.append('price', JSON.stringify(priceArray));

      API.addFixedPackage(data).then(response=>{
        //console.log(response)
        if(response.data.status === '200 OK'){
          this.props.onAddFixedPackageResponse(true, response.data.body.msg)
        } else {
          this.props.onAddFixedPackageResponse(false, 'FixedPackage not added. Invalid data supplied')
        }
      }).catch(err=>{
        this.props.onAddFixedPackageResponse(false, 'FixedPackage not added. Error occurred')
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

  addMoreHotel = (event, tour)=>{
    event.preventDefault()
    //console.log(tour)
    let count = this.state.counter
    let hotel_id = `hotel_${tour}`;
    let duration = `duration_${tour}`;
    let data = {}
    if(
      this.state.controls[hotel_id] !== '' &&
      this.state.controls[hotel_id] !== undefined &&
      this.state.controls[hotel_id] !== null &&
      this.state.controls[duration] !== '' &&
      this.state.controls[duration] !== undefined &&
      this.state.controls[duration] !== null
    )
    {
      if(
        this.state.controls[hotel_id].value === '' ||
        this.state.controls[hotel_id].value === undefined ||
        this.state.controls[hotel_id].value === null ||
        this.state.controls[duration].value === '' ||
        this.state.controls[duration].value === undefined ||
        this.state.controls[duration].value === null
      ){

      } else {
        /*data = {
          tour_type: tour,
          hotel: this.state.controls[hotel_id].value,
          duration: this.state.controls[duration].value,
        }
        console.log(data)*/

        let fullData = [...this.state.fullData];
        let length = fullData.length
        let item = {...fullData[count]};
        item.tour_type = tour;
        item.hotel = this.state.controls[hotel_id].value;
        item.duration = this.state.controls[duration].value;
        fullData[count] = item;
        count = parseInt(count) + 1
        this.state.controls[duration].value = ''
        this.state.controls[hotel_id].value = ''
        this.setState({fullData: fullData, counter: count})
      }
    } else {

    }
    console.log(this.state)
  }

  inputChangeHandler = (event, controlName) =>{
    event.preventDefault()
    if(controlName === 'resource'){
      let len = event.target.files.length
      let i = 0
      let filename = ''
      let regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$");
      let flag = true
      for(i = 0; i < len; i++){
        filename = event.target.files[i].type.split('/');
        if(filename[0] === 'video' || filename[0] === 'VIDEO' || filename[0] === 'image' || filename[0] === 'IMAGE'){
        } else {
         flag = false
        }
      }
      if(flag){
        const updatedControls = updateObject( this.state.controls, {
          [controlName]: updateObject( this.state.controls[controlName], {
            value: event.target.files,
            //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
            touched: true
          })
        })

        this.setState({ controls: updatedControls })
      } else {
        this.setState({
          modal: true,
          danger: true,
          dangerModalTitle: 'Failure',
          dangerModalBody: 'Only image or video file supported'
        })
      }
    } else if(controlName === 'featured_image'){
      let len = event.target.files.length
      let i = 0
      let filename = ''
      let regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$");
      let flag = true
      for(i = 0; i < len; i++){
        filename = event.target.files[i].type.split('/');
        if(filename[0] === 'video' || filename[0] === 'VIDEO' || filename[0] === 'image' || filename[0] === 'IMAGE'){
        } else {
          flag = false
        }
      }
      if(flag){
        const updatedControls = updateObject( this.state.controls, {
          [controlName]: updateObject( this.state.controls[controlName], {
            value: event.target.files,
            //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
            touched: true
          })
        })

        this.setState({ controls: updatedControls })
      } else {
        this.setState({
          modal: true,
          danger: true,
          dangerModalTitle: 'Failure',
          dangerModalBody: 'Only image or video file supported'
        })
      }
    } else {
      const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
          value: event.target.value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true
        })
      })
      this.setState({controls: updatedControls})
    }
  }


  removeTourDetail = (event, index)=>{
    event.preventDefault()
    let fullData = [...this.state.fullData]
    let newState = fullData.splice(index,1)
    let len = fullData.length

    this.setState({
      fullData: fullData
    })

  }

  render() {
    let flag1 = false
    let checker = []
      //console.log(this.state.fullData.length)
      let flag = false
      //console.log(this.state.fullData)
      this.state.fullData.map(item=>{
        if(item !== undefined && item !== null && item !== ''){
          if(item.tour_type !== undefined && item.tour_type !== null && item.tour_type !== ''){
            flag = true
          }
        }
      })

      let tour = this.state.tourTypeOption.map(item=> {
        let hotel_id = `hotel_${item.tour_type}`;
        let price = `price_${item.tour_type}`;
        let currency = `currency_${item.tour_type}`;
        let duration = `duration_${item.tour_type}`;

        let hotel_val = ''
        if(this.state.controls[hotel_id] !== undefined && this.state.controls[hotel_id] !== '' && this.state.controls[hotel_id] !== null){
          if(this.state.controls[hotel_id].value !== undefined && this.state.controls[hotel_id].value !== '' && this.state.controls[hotel_id].value !== null){
            hotel_val = this.state.controls[hotel_id].value
          }
        }

        let duration_val = ''
        if(this.state.controls[duration] !== undefined && this.state.controls[duration] !== '' && this.state.controls[duration] !== null){
          if(this.state.controls[duration].value !== undefined && this.state.controls[duration].value !== '' && this.state.controls[duration].value !== null){
            duration_val = this.state.controls[duration].value
          }
        }

        return(
          <div key={item.tour_type}>
          <div className={'text-center'}>{item.tour_type}</div>
            <br/>
          <FormGroup key={item.tour_type} row className="my-0">
            <Col xs="2">
              <FormGroup>
                <Label htmlFor="day">Amount</Label>
                <Input type="number" min="0" onChange={event => this.inputChangeHandler(event,price)} placeholder="Amount" />
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="hour">Currency</Label>
                <Input type="select" onChange={event => this.inputChangeHandler(event,currency)} >
                  <option key={'1'} value="">Select Currency</option>
                  <option key={'2'} value="tk">BDT</option>
                  <option key={'3'} value="dollor">USD</option>
                  <option key={'4'} value="euro">EURO</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="hour">Hotel</Label>
                <Input value={hotel_val} type="select" onChange={event => this.inputChangeHandler(event,hotel_id)} >
                  <option value="">Hotel</option>
                  {
                    this.state.hotelOption.map((hotel_item,index)=>{
                      if(item.tour_type === hotel_item.tour_type){
                        return(
                          <option key={index} value={hotel_item.id+'||'+hotel_item.name}>{hotel_item.name}</option>
                        )
                      }
                    })
                  }
                </Input>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="duration">Duration</Label>
                <Input value={duration_val} type="number" min="0" onChange={event => this.inputChangeHandler(event,duration)} placeholder="Duration" />
              </FormGroup>
            </Col>
            <Col xs="1">
              <div className={'add_more_btn'}>
                <Button onClick={(event) =>this.addMoreHotel(event,item.tour_type)}  color={'primary'}>Add</Button>
              </div>
            </Col>
          </FormGroup>
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
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" onChange={event => this.inputChangeHandler(event,'name')} placeholder="Enter name" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="minimum_number_people">Min people</Label>
                      <Input type="number" id="minimum_number_people" onChange={event => this.inputChangeHandler(event,'minimum_number_people')} placeholder="Enter Min people" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="start_date">Valid From</Label>
                      <Input type="date" id="start_date" onChange={event => this.inputChangeHandler(event,'start_date')} placeholder="Enter Start Day" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="end_date">Valid To</Label>
                      <Input type="date" id="end_date" onChange={event => this.inputChangeHandler(event,'end_date')} placeholder="Enter End Day" />
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="summary">Summary</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="summary" onChange={event => this.inputChangeHandler(event,'summary')} placeholder="Enter summary" />
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
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="itinerary">Itinerary</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="itinerary" onChange={event => this.inputChangeHandler(event,'itinerary')} placeholder="Enter Itinerary" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="inclusions">Inclusions</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="inclusions" onChange={event => this.inputChangeHandler(event,'inclusions')} placeholder="Enter Inclusions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="exclusions">Exclusions</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="exclusions" onChange={event => this.inputChangeHandler(event,'exclusions')} placeholder="Enter Exclusions" />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="terms_conditions">Terms Conditions</Label>
                      <Input className={'input_resize'} type="textarea" colSpan="4" id="terms_conditions" onChange={event => this.inputChangeHandler(event,'terms_conditions')} placeholder="Enter terms conditions" />
                    </FormGroup>
                  </Col>
                </FormGroup>



                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input type="select" id="status" onChange={event => this.inputChangeHandler(event,'status')} placeholder="Enter Status">
                        <option key={'1'} value="">Select Status</option>
                        <option key={'2'} value="0">Active</option>
                        <option key={'3'} value="1">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="isFeatured">Featured</Label>
                      <Input type="select" id="isFeatured" onChange={event => this.inputChangeHandler(event,'isFeatured')} placeholder="Enter Featured">
                        <option key={'1'} value="">Select Featured</option>
                        <option key={'2'} value="1">Is featured</option>
                        <option key={'3'} value="0">Not featured</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="duration">Duration days</Label>
                      <Input type="number" id="duration_day" onChange={event => this.inputChangeHandler(event,'duration_day')} placeholder="Enter number of days"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="duration">Duration nights</Label>
                      <Input type="number" id="duration_night" onChange={event => this.inputChangeHandler(event,'duration_night')} placeholder="Enter number of nights"/>
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

                {this.state.fullData.length > 0 && flag  ?
                  <Fragment>
                    <div className={'text-center'}><h4>Hotels</h4></div>
                    <div>
                      <div>
                        <table className={'table table-striped table-bordered'}>
                          <thead>
                          <tr>
                            <th className={'text-center'}>Type</th>
                            <th className={'text-center'}>Currency</th>
                            <th className={'text-center'}>Amount</th>
                          </tr>
                          </thead>
                          <tbody>
                          {

                            this.state.fullData.map((item,index)=>{
                              //console.log(item)
                              if(item !== undefined && item !== '' && item !== null){
                                let price = `price_${item.tour_type}`;
                                let currency = `currency_${item.tour_type}`;
                                let hotel = item.hotel.split('||')
                                let c = helper.isInArray(item.tour_type, checker);
                                console.log(c)
                                if(!c){
                                  checker.push(item.tour_type);
                                  console.log(checker)

                                  return (
                                    <tr key={item.hotel}>
                                      <td className={'text-center'}>{item.tour_type}</td>
                                      <td className={'text-center'}>{this.state.controls[currency].value}</td>
                                      <td className={'text-center'}>{this.state.controls[price].value}</td>
                                    </tr>
                                  )
                                }

                              }

                            })

                          }
                          </tbody>
                        </table>
                      </div>
                      <table className={'table table-striped table-bordered'}>
                        <thead>
                          <tr>
                            <th className={'text-center'}>Type</th>

                            <th className={'text-center'}>Hotel</th>
                            <th className={'text-center'}>Duration</th>
                            <th className={'text-center'}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {

                            this.state.fullData.map((item,index)=>{
                              //console.log(item)
                              if(item !== undefined && item !== '' && item !== null){
                                let price = `price_${item.tour_type}`;
                                let currency = `currency_${item.tour_type}`;
                                let hotel = item.hotel.split('||')
                                let c = helper.isInArray(item.tour_type, checker);
                                console.log(c)
                                checker.push(item.tour_type);
                                console.log(checker)

                                return (
                                  <tr key={item.hotel}>
                                    <td className={'text-center'}>{item.tour_type}</td>
                                    <td className={'text-center'}>{hotel[1]}</td>
                                    <td className={'text-center'}>{item.duration}</td>
                                    <td className={'text-center'}><Button color={'danger'} onClick={(event)=>this.removeTourDetail(event, index)}>Remove</Button></td>
                                  </tr>
                                )
                              }

                            })

                          }
                        </tbody>
                      </table>
                    </div>
                  </Fragment>

                  :''}
                {tour}
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
                      <Label htmlFor="hour">Featured Image</Label>
                      <Input type="file" id={'featured_image'} onChange={event => this.inputChangeHandler(event,'featured_image')} placeholder="Enter featured file" />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Others</Label>
                      <Input type="file" id={'multiple_files_uploads'} multiple onChange={event => this.inputChangeHandler(event,'resource')} placeholder="Enter file" />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
            <div>
              <div className='text-center'>
                <Button onClick={this.addFixedPackageHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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
