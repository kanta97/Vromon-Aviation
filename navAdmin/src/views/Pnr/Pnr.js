import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import * as dataTable from "./../../Components/UI/Datatable";
import * as actionTypes from "../../API";
import axios from "axios";
import "./Pnr.css";
import moment from "moment";
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

const AddHotel = Loadable({
  loader: () => import("../../Components/UI/Independent/Hotel/Add/addHotel"),
  loading,
});

const EditHotel = Loadable({
  loader: () => import("../../Components/UI/Independent/Hotel/Edit/editHotel"),
  loading,
});

const PreviewHotel = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Pnr/Preview/PnrPreview"),
  loading,
});

const CustomerPreview = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Pnr/Preview/CustomerPreview"),
  loading,
});

const FlightsPreview = Loadable({
  loader: () =>
    import("../../Components/UI/Independent/Pnr/Preview/FlightsPreview"),
  loading,
});

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalHotel: false,
      editModalHotel: false,
      previewModalHotel: false,
      previewModalCustomer: false,
      previewModalFlight: false,
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
      selectedRequest: {},
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
      airlineMap: {},
      airportMap: {},
      flightDetail: {},
      selectedId: "",
    };
    this.fileInputRef = React.createRef();
    this.toggleInfo = this.toggleInfo.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }
  handleButtonClick = (event, id) => {
    console.log("Button clicked, ID passed:", id);

    if (!this.fileInputRef.current) {
      console.error("File input ref is not defined.");
      return;
    }

    this.setState({ selectedId: id }, () => {
      console.log("Updated selectedId:", this.state.selectedId);
      this.fileInputRef.current.onchange = (event) =>
        this.handleFileChange(event, id);
      this.fileInputRef.current.click();
    });
  };

  handleFileChange = async (event, id) => {
    const file = event.target.files[0];
    console.log("Selected file:", file, "ID passed to handleFileChange:", id);

    if (!id) {
      console.error("ID is not available in handleFileChange.");
      return;
    }

    const validFileTypes = ["application/pdf", "application/zip", "application/x-zip-compressed"];
    if (file && validFileTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
           //for local
          // `http://localhost:3005/upload?id=${id}`,
          //for live
          `https://navigatortourism.com:3005/upload?id=${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("File uploaded successfully:", response.data);
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to upload the file. Please try again.");
      }
    } else {
      alert("Please upload a valid PDF or ZIP file.");
    }
  };

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
  totalPrice(data) {
    try {
      let item = JSON.parse(data.pnr_response);
      if (item.CreatePassengerNameRecordRS) {
       // console.log("pnr item", item);
        if (item.CreatePassengerNameRecordRS.AirPrice)
          return new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "BDT",
          }).format(
            item.CreatePassengerNameRecordRS.AirPrice[0].PriceQuote
              .PricedItinerary.TotalAmount
          );
      }
    } catch (e) {
      console.log("pnr item error ", e);
    }
    return data.price;
  }
  fetchData(state, instance) {
    let filter = "";
    this.setState({ loading: true });
    dataTable
      .requestPnrData(
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
  openAddHotel = (event) => {
    event.preventDefault();
    this.setState({
      info: true,
      infoModalTitle: "Add Hotel",
      addModalHotel: true,
      editModalHotel: false,
      previewModalHotel: false,
      previewModalCustomer: false,
      previewModalFlight: false,
    });
  };
  handleEditHotelResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        editModalHotel: false,
        addModalHotel: false,
        previewModalHotel: false,
        previewModalCustomer: false,
        previewModalFlight: false,
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
        editModalHotel: false,
        addModalHotel: false,
        previewModalHotel: false,
        previewModalFlight: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };
  handleAddHotelResponse = (status, message) => {
    if (status) {
      this.setState({
        modal: true,
        addModalHotel: false,
        editModalHotel: false,
        previewModalHotel: false,
        previewModalFlight: false,
        previewModalCustomer: false,
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
        addModalHotel: false,
        editModalHotel: false,
        previewModalHotel: false,
        previewModalFlight: false,
        info: false,
        infoModalTitle: "",
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: message,
      });
    }
  };
  deleteHotelIDConfirm = (event, val) => {
    event.preventDefault();
    actionTypes
      .deleteHotel(val)
      .then((response) => {
        if (response.status) {
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
  deleteHotel = (event, val) => {
    // event.preventDefault()
    // console.log(val)
    const html = (
      <Col>
        <div className="delete_alert_text">Do you want to delete!</div>
        <Row>
          <div className="col-sm-6 text-center text-white">
            <button
              className="btn btn-danger"
              onClick={(event) => this.deleteHotelIDConfirm(event, val)}
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
  editHotel = (event, id) => {
    event.preventDefault();
    actionTypes
      .getHotel(id)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === "200 OK") {
            if (response.data.body.length > 0) {
              this.setState({
                info: true,
                addModalHotel: false,
                editModalHotel: true,
                previewModalHotel: false,
                editData: response.data.body[0],
                infoModalTitle: "Hotel view of ID " + response.data.body[0].id,
              });
            } else {
              this.setState({
                danger: true,
                warning: false,
                dangerModalTitle: "Failure",
                dangerModalBody: "Hotel not exits",
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
  previewHotel = (event, id) => {
    event.preventDefault();

    let found = this.state.data.find((item) => item.id == id);

    if (found) {
      this.setState({
        info: true,
        addModalHotel: false,
        editModalHotel: false,
        previewModalHotel: true,
        editData: JSON.parse(found.pnr_response),
        infoModalTitle:
          "Full response from PNR " +
          JSON.parse(found.pnr_response).CreatePassengerNameRecordRS
            .ItineraryRef.ID,
      });
    } else {
      this.setState({
        danger: true,
        warning: false,
        dangerModalTitle: "Failure",
        dangerModalBody: "Not found",
      });
    }
  };
  previewCustomer = (event, id) => {
    event.preventDefault();
    let found = this.state.data.find((item) => item.id == id);

    if (found) {
      this.setState({
        info: true,
        addModalHotel: false,
        editModalHotel: false,
        previewModalCustomer: true,
        previewModalFlight: false,
        editData: JSON.parse(found.customer),
        selectedRequest: JSON.parse(found.requested),
        infoModalTitle: "Customer info",
      });
    } else {
      this.setState({
        danger: true,
        warning: false,
        dangerModalTitle: "Failure",
        dangerModalBody: "Not found",
      });
    }
  };
  cancelPnr = (event, id) => {
    event.preventDefault();

    let found = {},
      index = -1;

    this.state.data.forEach((item, i) => {
      if (item.id == id) {
        found = item;
        index = i;
      }
    });

    if (
      window.confirm(
        "Are you sure you want to cancel this pnr? This action is irreversible"
      )
    ) {
      axios
        .get(`${actionTypes.CANCEL_PNR}?pnrRef=${found.pnr_id}`)
        .then((response) => {
          console.log(response.data);

          if (response.data.applicationResults.status == "COMPLETE") {
            let newData = [...this.state.data];
            newData[index].pnr_status = "CANCELLED";

            this.setState({
              data: newData,
            });
          }
        });
    }
  };
  previewFlight = (event, id) => {
    event.preventDefault();
    let found = this.state.data.find((item) => item.id == id);

    if (found) {
      const flightDetail = JSON.parse(found.requested);

      // Format the arrival date to 'hh:mm A'
      flightDetail.legs = flightDetail.legs.map((leg) => ({
        ...leg,
        ArrivalDateTime: moment(leg.ArrivalDateTime).format(
          "YYYY-MM-DD hh:mm A"
        ), // Example: 2024-12-18 05:30 AM
        DepartureDateTime: moment(leg.DepartureDateTime).format(
          "YYYY-MM-DD hh:mm A"
        ), // Example: 2024-12-18 02:00 AM
      }));
      console.log("Flight Details:", flightDetail);
      this.setState({
        info: true,
        addModalHotel: false,
        editModalHotel: false,
        previewModalFlight: true,
        previewModalCustomer: false,
        flightDetail: flightDetail,
        infoModalTitle: "Flights info",
      });
    } else {
      this.setState({
        danger: true,
        warning: false,
        dangerModalTitle: "Failure",
        dangerModalBody: "Not found",
      });
    }
  };
  componentDidMount() {
    axios.get(actionTypes.AIRPORTS).then((response) => {
      // console.log(response.data)
      let my_map = {};
      response.data.body.forEach((item) => {
        if (item.iata_code !== "") my_map[item.iata] = item.name;
      });

      this.setState({
        airportMap: my_map,
      });
    });
    axios.get(actionTypes.AIRLINES).then((response) => {
      console.log(response.data);
      let my_map = {};
      response.data.body.forEach((item) => {
        if (item.iata_code !== "") my_map[item.iata_code] = item.name;
      });

      this.setState({
        airlineMap: my_map,
      });
    });
    // console.log('airports')
  }
  render() {
    const { data, pages, loading, header } = this.state;
    console.log("data found",data)
    const getColumnWidth = (rows, accessor, headerText) => {
      const maxWidth = 150;
      const magicSpacing = 20;
      const cellLength = Math.max(
        ...rows.map((row) => (`${row[accessor]}` || "").length),
        headerText.length
      );
      return Math.min(maxWidth, cellLength * magicSpacing);
    };
    const getAction = (id, pnr_status, pnr_id) => {
      return (
        <span className="d-flex align-items-center">
          <Button
            key={id + "2"}
            className="btn btn-info btn-sm margin-right10"
            onClick={(event) => this.previewCustomer(event, id)}
          >
            <strong>
              <span className="me-2">
                <i className="fa fa-eye mr-1"></i>
              </span>
              Customer info
            </strong>
          </Button>
          <Button
            key={id + "5"}
            className="btn btn-info btn-sm margin-right10"
            onClick={(event) => this.previewFlight(event, id)}
          >
            <strong>
              <span className="me-2">
                <i className="fa fa-plane mr-1"></i>
              </span>
              Flight's info
            </strong>
          </Button>
          {(pnr_status === "PENDING" || pnr_status === "BOOKED") && !pnr_id.startsWith("Temp")  ? (
            <>
              <Button
                key={id + "8"}
                className="btn btn-danger btn-sm margin-right10"
                onClick={(event) => this.cancelPnr(event, id)}
              >
                <strong>
                  <span className="me-2">
                    <i className="fa fa-trash mr-1"></i>
                  </span>
                  Cancel Pnr
                </strong>
              </Button>
              <div>
              <Button
                key={id}
                className="btn btn-success btn-sm margin-right10"
                onClick={(event) => this.handleButtonClick(event, id)}
              >
                <strong>
                  <span>
                    <i className="fa fa-upload mr-1"></i>
                  </span>
                  Upload Ticket
                </strong>
              </Button>
              <input
                type="file"
                ref={this.fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.zip"  // Allow both PDF and ZIP files
                onChange={(event) => this.handleFileChange(event, id)}
              />
            </div>
            </>
          ) : null}
        </span>
      );
    };

    return (
      <Fragment>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <Layout>
            <h4 className="m-3">Pnr list</h4>
            <Card className="m-3 border-0">
              <CardBody className="pnr_table">
                <ReactTable
                  columns={[
                    {
                      Header: "ID",
                      width: 60,
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => <span>{row.original.id}</span>,
                      style: {},
                    },
                    {
                      Header: "Customer Name",
                      accessor: "display_name",
                      width: 220,
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,

                      style: {},
                    },
                    // {
                    //   Header: "Checkout name",
                    //   width: getColumnWidth(data, "name", "Name"),
                    //   headerClassName: "text-center table-header-css",
                    //   headerStyle: {},
                    //   className: "table-body-css",
                    //   // filterable: true,

                    //   Cell: (row) => {
                    //     console.log("Row Data:", row);
                    //     try {
                    //       const customer = JSON.parse(row.original.customer);
                    //       return <span>{customer.name}</span>;
                    //     } catch (error) {
                    //       console.error("Error parsing customer JSON:", error);
                    //       return <span>Error</span>;
                    //     }
                    //   },

                    //   style: {},
                    // },

                    {
                      Header: "Total Price",
                      width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => (
                        <span>{this.totalPrice(row.original)}</span>
                      ),
                      style: {},
                    },
                    {
                      Header: "Sale Price",
                      width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      Cell: (row) => {
                        const bankTransId = row.original.bank_trans_id;
                        let salePrice = "N/A";

                        if (bankTransId) {
                          // Split the bank_trans_id by '-' and extract the second part
                          const parts = bankTransId.split("-");
                          if (parts.length > 1) {
                            const rawValue = parts[1].trim(); // Get the middle value and trim spaces
                            const numericValue = parseFloat(rawValue); // Convert to a number

                            if (!isNaN(numericValue)) {
                              salePrice = `BDT ${new Intl.NumberFormat(
                                "en-US",
                                { minimumFractionDigits: 2 }
                              ).format(numericValue)}`;
                            }
                          }
                        }

                        return <span>{salePrice}</span>;
                      },
                      style: {},
                    },
                    {
                      Header: "payment method",
                      width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => (
                        row.original.payment_mode && row.original.payment_mode.toLowerCase().includes('bbl')
                          ? 'Brac Bank'
                          : <span>{row.original.payment_mode || "N/A"}</span>
                      ),

                      style: {},
                    },

                    {
                      Header: "Journey type",
                      width: 110,
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => <span>{row.original.journey_type}</span>,
                      style: {},
                    },
                    {
                      Header: "PNR",
                      width: 180,
                      headerClassName: "text-center table-header-css pnr_td",
                      headerStyle: {},
                      className: "table-body-css pnr_td",
                      // filterable: true,
                      Cell: (row) => (
                        <span className="pnr_td">{row.original.pnr_id}</span>
                      ),
                      // (
                      //   <span>
                      //     {/* {
                      //       JSON.parse(row.original.pnr_response)
                      //         .CreatePassengerNameRecordRS.itineraryRef.ID
                      //     } */}
                      //   </span>
                      // ),
                      style: {},
                    },

                    {
                      Header: "PAYMENT STATUS",
                      width: 130,
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => {
                        const status = row.original.payment_status;
                        const pillClass =
                          status === "PAID" ? "badge-success" : "badge-danger"; // Success or danger based on status

                        return (
                          <span
                            className={`badge ${pillClass}`}
                            style={{
                              borderRadius: "50px",
                              padding: "5px 15px",
                            }}
                          >
                            {status === "NOT_PAID" ? "NOT PAID" : status}
                          </span>
                        );
                      },
                      style: {},
                    },
                    {
                      Header: "PNR STATUS",
                      width: 100,
                      // width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => {
                        // Determine the PNR status based on the pnr_id
                        const status = row.original.pnr_id.startsWith("TempPNR")
                          ? row.original.pnr_status
                          : "BOOKED";

                        // Assign classes based on the status value
                        const pillClass =
                          status === "BOOKED"
                            ? "badge-success"
                            : status === "PENDING"
                            ? "badge-warning"
                            : "badge-secondary"; // Success, warning, or default for other statuses

                        return (
                          <span
                            className={`badge ${pillClass}`}
                            style={{
                              borderRadius: "50px",
                              padding: "5px 15px",
                            }}
                          >
                            {status === "BOOKED"
                              ? "BOOKED"
                              : status === "PENDING"
                              ? "PENDING"
                              : row.original.pnr_status}
                          </span>
                        );
                      },
                      style: {},
                    },
                    {
                      Header: "Ticket Status",
                      width: 120,
                      // width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => (
                        <span>
                          {row.original.ticket_status &&
                          row.original.ticket_status.trim()
                            ? row.original.ticket_status
                            : "NOT TICKETED"}
                        </span>
                      ),
                      style: {},
                    },
                    {
                      Header: "FLIGHT STATUS",
                      width: getColumnWidth(data, "location", "Location"),
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      // filterable: true,
                      Cell: (row) => {
                        const paymentStatus = row.original.payment_status;
                        const flightStatus =
                          paymentStatus === "NOT_PAID"
                            ? "N/A"
                            : row.original.flight_status || "PENDING";
                    
                        return <span>{flightStatus}</span>;
                      },
                      style: {},
                    },
                    {
                      width: 140,
                      Header: "Booking Date",
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      style: {},
                      Cell: (row) => (
                        <span>
                          {moment(row.original.created_at).format(
                            "DD-MM-YY, hh:mm A"
                          )}
                        </span>
                      ),
                    },
                    {
                      Header: "Action",

                      width: 465,
                      headerClassName: "text-center table-header-css",
                      headerStyle: {},
                      className: "table-body-css",
                      filterable: false,
                      style: {},
                      Cell: (cellInfo) =>
                        getAction(
                          cellInfo.original.id,
                          cellInfo.original.pnr_status,
                          cellInfo.original.pnr_id
                        ),
                    },
                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData} // Request new data when things change
                  minRows={0}
                  /*filterable = {true}
                  caseInsensitiveFiltering={true}
                  subStringFiltering ={true}*/
                  resizable={this.state.resizable}
                  filtered={this.state.filtered}
                  onFilteredChange={(filtered) => {
                    // console.log(filtered)
                    this.setState({ filtered });
                  }}
                  defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id;
                    return row[id] !== undefined
                      ? String(row[id])
                          .toLowerCase()
                          .indexOf(filter.value.toLowerCase()) !== -1
                      : true;
                  }}
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
                size="xl"
                isOpen={this.state.info}
                toggle={this.toggleInfo}
                className={"modal-info " + this.props.className}
              >
                <ModalHeader
                  style={{
                    backgroundColor: "#ddd",
                    border: "unset",
                    color: "#333",
                  }}
                  className="text-center"
                  toggle={this.toggleInfo}
                >
                  {this.state.infoModalTitle}
                </ModalHeader>
                <ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
                  {this.state.addModalHotel ? (
                    <AddHotel
                      onAddHotelResponse={this.handleAddHotelResponse}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.editModalHotel ? (
                    <EditHotel
                      modal_data={this.state.editData}
                      onEditHotelResponse={this.handleEditHotelResponse}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalHotel ? (
                    <PreviewHotel modal_data={this.state.editData} />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalCustomer ? (
                    <CustomerPreview
                      modal_data={this.state.editData}
                      more={this.state.selectedRequest}
                    />
                  ) : (
                    ""
                  )}

                  {this.state.previewModalFlight ? (
                    <FlightsPreview
                      modal_data={this.state.flightDetail}
                      airportMap={this.state.airportMap}
                      airlineMap={this.state.airlineMap}
                    />
                  ) : (
                    ""
                  )}
                </ModalBody>
                <ModalFooter style={{ borderTop: "unset" }}>
                  <Button
                    color="primary"
                    style={{
                      backgroundColor: "#ddd",
                      border: "unset",
                      color: "#333",
                    }}
                    onClick={this.toggleInfo}
                  >
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
                <ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
                  {this.state.successModalBody}
                </ModalBody>
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

export default Hotel;
