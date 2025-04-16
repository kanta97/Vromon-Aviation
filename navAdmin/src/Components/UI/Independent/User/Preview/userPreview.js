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

class UserPreview extends Component {
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
              <th>Username</th>
              <td>{this.props.modal_data.usernm}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{this.props.modal_data.display_name}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{this.props.modal_data.phone_no}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{this.props.modal_data.email}</td>
            </tr>
           <tr>
            <th>Role</th>
            <td>{this.props.modal_data.role}</td>
            </tr>
            <tr>
            <th>User Type</th>
            <td>{this.props.modal_data.user_type}</td>
            </tr>
          <tr>
          <th>Service id</th>
          <td>{this.props.modal_data.service_id}</td>
        </tr>
          <tr>
            <th>Active/Deactive</th>
            <td>{this.props.modal_data.is_active}</td>
          </tr>
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default UserPreview;
