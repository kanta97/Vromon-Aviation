import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import './Map.css'
import Inputt from '../../../components/UI/Input/Booking'
import Auxi from '../../../hoc/Auxi/Auxi'
import {/*
  Input,
  Label,
  FormGroup,*/
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import {updateObject} from "../../../shared/utility";
import * as helper from "../../../API";

Geocode.setApiKey("AIzaSyAE4WiovnvjfEKCi4jyV8dEa3JKwrQNIQA");
Geocode.enableDebug();
class Map extends React.Component{
  constructor( props ){
    super( props );
    console.log(props)
    this.state = {
      address: '',
      address1: '',
      db_id: this.props.modal_data.id,
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      controls: {
        client_id: {
          elementType: 'select',
          elementConfig: {
            name: 'client_id',
            type: 'select',
            placeholder: 'Client',
            options: this.props.client_id/*[
              {value: '', key:'', displayValue: 'Select Client'},
            ]*/
          },
          value: this.props.modal_data.client_id,
          label: 'Client',
          touched: false
        },
        /*db_id: {
          elementType: 'input',
          elementConfig: {
            name: 'db_id',
            type: 'hidden',
            placeholder: ''
          },
          value: this.props.modal_data.id,
          label: '',
          touched: false
        },*/
        user_id: {
          elementType: 'select',
          elementConfig: {
            type:'select',
            name: 'user_id',
            placeholder: 'User',
            options: this.props.user_id/*[
              {value: '', key: '', displayValue: 'Select User'},
              {value: '2388', key: '2388', displayValue: 'Mytotocompnay'},
              {value: '2', key: '2', displayValue: 'Test Merchant'}
            ]*/
          },
          label: 'User',
          value: this.props.modal_data.user_id,
          touched: false
        },
        billboard_location: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_location',
            type: 'text',
            placeholder: 'Billboard Location'
          },
          value: this.props.modal_data.billboard_location,
          label: 'Billboard Location',
          touched: false
        },
        division: {
          elementType: 'select',
          elementConfig: {
            name: 'division',
            type: 'select',
            placeholder: 'Division',
            options: this.props.division/*[
              {value: '', key:'', displayValue: 'Select Division'},
              {value: '1', key:'1',  displayValue: 'Active'},
              {value: '2', key:'2', displayValue: 'Inactive'}
            ]*/
          },
          value: this.props.modal_data.division,
          label: 'Division',
          touched: false
        }
        ,
        district: {
          elementType: 'select',
          elementConfig: {
            name: 'district',
            type: 'select',
            placeholder: 'District',
            options: this.props.district/*[
              {value: '', key:'', displayValue: 'Select District'},
              {value: '1', key:'1', displayValue: 'Active'},
              {value: '2', key:'2', displayValue: 'Inactive'}
            ]*/
          },
          value: this.props.modal_data.district,
          label: 'District',
          touched: false
        },
        thana: {
          elementType: 'select',
          elementConfig: {
            name: 'thana',
            type: 'select',
            placeholder: 'Thana',
            options: this.props.thana/*[
              {value: '', key:'', displayValue: 'Select Thana'},
              {value: '1', key:'1', displayValue: 'Active'},
              {value: '2', key:'2', displayValue: 'Inactive'}
            ]*/
          },
          value: this.props.modal_data.thana,
          label: 'Thana',
          touched: false
        },
        billboard_name: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_name',
            type: 'text',
            placeholder: 'Billboard Name'
          },
          value: this.props.modal_data.name_of_billboard,
          label: 'Billboard Name',
          touched: false
        },
        address: {
          elementType: 'input',
          elementConfig: {
            name: 'address',
            type: 'text',
            placeholder: 'Address'
          },
          value: this.props.modal_data.address,
          label: 'Address',
          touched: false
        },
        billboard_id: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_id',
            type: 'text',
            placeholder: 'Billboard ID'
          },
          value: this.props.modal_data.billboard_id,
          label: 'Billboard ID',
          touched: false
        },
        billboard_width: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_width',
            type: 'text',
            placeholder: 'Billboard Width'
          },
          value: this.props.modal_data.billboard_width,
          label: 'Billboard Width',
          touched: false
        },
        billboard_height: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_height',
            type: 'text',
            placeholder: 'Billboard Height'
          },
          value: this.props.modal_data.billboard_height,
          label: 'Billboard Height',
          touched: false
        },
        side: {
          elementType: 'select',
          elementConfig: {
            name: 'side',
            type: 'select',
            placeholder: 'Fasica',
            options: [
              {value: '',  key:'', displayValue: 'Select Fasica'},
              {value: '1',  key:'1', displayValue: 'Single'},
              {value: '2',  key:'2', displayValue: 'Both'}
            ]
          },
          value: this.props.modal_data.side,
          label: 'Fasica',
          touched: false
        },
        billboard_size: {
          elementType: 'input',
          elementConfig: {
            name: 'billboard_size',
            type: 'text',
            placeholder: 'Billboard Size'
          },
          value: this.props.modal_data.billboard_size,
          label: 'Billboard Size',
          touched: false
        },
        stand_start_date: {
          elementType: 'input',
          elementConfig: {
            name: 'stand_start_date',
            type: 'date',
            placeholder: 'Stand Start Date'
          },
          value: this.props.modal_data.stand_start_date,
          label: 'Stand Start Date',
          touched: false
        },
        stand_end_date: {
          elementType: 'input',
          elementConfig: {
            name: 'stand_end_date',
            type: 'date',
            placeholder: 'Stand End Date'
          },
          value: this.props.modal_data.stand_end_date,
          label: 'Stand End Date',
          touched: false
        },
        facing: {
          elementType: 'select',
          elementConfig: {
            name: 'facing',
            type: 'select',
            placeholder: 'Facing',
            options: [
              {value: '',  key:'', displayValue: 'Select Facing'},
              {value: 'north',  key:'north', displayValue: 'North'},
              {value: 'south',  key:'south', displayValue: 'South'}
            ]
          },
          value: this.props.modal_data.facing,
          label: 'Facing',
          touched: false
        },
        is_active: {
          elementType: 'select',
          elementConfig: {
            name: 'is_active',
            type: 'select',
            placeholder: 'Status',
            options: [
              {value: '', key:'', displayValue: 'Select Status'},
              {value: '1', key:'1', displayValue: 'Active'},
              {value: '2', key:'2', displayValue: 'Inactive'},
              {value: '0', key:'0', displayValue: 'Delete'}
            ]
          },
          value: this.props.modal_data.is_active,
          label: 'Status',
          touched: false
        }
      }
    }
      this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */


  componentWillMount() {



   /* this.setState({

    })*/
   /* Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
      response => {
        const address = response.results[0].formatted_address

        const updatedControls = updateObject(this.state.controls,{
          ['address']: updateObject(this.state.controls['address'],{
            elementConfig: {
              name: 'address',
              type: 'text',
              placeholder: 'Address'
            },
            value: address,
            label: 'Address',
            touched: false
          })
        })
        this.setState( { controls: updatedControls /!*, address: ( address ) ? address : ''*!/} )

      },
      error => {
        console.error(error);
      }
    );*/
  };
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate( nextProps, nextState ){
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.controls.address.value !== nextState.controls.address.value||
      this.state.controls.facing.value !== nextState.controls.address.value
    ) {
      return true
    } else if ( this.props.center.lat === nextProps.center.lat ){
      return false
    }
  }

  inputChangedHandler = ( event, controlName ) => {
    console.log(controlName)
    console.log(event.target.value)
    const updatedControls = updateObject( this.state.controls, {
      [controlName]: updateObject( this.state.controls[controlName], {
        value: event.target.value,
        touched: true
      })
    })
    this.setState({
      controls: updatedControls
    })
    if(controlName === 'address'){
      Geocode.fromAddress(event.target.value).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            mapPosition: {
              lat: lat,
              lng: lng
            },
            markerPosition: {
              lat: lat,
              lng: lng
            },
          })
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  /*change = (event) => {
    console.log(event.target)
    console.log(event.target.name)
    let key = event.target.name;
    this.setState({
      address1: event.target.value
    })
  }*/

  submitHandler = ( event ) => {
    event.preventDefault()
    console.log(this.state)
    helper.editBillboard(this.state)
      .then((response) => {
        this.props.onResponse(response.data.success, response.data.message);
      })
      .catch((error) => {
        console.log(error)
        /*this.setState({
          danger: true,
          modalTitle: 'Failure',
          modalBody: error
        });*/
      })
  }

   onInfoWindowClose = ( event ) => {
  };
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = ( place ) => {
    const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
// Set these values in the state.

    const updatedControls = updateObject(this.state.controls,{
      ['address']: updateObject(this.state.controls['address'],{
        elementConfig: {
          name: 'address',
          type: 'text',
          placeholder: 'Address'
        },
        value: address,
        label: 'Address',
        touched: false
      })
    })
    //this.setState( { controls: updatedControls, address: ( address ) ? address : ''} )

    this.setState({
      controls: updatedControls,
     /* address: ( address ) ? address : '',*/
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = ( event ) => {
    console.log( 'event', event );
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng( newLat , newLng ).then(
      response => {
        const address = response.results[0].formatted_address

        const updatedControls = updateObject(this.state.controls,{
          ['address']: updateObject(this.state.controls['address'],{
            elementConfig: {
              name: 'address',
              type: 'text',
              placeholder: 'Address'
            },
            value: address,
            label: 'Address',
            touched: false
          })
        })
        this.setState( {
          controls: updatedControls,
          markerPosition: {
            lat: newLat,
            lng: newLng
          }
        } )
      },
      error => {
        console.error(error);
      }
    );
  };
  render(){
    // form control
    const formElementsArray = []
    let key = ''
    for (key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    //console.log(formElementsArray)
    let form = formElementsArray.map(formElement => (
      <Col key={formElement.id} xs="12">
        <Inputt
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
      </Col>
    ))


    // map control
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
                     defaultZoom={this.props.zoom}
                     defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                width: '94%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px',
                position: 'absolute',
                top: '-3px',
                right: '16px',

              }}
              types={['(cities)']}
              componentRestrictions={{country: 'bd'}}
              onPlaceSelected={ this.onPlaceSelected }
            />
            {/*Marker*/}
            <Marker google={this.props.google}
                    name={'Work'}
                    draggable={true}
                    onDragEnd={ this.onMarkerDragEnd }
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{ this.state.controls.address.value }</span>
              </div>
            </InfoWindow>
          </GoogleMap>
        )
      )
    );
    let map;
    if( this.props.center.lat !== undefined ) {
      map = <div className="margin-top">
        <div>
          <div className="form-group">
            {/*<label htmlFor="">Address</label>*/}
            <input type="hidden" name="address" className="form-control" onChange={ (event) => this.inputChangedHandler(event, 'address')} readOnly="readOnly" value={ this.state.controls.address.value }/>
          </div>
        </div>
        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAE4WiovnvjfEKCi4jyV8dEa3JKwrQNIQA&libraries=places"
          loadingElement={
            <div style={{ height: `100%` }} />
          }
          containerElement={
            <div style={{ height: this.props.height }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    } else {
      map = <div style={{height: this.props.height}} />
    }

    return(
      <Auxi>
        <Row>
          <Col xs="12" sm="6">
            <form onSubmit={this.submitHandler}>
              <Card>
                <CardHeader className="text-center">
                  <h2>Edit Form</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <input type='hidden' value={this.state.db_id}/>
                    {form}
                  </Row>
                </CardBody>
              </Card>
              <div className="text-center">
                <Button color="primary">
                  UPDATE
                </Button>
              </div>
            </form>
          </Col>
          <Col xs="12" sm="6">
            {map}
          </Col>
        </Row>
      </Auxi>
    )
  }
}
export default Map
