import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
import "./FixedPackage.css";
import { toastr } from "react-redux-toastr";

// import AddFixedPackage from "../../Components/UI/Independent/FixedPackage/Add/addFixedPackage";

// import EditFixedPackage from "../../Components/UI/Independent/FixedPackage/Edit/editFixedPackage";

// import PreviewFixedPackage from "../../Components/UI/Independent/FixedPackage/Preview/FixedPackagePreview";

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

const AddFixedPackage = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/FixedPackage/Add/addFixedPackage"),
  loading,
});

const EditFixedPackage = Loadable({
  //loader: () => import("./Sazzad"),
  loader: () =>
    import(
      "../../Components/UI/Independent/FixedPackage/Edit/editFixedPackage"
    ),
  loading,
});

const PreviewFixedPackage = Loadable({
  loader: () =>
    import(
      "../../Components/UI/Independent/FixedPackage/Preview/FixedPackagePreview"
    ),
  loading,
});
let toastrOptions = {
  timeOut: 2000,
  closeOnToastrClick: true,
};

class FixedPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalFixedPackage: false,
      editModalFixedPackage: false,
      previewModalFixedPackage: false,
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
      .requestFixedPackageData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered,
        filter
      )
      .then((res) => {
        // console.log(res)
        this.setState({
          data: res.rows,
          pages: res.pages,
          loader: false,
          loading: false,
        });
      });
  }

  openAddFixedPackage = (event) => {
    event.preventDefault();
    this.setState({
      info: true,
      infoModalTitle: "Add FixedPackage",
      addModalFixedPackage: true,
      editModalFixedPackage: false,
      previewModalFixedPackage: false,
    });
  };
  handleEditFixedPackageResponse = (status, message) => {
    /*if(status){
      this.setState({
        modal: true,
        editModalFixedPackage: false,
        addModalFixedPackage: false,
        previewModalFixedPackage: false,
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
        editModalFixedPackage: false,
        addModalFixedPackage: false,
        previewModalFixedPackage: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })
    }*/
    if (status) {
      toastr.success("Package successfully updated", toastrOptions);

      this.setState({
        modal: false,
        addModalFixedPackage: false,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
        info: false,
        infoModalTitle: "",
        success: false,
      });
      this.fetchData(this.state);
    } else {
      toastr.error(message, toastrOptions);

      this.setState({
        modal: true,
        addModalFixedPackage: true,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
      });
    }
  };
  handleAddFixedPackageResponse = (status, message) => {
    /*    if(status){
      this.setState({
        modal: true,
        addModalFixedPackage: false,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
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
        addModalFixedPackage: true,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
        info: false,
        infoModalTitle: '',
        danger: true,
        dangerModalTitle: 'Failure',
        dangerModalBody: message,
      })

    }*/
    if (status) {
      toastr.success("Package Successfully added", toastrOptions);

      this.setState({
        modal: false,
        addModalFixedPackage: false,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
        info: false,
        infoModalTitle: "",
        success: false,
      });
      this.fetchData(this.state);
    } else {
      toastr.error(message, toastrOptions);

      this.setState({
        modal: true,
        addModalFixedPackage: true,
        editModalFixedPackage: false,
        previewModalFixedPackage: false,
      });
    }
  };

  deleteFixedPackageIDConfirm = (event, val) => {
    event.preventDefault();
    actionTypes
      .deleteFixedPackage(val)
      .then((response) => {
        if (response.data.status === "200 OK") {
          this.setState({
            success: true,
            warning: false,
            successModalTitle: "Success",
            successModalBody: response.data.body,
          });
          this.fetchData(this.state);
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

  deleteFixedPackage = (event, val) => {
    // event.preventDefault()
    // console.log(val)
    const html = (
      <Col>
        <div className="delete_alert_text">Do you want to delete!</div>
        <Row>
          <div className="col-sm-6 text-center text-white">
            <button
              className="btn btn-danger"
              onClick={(event) => this.deleteFixedPackageIDConfirm(event, val)}
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
  editFixedPackage = (event, id) => {
    event.preventDefault();
    actionTypes
      .getFixedPackage(id)
      .then((response) => {
        if (response.data.status === "200 OK") {
          if (response.data.body.length > 0) {
            this.setState({
              info: true,
              addModalFixedPackage: false,
              editModalFixedPackage: true,
              previewModalFixedPackage: false,
              editData: response.data.body[0],
              infoModalTitle:
                "FixedPackage view of ID " + response.data.body[0].id,
            });
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: "Failure",
              dangerModalBody: "FixedPackage not exits",
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

  previewFixedPackage = (event, id) => {
    event.preventDefault();
    actionTypes
      .getFixedPackage(id)
      .then((response) => {
        if (response.data.status === "200 OK") {
          if (response.data.body.length > 0) {
            this.setState({
              info: true,
              addModalFixedPackage: false,
              editModalFixedPackage: false,
              previewModalFixedPackage: true,
              editData: response.data.body[0],
              infoModalTitle:
                "FixedPackage view of ID " + response.data.body[0].id,
            });
          } else {
            this.setState({
              danger: true,
              warning: false,
              dangerModalTitle: "Failure",
              dangerModalBody: "FixedPackage not exits",
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
            onClick={(event) => this.previewFixedPackage(event, id)}
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
            onClick={(event) => this.editFixedPackage(event, id)}
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
            onClick={(event) => this.deleteFixedPackage(event, id)}
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
    const getStatus = (val) => {
      if (val === 0) {
        return "Active";
      } else if (val === 1) {
        return "Inactive";
      } else {
        return "Deleted";
      }
    };

    const getFeatured = (val) => {
      if (val === 1) {
        return "Featured";
      } else {
        return "Not featured";
      }
    };
    return (
      <Fragment>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <Layout>
            
            <Card>
              <CardHeader className="text-center d-flex justify-content-between">
                <h2>Fixed package list</h2>
                <div className="text-right add_btn">
              <Button color="primary" onClick={this.openAddFixedPackage}>
                <b>Add</b>
              </Button>
            </div>
              </CardHeader>
              <CardBody>
                <div className={"search-table-outter wrapper text-center pack_table"}>
                  <ReactTable
                 
                  getTheadThProps={() => ({
                    style: {
                        textAlign: 'center', 
                    }
                })}
                   getTdProps={() => ({
                    style: {
                        height: '50px', 
                        verticalAlign: 'middle',
                        lineHeight: '16px',
                        textAlign:"center",
                        maxWidth: '100px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', 
                   
                    }
                })}
                    columns={[
                      {
                        Header: "Action",
                        accessor: "id",
                        width: 300,
                        height:50,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css ",
                        //filterable: false,
                        style: {},
                        Cell: (cellInfo) => getAction(cellInfo.row.id),
                      },
                      {
                        Header: "Origin",
                        accessor: "origin",
                        // width: getColumnWidth(data, "origin", "Origin"),
                        width:90,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                      },
                      {
                        Header: "Name",
                        accessor: "name",
                        width: getColumnWidth(data, "name", "Name"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.name,
                            }}
                          />
                        ),
                      },
                      {
                        Header: "Duration day",
                        accessor: "duration_day",
                        // width: getColumnWidth(data, "duration", "Duration"),
                        width:100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                      },
                      {
                        Header: "Duration night",
                        accessor: "duration_night",
                        // width: getColumnWidth(data, "duration", "Duration"),
                        width:100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                      },
                      {
                        Header: "Summary",
                        accessor: "summary",
                        width: getColumnWidth(data, "summary", "Summary"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.summary,
                            }}
                          />
                        ),
                      },
                      {
                        Header: "Destination",
                        accessor: "destination",
                        width: getColumnWidth(
                          data,
                          "destination",
                          "Destination"
                        ),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                      },
                      {
                        Header: "Description",
                        accessor: "description",
                        width: getColumnWidth(
                          data,
                          "description",
                          "Description"
                        ),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.description,
                            }}
                          />
                        ),
                      },
                      {
                        Header: "Valid From",
                        accessor: "vaidFrom",
                        // width: getColumnWidth(data, "vaidFrom", "Valid From"),
                        width:100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                        Cell: (cellInfo) =>
                          new Date(cellInfo.row.vaidFrom).toLocaleDateString(),
                      },
                      {
                        Header: "Valid To",
                        accessor: "validTo",
                        // width: getColumnWidth(data, "validTo", "Valid To"),
                        width:100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                        Cell: (cellInfo) =>
                          new Date(cellInfo.row.validTo).toLocaleDateString(),
                      },
                      {
                        Header: "Status",
                        accessor: "status",
                        // width: getColumnWidth(data, "status", "Status"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        width:100,
                        className: "table-body-css",
                        style: {},
                        Cell: (cellInfo) => getStatus(cellInfo.row.status),
                      },
                      {
                        Header: "Itinerary",
                        accessor: "itinerary",
                        width: getColumnWidth(data, "itinerary", "Itinerary"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.itinerary,
                            }}
                          />
                        ),
                        //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                      },
                      {
                        Header: "Terms Conditions",
                        accessor: "terms_conditions",
                        width: getColumnWidth(
                          data,
                          "terms_conditions",
                          "Terms Conditions"
                        ),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.terms_conditions,
                            }}
                          />
                        ),
                        //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                      },
                      {
                        Header: "Inclusions",
                        accessor: "inclusions",
                        width: getColumnWidth(data, "inclusions", "Inclusions"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.inclusions,
                            }}
                          />
                        ),
                        //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                      },
                      {
                        Header: "Exclusions",
                        accessor: "exclusions",
                        width: getColumnWidth(data, "exclusions", "Exclusions"),
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css wordwrap",
                        style: {},
                        Cell: (cellInfo) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cellInfo.row.exclusions,
                            }}
                          />
                        ),
                        //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                      },
                      {
                        Header: "Min people",
                        accessor: "minimum_number_people",
                        width: 100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                        //Cell: cellInfo => (getDayHour(cellInfo.row.duration))
                      },
                      {
                        Header: "Featured",
                        accessor: "isFeatured",
                     //   width: getColumnWidth(data, "isFeatured", "Featured"),
                     width:100,
                        headerClassName: "text-center table-header-css",
                        headerStyle: {},
                        className: "table-body-css",
                        style: {},
                        Cell: (cellInfo) =>
                          getFeatured(cellInfo.row.isFeatured),
                      },
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    minRows={0}
                    filterable={false}
                    resizable={this.state.resizable} /*
                    filtered={this.state.filtered}*/
                    defaultPageSize={this.state.defaultPageSize}
                    showPageSizeOptions={this.state.showPageSizeOptions}
                    pageSizeOptions={this.state.pageSizeOptions}
                    className="-striped -highlight search-table inner"
                  />
                </div>
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
                <ModalBody className="modal-md">
                  {this.state.addModalFixedPackage ? (
                    <AddFixedPackage
                      onAddFixedPackageResponse={
                        this.handleAddFixedPackageResponse
                      }
                    />
                  ) : (
                    ""
                  )}

                  {this.state.editModalFixedPackage ? (
                    <EditFixedPackage
                      modal_data={this.state.editData}
                      onEditFixedPackageResponse={
                        this.handleEditFixedPackageResponse
                      }
                    />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalFixedPackage ? (
                    <PreviewFixedPackage modal_data={this.state.editData} />
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

export default FixedPackage;
