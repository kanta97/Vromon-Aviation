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

class hotelPreview extends Component {
  constructor(props){
    super(props)
    //console.log(this.props.modal_data)
  }


  render() {
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
              <th>Name</th>
              <td>{this.props.modal_data.name}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{this.props.modal_data.location}</td>
            </tr>
            <tr>
              <th>Tour Type</th>
              <td>{this.props.modal_data.tour_type}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.props.modal_data.description}</td>
            </tr>
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default hotelPreview;
