import React, {Component, Fragment} from 'react';
import Loadable from "react-loadable";
import Spinner from './../../Components/UI/Spinner/Spinner'
import * as dataTable from './../../Components/UI/Datatable'
import * as actionTypes from '../../API'
import './Hotel.css'
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

const AddHotel = Loadable({
  loader: () => import('../../Components/UI/Independent/Hotel/Add/addHotel'),
  loading
});

const EditHotel = Loadable({
  loader: () => import('../../Components/UI/Independent/Hotel/Edit/editHotel'),
  loading
});

const PreviewHotel = Loadable({
  loader: () => import('../../Components/UI/Independent/Hotel/Preview/hotelPreview'),
  loading
});
class Hotel extends Component {
  constructor(props){
    super(props)
    this.state = {
      addModalHotel: false,
      editModalHotel: false,
      previewModalHotel: false,
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
    dataTable.requestHotelData(
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

  openAddHotel =(event) =>{
    event.preventDefault()
    this.setState({
      info: true,
      infoModalTitle: 'Add Hotel',
      addModalHotel: true,
      editModalHotel: false,
      previewModalHotel: false,
    })
  }
  handleEditHotelResponse = (status, message) =>{
    if(status){
      this.setState({
        modal: true,
        editModalHotel: false,
        addModalHotel: false,
        previewModalHotel: false,
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
        editModalHotel: false,
        addModalHotel: false,
        previewModalHotel: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })
    }
  }
  handleAddHotelResponse = (status, message) => {
    if(status){
      this.setState({
        modal: true,
        addModalHotel: false,
        editModalHotel: false,
        previewModalHotel: false,
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
        addModalHotel: false,
        editModalHotel: false,
        previewModalHotel: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })
    }
  }

  deleteHotelIDConfirm = (event, val) => {
    event.preventDefault()
    actionTypes.deleteHotel(val)
      .then((response) => {
        if(response.status){
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

  deleteHotel = (event, val) =>{
    // event.preventDefault()
    // console.log(val)
    const html = (
      <Col>
        <div className='delete_alert_text'>
          Do you want to delete!
        </div>
        <Row>
          <div className='col-sm-6 text-center text-white'>
            <button className='btn btn-danger' onClick={(event) => this.deleteHotelIDConfirm(event, val)}><strong>Yes</strong></button>
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
  editHotel = (event, id) =>{
    event.preventDefault()
    actionTypes.getHotel(id)
      .then((response) => {
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            if(response.data.body.length > 0){
              this.setState({
                info: true,
                addModalHotel: false,
                editModalHotel: true,
                previewModalHotel: false,
                editData: response.data.body[0],
                infoModalTitle: 'Hotel view of ID '+response.data.body[0].id,
              })
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: 'Failure',
                dangerModalBody: 'Hotel not exits'
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
 /*customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
            return (row[id] !== undefined
                ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
                : true);
        }
    }*/

  previewHotel = (event, id) =>{
    event.preventDefault()
    actionTypes.getHotel(id)
      .then((response) => {
        if(response.status === 200){
          if(response.data.status === '200 OK'){
            if(response.data.body.length > 0){
              this.setState({
                info: true,
                addModalHotel: false,
                editModalHotel: false,
                previewModalHotel: true,
                editData: response.data.body[0],
                infoModalTitle: 'Hotel view of ID '+response.data.body[0].id,
              })
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: 'Failure',
                dangerModalBody: 'Hotel not exits'
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

      return <span><Button key={id+'1'} className='btn btn-info btn-sm margin-right10'  onClick={(event) => this.previewHotel(event, id)}>
        <strong><span className='margin-right10'><i className='fa fa-eye'></i></span>Preview</strong></Button><Button key={id+'2'} className='btn btn-warning btn-sm margin-right10'  onClick={(event) => this.editHotel(event, id)}><strong><span className='margin-right10'><i className='fa fa-edit'></i></span>Edit</strong></Button><Button key={id+'3'} className='btn btn-danger btn-sm'  onClick={(event) => this.deleteHotel(event, id)}><strong><span className='margin-right10'><i className='fa fa-trash'></i></span>Delete</strong></Button></span>
    }

    return (
      <Fragment>
        {this.state.loader ? <Spinner/>:
          <Layout>
            <div className='text-right add_btn'>
              <Button color="primary" onClick={this.openAddHotel}><b>Add</b></Button>
            </div>
            <Card>
              <CardHeader className="text-center">
                <h2>Hotel list</h2>
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
                      Header: "Name",
                      accessor: "name",
                      width: getColumnWidth(data, 'name', 'Name'),
                      headerClassName: 'text-left table-header-css',
                      headerStyle: {},
                      className: 'table-body-css',
                      filterable: true,

                      style:{
                      },
                    },
                    {
                      Header: "Location",
                      accessor: "location",
                      width: getColumnWidth(data, 'location', 'Location'),
                      headerClassName: 'text-left table-header-css',
                      headerStyle: {},
                      className: 'table-body-css',
                      filterable: true,
                      style:{
                      },
                    },
                    {
                      Header: "Tour Type",
                      accessor: "tour_type",
                      width: getColumnWidth(data, 'tour_type', 'Tour Type'),
                      headerClassName: 'text-left table-header-css',
                      headerStyle: {},
                      className: 'table-body-css',
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                    {
                      Header: "Description",
                      accessor: "description",
                      width: getColumnWidth(data, 'description', 'Description'),
                      headerClassName: 'text-left table-header-css',
                      headerStyle: {},
                      className: 'table-body-css',
                      filterable: false,
                      style: {},
                     // Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    }
                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData} // Request new data when things change
                  minRows = {0}
                  /*filterable = {true}
                  caseInsensitiveFiltering={true}
                  subStringFiltering ={true}*/
                  resizable = {this.state.resizable}

                  filtered={this.state.filtered}
                  onFilteredChange={filtered => this.setState({ filtered })}
                  defaultFilterMethod={(filter, row, column) => {
                      const id = filter.pivotId || filter.id
                      return row[id] !== undefined
                          ? String(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1
                          : true
                  }}
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
                  {this.state.addModalHotel ?
                    <AddHotel onAddHotelResponse={this.handleAddHotelResponse} />
                    : ''}

                  {this.state.editModalHotel ?
                    <EditHotel modal_data ={this.state.editData} onEditHotelResponse={this.handleEditHotelResponse} />
                    : ''}

                  {this.state.previewModalHotel ?
                    <PreviewHotel modal_data ={this.state.editData}/>
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

export default Hotel;
