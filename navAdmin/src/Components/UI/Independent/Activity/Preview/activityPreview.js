import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
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

class activityPreview extends Component {
  constructor(props){
    super(props)
     //console.log(this.props.modal_data)
  }

  getDayHour = (val) => {
    let day = Math.floor(val/24)
    let hour = Math.floor(val%24)
    //console.log(day +' Day' + hour + ' Hour')
    if(day === 0){
      if(hour === 0){
        return ''
      } else {
        return hour + ' Hours'
      }
    } else {
      if(hour === 0){
        return day+' Days '
      } else {
        return day+' Days '+ hour + ' Hours'
      }
    }
  }

  render() {
   // const {data} = this.props.modal_data
    const duration = this.getDayHour(this.props.modal_data.duration)
    return (
      <div>
        <Col xs="12">
          <table className='table table-striped table-bordered'>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{this.props.modal_data.id}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{this.props.modal_data.location}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{this.props.modal_data.description}</td>
              </tr>
              <tr>
                <th>Duration</th>
                <td>{duration}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default activityPreview;
