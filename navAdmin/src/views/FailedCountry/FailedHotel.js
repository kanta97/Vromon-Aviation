import React, {Component, Fragment} from 'react';
import Loadable from "react-loadable";
import Spinner from './../../Components/UI/Spinner/Spinner'
import * as dataTable from './../../Components/UI/Datatable'
import * as actionTypes from '../../API'
import './FailedHotel.css'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import ReactTable from "react-table"
import "react-table/react-table.css"

const loading = () => <Spinner/>;
const Layout = Loadable({
  loader: () => import('../../Containers/Layout'),
  loading
});

class FailedHotel extends Component {
  constructor(props){
    super(props)
    this.state = {
      hotelData: [],
      validForm: false,
      modal: false,
      loader: true,
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
      data: [],
      editData:[],
      pages: null,
      page: 0,
      header: [],
      pageSize: 10,
      sorted:[],
      filtered:[],
      resizable: false,
      showPageSizeOptions: false,
      loading: false,
      pageSizeOptions: [10, 20, 25, 50, 100,200,500,1000],
      defaultPageSize: 10
    }
    this.toggleInfo = this.toggleInfo.bind(this)
    this.toggleSuccess = this.toggleSuccess.bind(this)
    this.toggleDanger = this.toggleDanger.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
    //this.toggleRow = this.toggleRow.bind(this);
    //this.toggleSelectAll = this.toggleSelectAll.bind(this);
  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    })
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
      let data = await actionTypes.loadHotelData();
      //console.log(data.data)
      this.setState({
          loader: false,
          hotelData: data.data
      })
  }
  refreshActivity =(event)=>{
      event.preventDefault()
      actionTypes.refreshActivityHotel()
          .then((response) => {
              if(response.status === 200){
                console.log(response)
                  this.setState({
                      success: true,
                      successModalBody: response.data.message,
                      successModalTitle: 'Success'
                  })
                  console.log(this.state)
              } else {
                  this.setState({
                      danger: true,
                      warning: false,
                      dangerModalTitle: 'Failure',
                      dangerModalBody: 'Bad request'
                  })
              }

          })
          .catch((error) => {
              this.setState({
                  danger: true,
                  warning: false,
                  dangerModalTitle: 'Failure',
                  dangerModalBody: error
              })
          })
  }





  render() {
    var tableBody = '';
    var k = 0;
    if(this.state.hotelData.length > 0){

        tableBody = this.state.hotelData.map((value, index) => {
            var k = index+1;
            return <tr key={index}><td>{k}</td><td>{value.HotelCode}</td></tr>
        })
      }
     return (
      <Fragment>
      {this.state.loader ? <Spinner/>:
        <Layout>
          <Card>
            <CardHeader className="text-center">
              <h2>Failed hotel list</h2>
            </CardHeader>
            <CardBody>
                <div className='text-right add_btn'>
                    <Button color="primary" onClick={this.refreshActivity}><b>Refresh</b></Button>
                </div>
              <table className={'table table-bordered table-striped'}>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Code</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.hotelData.length > 0 ?
                    tableBody
                    : ''}
                </tbody>
              </table>
            </CardBody>
          </Card>
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
        </Layout>
      }
      </Fragment>
    );
  }
}

export default FailedHotel;
