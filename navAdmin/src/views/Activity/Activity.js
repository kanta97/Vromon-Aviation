import React, {Component, Fragment} from 'react';
import Loadable from "react-loadable";
import Spinner from './../../Components/UI/Spinner/Spinner'
import * as dataTable from './../../Components/UI/Datatable'
import * as actionTypes from '../../API'
import './Activity.css'
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

const AddActivity = Loadable({
  loader: () => import('../../Components/UI/Independent/Activity/Add/addActivity'),
  loading
});

const EditActivity = Loadable({
  loader: () => import('../../Components/UI/Independent/Activity/Edit/editActivity'),
  loading
});

const PreviewActivity = Loadable({
  loader: () => import('../../Components/UI/Independent/Activity/Preview/activityPreview'),
  loading
});

class Activity extends Component {
  constructor(props){
    super(props)
    this.state = {
      addModalActivity: false,
      editModalActivity: false,
      previewModalActivity: false,
      controls:{
        LOCATION: '',
        DESCRIPTION: '',
        DURATION: ''
      },
      validForm: false,
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
    this.fetchData = this.fetchData.bind(this)
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

  fetchData(state, instance) {
    let filter = ''
    this.setState({ loading: true })
    dataTable.requestActivityData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered,
      filter
    ).then(res => {
      //console.log(res)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loader: false,
        loading: false
      })
    })
  }

  openAddActivity =(event) =>{
    event.preventDefault()
    this.setState({
      info: true,
      infoModalTitle: 'Add Activity',
      addModalActivity: true,
      editModalActivity: false,
      previewModalActivity: false,
    })
  }
  handleEditActivityResponse = (status, message) =>{
    if(status){
      this.setState({
        modal: true,
        editModalActivity: false,
        addModalActivity: false,
        previewModalActivity: false,
        info: false,
        infoModalTitle: '',
        success: true,
        successModalTitle: 'Success',
        successModalBody: message,
      })
      this.fetchData(this.state)
    } else {
      this.setState({
        modal: true,
        editModalActivity: false,
        addModalActivity: false,
        previewModalActivity: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })
    }
  }
  handleAddActivityResponse = (status, message) => {
    if(status){
      this.setState({
        modal: true,
        addModalActivity: false,
        editModalActivity: false,
        previewModalActivity: false,
        info: false,
        infoModalTitle: '',
        success: true,
        successModalTitle: 'Success',
        successModalBody: message,
      })
      this.fetchData(this.state)
    } else {
      this.setState({
        modal: true,
        addModalActivity: false,
        editModalActivity: false,
        previewModalActivity: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })
    }
  }

  deleteActivityIDConfirm = (event, val) => {
    event.preventDefault()
    actionTypes.deleteActivity(val)
      .then((response) => {
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            this.setState({
              success: true,
              warning: false,
              successModalTitle: 'Success',
              successModalBody: response.data.body,
            })
            this.fetchData(this.state)
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: 'Failure',
              dangerModalBody: response.data.body
            })
          }
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: 'Failure',
            dangerModalBody: "Bad request"
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

  deleteActivity = (event, val) =>{
   // event.preventDefault()
   // console.log(val)
    const html = (
      <Col>
        <div className='delete_alert_text'>
          Do you want to delete!
        </div>
        <Row>
          <div className='col-sm-6 text-center text-white'>
            <button className='btn btn-danger' onClick={(event) => this.deleteActivityIDConfirm(event, val)}><strong>Yes</strong></button>
          </div>
          <div className='col-sm-6 text-center'>
            <button className='btn btn-info text-white' onClick={this.toggleWarning}><strong>No</strong></button>
          </div>
        </Row>
      </Col>
    )
    this.setState({
      warning: true,
      warningModalTitle: 'Are you sure?',
      warningModalBody: html,
    })
  }
  editActivity = (event, id) =>{
    event.preventDefault()
    actionTypes.getActivity(id)
      .then((response) => {
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            if(response.data.body.length > 0){
              this.setState({
                info: true,
                addModalActivity: false,
                editModalActivity: true,
                previewModalActivity: false,
                editData: response.data.body[0],
                infoModalTitle: 'Activity view of ID '+response.data.body[0].id,
              })
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: 'Failure',
                dangerModalBody: 'Activity not exits'
              })
            }

          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: 'Failure',
              dangerModalBody: response.data.body
            })
          }
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


  previewActivity = (event, id) =>{
    event.preventDefault()
    actionTypes.getActivity(id)
      .then((response) => {
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            if(response.data.body.length > 0){
              this.setState({
                info: true,
                addModalActivity: false,
                editModalActivity: false,
                previewModalActivity: true,
                editData: response.data.body[0],
                infoModalTitle: 'Activity view of ID '+response.data.body[0].id,
              })
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: 'Failure',
                dangerModalBody: 'Activity not exits'
              })
            }

          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: 'Failure',
              dangerModalBody: response.data.body
            })
          }
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
    const { data, pages, loading, header } = this.state
    const getColumnWidth = (rows, accessor, headerText) => {
      const maxWidth = 200
      const magicSpacing = 20
      const cellLength = Math.max(
        ...rows.map(row => (`${row[accessor]}` || '').length),
        headerText.length,
      )
      return Math.min(maxWidth, cellLength * magicSpacing)
    }
    const getAction = (id) =>{
      //console.log(id)
      return <span><Button key={id+'1'} className='btn btn-info btn-sm margin-right10'  onClick={(event) => this.previewActivity(event, id)}><strong><span className='margin-right10'><i className='fa fa-eye'></i></span>Preview</strong></Button><Button key={id+'2'} className='btn btn-warning btn-sm margin-right10'  onClick={(event) => this.editActivity(event, id)}><strong><span className='margin-right10'><i className='fa fa-edit'></i></span>Edit</strong></Button><Button key={id+'3'} className='btn btn-danger btn-sm'  onClick={(event) => this.deleteActivity(event, id)}><strong><span className='margin-right10'><i className='fa fa-trash'></i></span>Delete</strong></Button></span>
    }
    const getDayHour = (val) => {
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
    return (
      <Fragment>
      {this.state.loader ? <Spinner/>:
        <Layout>
          <div className='text-right add_btn'>
            <Button color="primary" onClick={this.openAddActivity}><b>Add</b></Button>
          </div>
          <Card>
            <CardHeader className="text-center">
              <h2>Activity list</h2>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "Action",
                    accessor: "id",
                    width: 300,
                    headerClassName: 'text-left table-header-css',
                    headerStyle: {},
                    className: 'table-body-css',
                    filterable: false,
                    style:{
                    },
                    Cell: cellInfo => (getAction(cellInfo.row.id))
                  },
                  {
                    Header: "Location",
                    accessor: "location",
                    width: 300,
                    headerClassName: 'text-left table-header-css',
                    headerStyle: {},
                    className: 'table-body-css',
                    filterable: false,
                    style:{
                    },
                  },
                  {
                    Header: "Description",
                    accessor: "description",
                    width: getColumnWidth(data, 'description', 'Description'),
                    headerClassName: 'text-left table-header-css',
                    headerStyle: {},
                    className: 'table-body-css',
                    filterable: false,
                    style:{
                    },
                  },
                  {
                    Header: "Duration",
                    accessor: "duration",
                    width: getColumnWidth(data, 'duration', 'Duration'),
                    headerClassName: 'text-left table-header-css',
                    headerStyle: {},
                    className: 'table-body-css',
                    filterable: false,
                    style: {},
                    Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                  }
                ]}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={data}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
                minRows = {0}
                filterable = {false}
                resizable = {this.state.resizable}/*
                    filtered={this.state.filtered}*/
                defaultPageSize = {this.state.defaultPageSize}
                showPageSizeOptions = {this.state.showPageSizeOptions}
                pageSizeOptions = {this.state.pageSizeOptions}
                className="-striped -highlight"/>
            </CardBody>
          </Card>
          <div>
            <Modal backdrop='static' size='lg' isOpen={this.state.info} toggle={this.toggleInfo}
                   className={'modal-info ' + this.props.className}>
              <ModalHeader className='text-center' toggle={this.toggleInfo}>{this.state.infoModalTitle}</ModalHeader>
              <ModalBody>
                {this.state.addModalActivity ?
                  <AddActivity onAddActivityResponse={this.handleAddActivityResponse} />
                  : ''}

                {this.state.editModalActivity ?
                  <EditActivity modal_data ={this.state.editData} onEditActivityResponse={this.handleEditActivityResponse} />
                  : ''}

                {this.state.previewModalActivity ?
                  <PreviewActivity modal_data ={this.state.editData}/>
                  : ''}



              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleInfo}>Close</Button>{' '}
              </ModalFooter>
            </Modal>
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
        </Layout>
      }
      </Fragment>
    );
  }
}

export default Activity;
