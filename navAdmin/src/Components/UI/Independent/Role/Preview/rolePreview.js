import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import {Col} from 'reactstrap';

class RolePreview extends Component {
  constructor(props){
    super(props)
    //console.log('here');
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
              <th>Role Name</th>
              <td>{this.props.modal_data.role_name}</td>
            </tr>
            <tr>
              <th>Display Role Name</th>
              <td>{this.props.modal_data.display_role_name}</td>
            </tr>
            <tr>
              <th>Active/Deactive</th>
              <td>{this.props.modal_data.is_active}</td>
            </tr>
            <tr>
              <th>Created By</th>
              <td>{this.props.modal_data.createdBy}</td>
            </tr>
           <tr>
            <th>Updated by</th>
            <td>{this.props.modal_data.updatedBy}</td>
            </tr>
            <tr>
            <th>Created At</th>
            <td>{this.props.modal_data.createdAt}</td>
            </tr>
          <tr>
          <th>Deletad at</th>
          <td>{this.props.modal_data.updatedAt}</td>
        </tr>

            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default RolePreview;
