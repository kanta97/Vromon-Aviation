import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
import "./BookingHistory.css";
//import data from './history.json'
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
  Row,
} from "reactstrap";

import ReactTable from "react-table";
import "react-table/react-table.css";

const loading = () => <Spinner />;

const Layout = Loadable({
  loader: () => import("../../Containers/Layout"),
  loading,
});

const ChangeStatus = Loadable({
  loader: () =>
    import(
      "../../Components/UI/Independent/BookingHistory/ChangeStatus/changeStatus"
    ),
  loading,
});

const Log = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/BookingHistory/Log/Log"),
  loading,
});

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalLog: false,
      ModalStatusChange: false,
      validForm: false,
      modal: false,
      loader: false,
      successModalTitle: "",
      infoModalTitle: "",
      dangerModalTitle: "",
      warningModalTitle: "",
      successModalBody: "",
      infoModalBody: "",
      dangerModalBody: "",
      warningModalBody: "",
      success: false,
      info: false,
      danger: false,
      warning: false,
      data: [],
      editData: [],
      pages: null,
      page: 0,
      header: [],
      pageSize: 15,
      sorted: [],
      filtered: [],
      resizable: false,
      showPageSizeOptions: false,
      loading: false,
      pageSizeOptions: [10, 20, 25, 50, 100, 200, 500, 1000],
      defaultPageSize: 10,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    //this.toggleRow = this.toggleRow.bind(this);
    //this.toggleSelectAll = this.toggleSelectAll.bind(this);
  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  fetchData(state, instance) {
    let filter = "";
    this.setState({ loading: true });
    dataTable
      .requestBookingHistoryData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered,
        filter
      )
      .then((res) => {
        // console.log(res)
        if(localStorage.getItem('userRole')==6){
          console.log(res.rows)
          let tempArray=[]
          for(let i=0; i<res.rows.length;i++){
              if(res.rows[i].remark=='CUSTOM' && res.rows[i].id>789){
                  tempArray.push(res.rows[i])
              }
          }
          res.rows=tempArray;
      }
        this.setState({
          data: res.rows,
          pages: res.pages,
          loader: false,
          loading: false,
        });
      });
  }

  statusChargeBookingHistory = (event, row) => {
    console.log("sazzad", row);
    event.preventDefault();
    /*actionTypes.changeStatus(row)
      .then((response) => {
        */
    this.setState({
      info: true,
      ModalStatusChange: true,
      ModalLog: false,
      editData: row, //response.data.body[0],
      infoModalTitle: "Status Change",
    });
    /*  })
      .catch((error) => {
        alert(error)
        /!*this.setState({
          danger: true,
          warning: false,
          dangerModalTitle: 'Failure',
          dangerModalBody: error
        })*!/
      })*/
  };

  handleStatusChangeResponse = (status, message) => {
    if (status) {
      this.setState({
        info: true,
        ModalStatusChange: false,
        ModalLog: false,
      });
      this.fetchData(this.state);
    } else {
      this.setState({});
    }
  };
  viewLogBookingHistory = (event, id) => {
    event.preventDefault();
    actionTypes
      .viewLog(id)
      .then((response) => {
        this.setState({
          info: true,
          ModalStatusChange: false,
          ModalLog: true,
          editData: [], //response.data.body[0],
          infoModalTitle: "Log of ID",
        });
        /*if(response.data.status === '200 OK'){
          if(response.data.body.length > 0){
            this.setState({
              info: true,
              addModalBookingHistory: false,
              editModalBookingHistory: false,
              previewModalBookingHistory: true,
              editData: response.data.body[0],
              infoModalTitle: 'BookingHistory view of ID '+response.data.body[0].id,
            })
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: 'Failure',
              dangerModalBody: 'BookingHistory not exits'
            })
          }

        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: 'Failure',
            dangerModalBody: response.data.body
          })
        }*/
      })
      .catch((error) => {
        /*this.setState({
          danger: true,
          warning: false,
          dangerModalTitle: 'Failure',
          dangerModalBody: error
        })*/
      });
  };

  render() {
    const { data, pages, loading, header } = this.state;
    const getColumnWidth = (rows, accessor, headerText) => {
      const maxWidth = 200;
      const magicSpacing = 20;
      const cellLength = Math.max(
        ...rows.map((row) => (`${row[accessor]}` || "").length),
        headerText.length
      );
      return Math.min(maxWidth, cellLength * magicSpacing);
    };
    const getAction = (row) => {
      //console.log(id)
      return (
        <span>
          <Button
            key={row.id + "1"}
            className="btn btn-info btn-sm margin-right10"
            onClick={(event) => this.statusChargeBookingHistory(event, row)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-eye"></i>
              </span>
              Status Change
            </strong>
          </Button>
          {/* <Button
            key={row.id + "2"}
            className="btn btn-success btn-sm margin-right10"
            onClick={(event) => this.viewLogBookingHistory(event, row.id)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-history"></i>
              </span>
              Log
            </strong>
          </Button> */}
        </span>
      );
    };

    return (
      <Fragment>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <Layout>
            <Card>
              <CardHeader className="text-center">
                <h2>Booking History list</h2>
              </CardHeader>
              <CardBody>
                <ReactTable
                  columns={[
                    {
                      Header: "Action",
                      accessor: "id",
                      width: 300,
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      Cell: (cellInfo) => getAction(cellInfo.row),
                    },
                    {
                      Header: "Package",
                      accessor: "package_id",
                      width: 300,
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                    },
                    {
                      Header: "Tour Type",
                      accessor: "tour_type",
                      width: getColumnWidth(data, "tour_type", "Tour Type"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                    },
                    {
                      Header: "Mobile",
                      accessor: "mobile_no",
                      width: getColumnWidth(data, "mobile_no", "Mobile"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Booking Ref",
                      accessor: "booking_ref",
                      width: getColumnWidth(data, "booking_ref", "Booking Ref"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Email",
                      accessor: "email",
                      width: getColumnWidth(data, "email", "Email"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "People Count",
                      accessor: "people_count",
                      width: getColumnWidth(
                        data,
                        "people_count",
                        "People Count"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Children Count",
                      accessor: "children_count",
                      width: getColumnWidth(
                        data,
                        "children_count",
                        "Children Count"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Payment Mode",
                      accessor: "paymentMode",
                      width: getColumnWidth(
                        data,
                        "paymentMode",
                        "Payment Mode"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Booking Status",
                      accessor: "booking_status",
                      width: getColumnWidth(
                        data,
                        "booking_status",
                        "Booking Status"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Remark",
                      accessor: "remark",
                      width: getColumnWidth(data, "remark", "Remark"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData} // Request new data when things change
                  minRows={0}
                  filterable={true}
                  resizable={this.state.resizable} /*
                    filtered={this.state.filtered}*/
                  defaultPageSize={this.state.defaultPageSize}
                  showPageSizeOptions={this.state.showPageSizeOptions}
                  pageSizeOptions={this.state.pageSizeOptions}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
            <div>
              <Modal
                backdrop="static"
                size="lg"
                isOpen={this.state.info}
                toggle={this.toggleInfo}
                className={"modal-info " + this.props.className}
              >
                <ModalHeader className="text-center" toggle={this.toggleInfo}>
                  {this.state.infoModalTitle}
                </ModalHeader>
                <ModalBody>
                  {this.state.ModalLog ? <Log /> : ""}

                  {this.state.ModalStatusChange ? (
                    <ChangeStatus
                      modal_data={this.state.editData}
                      onStatusChangeResponse={this.handleStatusChangeResponse}
                    />
                  ) : (
                    ""
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleInfo}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              <Modal
                isOpen={this.state.success}
                toggle={this.toggleSuccess}
                className={"modal-success " + this.props.className}
              >
                <ModalHeader toggle={this.toggleSuccess}>
                  {this.state.successModalTitle}
                </ModalHeader>
                <ModalBody>{this.state.successModalBody}</ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={this.toggleSuccess}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              <Modal
                isOpen={this.state.danger}
                toggle={this.toggleDanger}
                className={"modal-danger " + this.props.className}
              >
                <ModalHeader toggle={this.toggleDanger}>
                  {this.state.dangerModalTitle}
                </ModalHeader>
                <ModalBody>{this.state.dangerModalBody}</ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={this.toggleDanger}>
                    Cancel
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              <Modal
                backdrop="static"
                size="md"
                isOpen={this.state.warning}
                toggle={this.toggleWarning}
                className={"modal-warning " + this.props.className}
              >
                <ModalHeader toggle={this.toggleWarning}>
                  {this.state.warningModalTitle}
                </ModalHeader>
                <ModalBody>{this.state.warningModalBody}</ModalBody>
                <ModalFooter>
                  <Button
                    color="warning"
                    className="text-white"
                    onClick={this.toggleWarning}
                  >
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </div>
          </Layout>
        )}
      </Fragment>
    );
  }
}

export default BookingHistory;
