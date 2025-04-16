import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
import "./Coupon.css";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardHeader,
  Row,
  Badge,
  Button,
  ButtonDropdown,
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
} from "reactstrap";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { checkValidity, updateObject } from "../../shared/utility";

const loading = () => <Spinner />;
const Layout = Loadable({
  loader: () => import("../../Containers/Layout"),
  loading,
});

const AddCoupon = Loadable({
  loader: () => import("../../Components/UI/Independent/Coupon/Add/addCoupon"),
  loading,
});
const UploadWindow = Loadable({
  loader: () =>
    import(
      "../../Components/UI/Independent/Coupon/ExcelUploadWindow/openExcelUploadWindow"
    ),
  loading,
});

const EditCoupon = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Coupon/Edit/editCoupon"),
  loading,
});

const PreviewCoupon = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Coupon/Preview/couponPreview"),
  loading,
});

const StatusCoupon = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Coupon/Status/statusCoupon"),
  loading,
});

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalCoupon: false,
      editModalCoupon: false,
      previewModalCoupon: false,
      userAssignModal: false,
      openExcelUploadWindow: false,
      controls: {
        criteria: {
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        value: {
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      },
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
      pageSize: 10,
      sorted: [],
      filtered: [],
      resizable: false,
      showPageSizeOptions: false,
      loading: false,
      pageSizeOptions: [10, 20, 25, 50, 100, 200, 500, 1000],
      defaultPageSize: 10,
      nameActive: false,
      validTillActive: false,
      statusActive: true,
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
    let criteria =
      this.state.controls["criteria"].value !== "" &&
      this.state.controls["criteria"].value !== null &&
      this.state.controls["criteria"].value !== undefined
        ? this.state.controls["criteria"].value
        : "";
    let value =
      this.state.controls["value"].value !== "" &&
      this.state.controls["value"].value !== null &&
      this.state.controls["value"].value !== undefined
        ? this.state.controls["value"].value
        : "";

    this.setState({ loading: true });
    dataTable
      .requestCouponData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered,
        criteria,
        value
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

  openAddCoupon = (event) => {
    event.preventDefault();
    this.setState({
      info: true,
      infoModalTitle: "Add Coupon",
      addModalCoupon: true,
      editModalCoupon: false,
      previewModalCoupon: false,
      userAssignModal: false,
    });
  };
  openExcelUploadWindow = (event) => {
    event.preventDefault();
    this.setState({
      info: true,
      infoModalTitle: "Add Coupon",
      addModalCoupon: false,
      editModalCoupon: false,
      previewModalCoupon: false,
      userAssignModal: false,
      openExcelUploadWindow: true,
    });
  };

  handleStatusCouponResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        editModalCoupon: false,
        addModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        info: false,
        infoModalTitle: "",
        success: true,
        successModalTitle: "Success",
        successModalBody: message,
      });
    } else {
      this.setState({
        modal: true,
        editModalCoupon: false,
        addModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };

  handleEditCouponResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        editModalCoupon: false,
        addModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
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
        editModalCoupon: false,
        addModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };
  handleAddCouponResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        addModalCoupon: false,
        editModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
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
        addModalCoupon: false,
        editModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };
  handleopenExcelUploadWindow = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        addModalCoupon: false,
        editModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        openExcelUploadWindow: false,
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
        addModalCoupon: false,
        editModalCoupon: false,
        previewModalCoupon: false,
        userAssignModal: false,
        openExcelUploadWindow: false,

        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };

  deleteCouponIDConfirm = (event, val) => {
    event.preventDefault();
    actionTypes
      .deleteCoupon(val)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === "200 OK") {
            this.setState({
              success: true,
              warning: false,
              successModalTitle: "Success",
              successModalBody: response.data.body.msg,
            });
            this.fetchData(this.state);
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: "Failure",
              dangerModalBody: response.data.body.msg,
            });
          }
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: "Bad request",
          });
        }
        // console.log(response)
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

  assignCoupon = (event, val, name) => {
    event.preventDefault();
    // console.log(val)
    this.setState({
      addModalCoupon: false,
      editModalCoupon: false,
      previewModalCoupon: false,
      userAssignModal: true,
      editData: {
        val: val,
        name: name,
      },
      info: true,
      infoModalTitle: "Assign coupon named " + name,
    });
  };

  deleteCoupon = (event, val) => {
    // event.preventDefault()
    // console.log(val)
    const html = (
      <Col>
        <div className="delete_alert_text">Do you want to delete!</div>
        <Row>
          <div className="col-sm-6 text-center text-white">
            <button
              className="btn btn-danger"
              onClick={(event) => this.deleteCouponIDConfirm(event, val)}
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
  editCoupon = (event, id) => {
    event.preventDefault();
    actionTypes
      .getCoupon(id)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === "200 OK") {
            if (response.data.body.length > 0) {
              this.setState({
                info: true,
                addModalCoupon: false,
                editModalCoupon: true,
                previewModalCoupon: false,
                userAssignModal: false,
                editData: response.data.body[0],
                infoModalTitle: "Coupon view of ID " + response.data.body[0].id,
              });
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: "Failure",
                dangerModalBody: "Coupon not exits",
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
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: "Bad request",
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

  previewCoupon = (event, id) => {
    event.preventDefault();
    actionTypes
      .getCoupon(id)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === "200 OK") {
            if (response.data.body.length > 0) {
              this.setState({
                info: true,
                addModalCoupon: false,
                editModalCoupon: false,
                previewModalCoupon: true,
                userAssignModal: true,
                editData: response.data.body[0],
                infoModalTitle: "Coupon view of ID " + response.data.body[0].id,
              });
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: "Failure",
                dangerModalBody: "Coupon not exits",
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
        } else {
          this.setState({
            danger: true,
            warning: false,
            dangerModalTitle: "Failure",
            dangerModalBody: "Bad request",
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

  handleSearchCoupon = (event) => {
    event.preventDefault();
    this.fetchData(this.state);
  };

  inputChangeHandler = (event, controlName) => {
    event.preventDefault();
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    if (controlName === "criteria") {
      if (event.target.value === "name") {
        this.setState({
          controls: updatedControls,
          nameActive: true,
          validTillActive: false,
          statusActive: false,
        });
      } else if (event.target.value === "status") {
        this.setState({
          controls: updatedControls,
          nameActive: false,
          validTillActive: false,
          statusActive: true,
        });
      } else {
        this.setState({
          controls: updatedControls,
          nameActive: false,
          validTillActive: true,
          statusActive: false,
        });
      }
    } else {
      this.setState({
        controls: updatedControls,
      });
    }
    //console.log(updatedControls)
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
    const getAction = (id, name) => {
      //console.log(id)
      return (
        <span>
          <Button
            key={id + "1"}
            className="btn btn-info btn-sm margin-right10"
            onClick={(event) => this.previewCoupon(event, id)}
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
            onClick={(event) => this.editCoupon(event, id)}
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
            className="btn btn-danger btn-sm margin-right10"
            onClick={(event) => this.deleteCoupon(event, id)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-trash"></i>
              </span>
              Delete
            </strong>
          </Button>
          <Button
            key={id + "4"}
            className="btn btn-success btn-sm"
            onClick={(event) => this.assignCoupon(event, id, name)}
          >
            <strong>
              <span className="margin-right10">
                <i className="fa fa-trash"></i>
              </span>
              Assign
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
              <Button color="primary" onClick={this.openAddCoupon}>
                <b>Add</b>
              </Button>
            </div>
            <div className="text-right add_btn">
              <Button color="primary" onClick={this.openExcelUploadWindow}>
                <b>Assign promo by excel upload</b>
              </Button>
            </div>
            <Card>
              <CardHeader className="text-center">
                <h5>Coupon list</h5>
              </CardHeader>
              <CardBody>
                <div>
                  <FormGroup row className="my-0">
                    <Col xs="5">
                      <FormGroup>
                        <Row>
                          <Col className={"text-right"} xs={"4"}>
                            <Label htmlFor="criteria">Criteria</Label>
                          </Col>
                          <Col xs={"8"}>
                            <Input
                              type="select"
                              id="criteria"
                              onChange={(event) =>
                                this.inputChangeHandler(event, "criteria")
                              }
                            >
                              <option key={"123"} value="">
                                Select Criteria
                              </option>
                              <option key={"name"} value="name">
                                Name
                              </option>
                              <option key={"valid_till"} value="valid_till">
                                Valid Till
                              </option>
                              <option key={"status"} value="status">
                                Status
                              </option>
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col xs="5">
                      <FormGroup>
                        <Row>
                          {this.state.statusActive ? (
                            <Fragment>
                              <Col className={"text-right"} xs={"4"}>
                                <Label htmlFor="value">Status</Label>
                              </Col>
                              <Col xs={"8"}>
                                <Input
                                  type="select"
                                  id="value"
                                  onChange={(event) =>
                                    this.inputChangeHandler(event, "value")
                                  }
                                >
                                  <option key={"1"} value="">
                                    Select Status
                                  </option>
                                  <option key={"ACTIVE"} value="ACTIVE">
                                    Active
                                  </option>
                                  <option key={"EXPIRED"} value="EXPIRED">
                                    Expired
                                  </option>
                                </Input>
                              </Col>
                            </Fragment>
                          ) : (
                            ""
                          )}

                          {this.state.nameActive ? (
                            <Fragment>
                              <Col className={"text-right"} xs={"4"}>
                                <Label htmlFor="value">Name</Label>
                              </Col>
                              <Col xs={"8"}>
                                <Input
                                  type="text"
                                  id="value"
                                  onChange={(event) =>
                                    this.inputChangeHandler(event, "value")
                                  }
                                >
                                  {/* <option key={'1'} value="">Select Name</option>
                                <option key={'ACTIVE'} value="ACTIVE">Active</option>
                                <option key={'EXPIRED'} value="EXPIRED">Expired</option> */}
                                </Input>
                              </Col>
                            </Fragment>
                          ) : (
                            ""
                          )}
                          {this.state.validTillActive ? (
                            <Fragment>
                              <Col className={"text-right"} xs={"4"}>
                                <Label htmlFor="value">Valid Till</Label>
                              </Col>
                              <Col xs={"8"}>
                                <Input
                                  type="date"
                                  id="value"
                                  placeholder="Enter valid till"
                                  onChange={(event) =>
                                    this.inputChangeHandler(event, "value")
                                  }
                                />
                              </Col>
                            </Fragment>
                          ) : (
                            ""
                          )}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col xs={"2"}>
                      <div className="text-center">
                        <Button
                          onClick={this.handleSearchCoupon}
                          color="primary"
                        >
                          Search
                        </Button>
                      </div>
                    </Col>
                  </FormGroup>
                </div>
                <br />
                <ReactTable
                  columns={[
                    {
                      Header: "Action",
                      accessor: "id",
                      width: 350,
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      Cell: (cellInfo) =>
                        getAction(cellInfo.row.id, cellInfo.row.name),
                    },
                    {
                      Header: "Name",
                      accessor: "name",
                      width: getColumnWidth(data, "name", "Name"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                    },
                    {
                      Header: "Code",
                      accessor: "code",
                      width: getColumnWidth(data, "code", "Code"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                    },
                    {
                      Header: "Discount",
                      accessor: "discount",
                      width: getColumnWidth(data, "discount", "Discount"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                    },
                    {
                      Header: "Valid Till",
                      accessor: "valid_till",
                      width: getColumnWidth(data, "valid_till", "Valid Till"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      Cell: (cellInfo) =>
                        new Date(cellInfo.row.valid_till).toLocaleDateString(),
                    },
                    {
                      Header: "Status",
                      accessor: "status",
                      width: getColumnWidth(data, "status", "Status"),
                      headerClassName: "text-left table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                    },
                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData} // Request new data when things change
                  minRows={0}
                  filterable={false}
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
                  {this.state.openExcelUploadWindow ? (
                    <UploadWindow
                      onUploadCouponToUser={this.handleopenExcelUploadWindow}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.addModalCoupon ? (
                    <AddCoupon
                      onAddCouponResponse={this.handleAddCouponResponse}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.editModalCoupon ? (
                    <EditCoupon
                      modal_data={this.state.editData}
                      onEditCouponResponse={this.handleEditCouponResponse}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalCoupon ? (
                    <PreviewCoupon modal_data={this.state.editData} />
                  ) : (
                    ""
                  )}

                  {this.state.userAssignModal ? (
                    <StatusCoupon
                      modal_data={this.state.editData}
                      onStatusCouponResponse={this.handleStatusCouponResponse}
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

export default Coupon;
