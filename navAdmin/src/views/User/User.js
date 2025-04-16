/**
 * Created by Shohanur on 3/20/2019.
 */

import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
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

const AddUser = Loadable({
  loader: () => import("../../Components/UI/Independent/User/Add/addUser"),
  loading,
});

const EditUser = Loadable({
  loader: () => import("../../Components/UI/Independent/User/Edit/editUser"),
  loading,
});

const PreviewUser = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/User/Preview/userPreview"),
  loading,
});

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalUser: false,
      editModalUser: false,
      previewModalUser: false,
      controls: {
        LOCATION: "",
        DESCRIPTION: "",
        DURATION: "",
      },
      validForm: false,
      modal: false,
      loader: false,
      statusPreviewModal: true,
      statusEditModal: true,
      activePreviewModal: false,
      activeEditModal: false,
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
      pageSize: 10,
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
      .requestUserData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered,
        filter
      )
      .then((res) => {
        //console.log(res)
        this.setState({
          data: res.rows,
          pages: res.pages,
          loader: false,
          loading: false,
        });
      });
  }

  openAddUser = (event) => {
    event.preventDefault();
    this.setState({
      info: true,
      infoModalTitle: "Add User",
      addModalUser: true,
      editModalUser: false,
      previewModalUser: false,
    });
  };
  handleEditUserResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        editModalUser: false,
        addModalUser: false,
        previewModalUser: false,
        info: false,
        infoModalTitle: "",
        success: true,
        successModalTitle: "Success",
        successModalBody: message,
      });
      this.fetchData(this.state);
    } else {
      this.setState({
        modal: true,
        editModalUser: false,
        addModalUser: false,
        previewModalUser: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };
  handleAddUserResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        addModalUser: false,
        editModalUser: false,
        previewModalUser: false,
        info: false,
        infoModalTitle: "",
        success: true,
        successModalTitle: "Success",
        successModalBody: message,
      });
      this.fetchData(this.state);
    } else {
      this.setState({
        modal: true,
        addModalUser: false,
        editModalUser: false,
        previewModalUser: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };

  deleteUserIDConfirm = (event, val) => {
    event.preventDefault();
    actionTypes
      .deleteUser(val)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            success: true,
            warning: false,
            successModalTitle: "Success",
            successModalBody: response.data.message,
          });
          this.fetchData(this.state);
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: response.data.message,
          });
        }
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

  deleteUser = (event, val) => {
    event.preventDefault();
    // console.log(val);
    const html = (
      <Col>
        <div className="delete_alert_text">Do you want to delete!</div>
        <Row>
          <div className="col-sm-6 text-center text-white">
            <button
              className="btn btn-danger"
              onClick={(event) => this.deleteUserIDConfirm(event, val)}
            >
              <strong>Yes</strong>
            </button>
          </div>
          <div className="col-sm-6 text-center">
            <button
              className="btn btn-info text-white"
              onClick={this.toggleWarning}
            >
              <strong>No</strong>
            </button>
          </div>
        </Row>
      </Col>
    );
    this.setState({
      warning: true,
      warningModalTitle: "Are you sure?",
      warningModalBody: html,
    });
  };
  editUser = (event, id) => {
    event.preventDefault();
    actionTypes
      .getUser(id)
      .then((response) => {
        if (response.data.message) {
          if (response.data.message) {
            this.setState({
              info: true,
              addModalUser: false,
              editModalUser: true,
              previewModalUser: false,
              editData: response.data.message,
              infoModalTitle: "User view of ID " + response.data.message.usernm,
            });
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: "Failure",
              dangerModalBody: "User not exits",
            });
          }
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: response.data.body,
          });
        }
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

  previewUser = (event, id) => {
    event.preventDefault();
    actionTypes
      .getUser(id)
      .then((response) => {
        if (response.data.message) {
          if (response.data.message) {
            this.setState({
              info: true,
              addModalUser: false,
              editModalUser: false,
              previewModalUser: true,
              editData: response.data.message,
              infoModalTitle: "User view of ID " + response.data.message.usernm,
            });
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: "Failure",
              dangerModalBody: "User not exits",
            });
          }
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: response.data.body,
          });
        }
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
    const getColumnWidth = (rows, accessor, headerText) => {
      const maxWidth = 200;
      const magicSpacing = 20;
      const cellLength = Math.max(
        ...rows.map((row) => (`${row[accessor]}` || "").length),
        headerText.length
      );
      return Math.min(maxWidth, cellLength * magicSpacing);
    };
    const getAction = (id) => {
      //console.log(id)
      return (
        <span>
          <Button
            key={id + "1"}
            className="btn btn-info btn-sm margin-right10"
            onClick={(event) => this.previewUser(event, id)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-eye"></i>
              </span>
              Preview
            </strong>
          </Button>
          <Button
            key={id + "2"}
            className="btn btn-warning btn-sm margin-right10"
            onClick={(event) => this.editUser(event, id)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-edit"></i>
              </span>
              Edit
            </strong>
          </Button>
          <Button
            key={id + "3"}
            className="btn btn-danger btn-sm"
            onClick={(event) => this.deleteUser(event, id)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-trash"></i>
              </span>
              Delete
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
            <div className="text-right add_btn">
              {/* <Button color="primary" onClick={this.openAddUser}><b>Add</b></Button> */}
            </div>
            <Card>
              <CardHeader className="text-center">
                <h2>User list</h2>
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
                      Cell: (cellInfo) => getAction(cellInfo.row.id),
                    },
                    {
                      Header: "Username",
                      accessor: "usernm",
                      width: getColumnWidth(data, "usernm", "Username"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                    },
                    {
                      Header: "Display Name",
                      accessor: "display_name",
                      width: getColumnWidth(
                        data,
                        "display_name",
                        "Display Name"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
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
                    },
                    {
                      Header: "Phone Number",
                      accessor: "phone_no",
                      width: getColumnWidth(data, "phone_no", "Phone Number"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      //Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                    {
                      Header: "Role",
                      accessor: "role_name",
                      width: getColumnWidth(data, "role_name", "Role"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      // Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                    {
                      Header: "User Type",
                      accessor: "user_type",
                      width: getColumnWidth(data, "user_type", "User Type"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      // Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                    {
                      Header: "Service id",
                      accessor: "service_id",
                      width: getColumnWidth(data, "service_id", "Service Id"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      // Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                    {
                      Header: "Active/Deactive",
                      accessor: "is_active",
                      width: getColumnWidth(
                        data,
                        "is_active",
                        "Active/Deactive"
                      ),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: true,
                      style: {},
                      // Cell: cellInfo => (getDayHour(cellInfo.row.description))
                    },
                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData} // Request new data when things change
                  minRows={0}
                  filterable={true}
                  resizable={
                    this.state.resizable
                  } /*
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
                  {this.state.addModalUser ? (
                    <AddUser onAddUserResponse={this.handleAddUserResponse} />
                  ) : (
                    ""
                  )}

                  {this.state.editModalUser ? (
                    <EditUser
                      modal_data={this.state.editData}
                      onEditUserResponse={this.handleEditUserResponse}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalUser ? (
                    <PreviewUser modal_data={this.state.editData} />
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

export default User;
