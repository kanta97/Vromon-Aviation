import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API/currency'
import {

  Col,

} from 'reactstrap';

class CurrencyPreview extends Component {
  // constructor(props){
  //   super(props)
  //   //console.log(this.props.modal_data)
  // }


  render() {
    return (
      <div>
        <Col xs="12">
          <table className='table table-striped table-bordered'>
            <tbody>
            <tr>
              <th>NO</th>
              <td>{this.props.modal_data.id}</td>
            </tr>
            <tr>
              <th>Currency Name</th>
              <td>{this.props.modal_data.fromCurrency}</td>
            </tr>
            <tr>
              <th>Currency Rate</th>
              <td>{this.props.modal_data.toCurrency}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{this.props.modal_data.updatedAt}</td>
            </tr>
            <tr>
              <th>Updated By</th>
              <td>{this.props.modal_data.updatedBy}</td>
            </tr>
           
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

export default CurrencyPreview;
