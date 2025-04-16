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

class couponPreview extends Component {
  constructor(props){
    super(props)
     //console.log(this.props.modal_data)
  }

  render() {
   // const {data} = this.props.modal_data

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
                <th>Code</th>
                <td>{this.props.modal_data.code}</td>
              </tr>
              <tr>
                <th>Discount</th>
                <td>{this.props.modal_data.discount}</td>
              </tr>
              <tr>
                <th>Valid Till</th>
                <td>{new Date(this.props.modal_data.valid_till).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{this.props.modal_data.status}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default couponPreview;
