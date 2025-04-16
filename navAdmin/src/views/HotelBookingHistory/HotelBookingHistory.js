import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
import "./HotelBookingHistory.css";
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

class HotelBookingHistory extends Component {
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
      .requestHotelBookingHistoryData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered,
        filter
      )
      .then((res) => {
        // console.log("sazzad", res);
        this.setState({
          data: res.rows,
          pages: res.pages,
          loader: false,
          loading: false,
        });
      });
  }

  statusChargeBookingHistory = (event, row) => {
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
      })
      .catch((error) => {
        this.setState({
          danger: true,
          warning: false,
          dangerModalTitle: "Failure",
          dangerModalBody: error,
        });
      });
  };

  render() {
    const { data, pages, loading, header } = this.state;
    // console.log(data);
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
          <Button
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
          </Button>
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
                    // {
                    //   Header: "Action",
                    //   accessor: "id",
                    //   width: 300,
                    //   headerClassName: "text-left table-header-css",
                    //   headerStyle: {},
                    //   className: "table-body-css",
                    //   filterable: false,
                    //   style: {},
                    //   Cell: (cellInfo) => getAction(cellInfo.row),
                    // },
                    {
                      Header: "User ID",
                      accessor: "user_id",
                      width: 300,
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                    },
                    {
                      Header: "TID",
                      accessor: "TID",
                      width: 300,
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                    },
                    {
                      Header: "Hotel Code",
                      accessor: "HotelCode",
                      width: getColumnWidth(data, "mobile_no", "Mobile"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Destination ID",
                      accessor: "DestinationId",
                      width: getColumnWidth(data, "booking_ref", "Booking Ref"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Hotel Name",
                      accessor: "HotelName",
                      width: getColumnWidth(data, "email", "Email"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Payment Option",
                      accessor: "PaymentOption",
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
                      Header: "CheckIn Date",
                      accessor: "CheckInDate",
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
                      Header: "CheckOut Date",
                      accessor: "CheckOutDate",
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
                      Header: "BookingReference",
                      accessor: "BookingReference",
                      width: getColumnWidth(
                        data,
                        "BookingReference",
                        "Booking Reference"
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
                      accessor: "BookingStatus",
                      width: getColumnWidth(data, "remark", "Remark"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Cancellation Deadline",
                      accessor: "CancellationDeadline",
                      width: getColumnWidth(data, "remark", "Remark"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Price",
                      accessor: "Price",
                      width: getColumnWidth(data, "remark", "Remark"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                    },
                    {
                      Header: "Currency",
                      accessor: "Currency",
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

export default HotelBookingHistory;
