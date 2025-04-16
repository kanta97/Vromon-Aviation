import React, { Component } from "react";
import Loadable from "react-loadable";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as API from "../../../../../API";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
  Row,
} from "reactstrap";

import { toastr } from "react-redux-toastr";
let toastrOptions = {
  timeOut: 1000,
  closeOnToastrClick: true,
};

class changeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db_id: this.props.modal_data.id,
      controls: {
        BOOKINGREF: {
          value: this.props.modal_data.booking_ref,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        BOOKING_STATUS: {
          value: this.props.modal_data.booking_status,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
      },
      formIsValid: false,
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
    };
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
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

  async componentDidMount() {
    console.log(this.props.modal_data);
  }

  changeStatusHandle = (event) => {
    event.preventDefault();
    //console.log(this.state)
    let BOOKINGREF =
      this.state.controls["BOOKINGREF"].value !== "" &&
      this.state.controls["BOOKINGREF"].value !== null &&
      this.state.controls["BOOKINGREF"].value !== undefined
        ? this.state.controls["BOOKINGREF"].value
        : "";
    let BOOKING_STATUS =
      this.state.controls["BOOKING_STATUS"].value !== "" &&
      this.state.controls["BOOKING_STATUS"].value !== null &&
      this.state.controls["BOOKING_STATUS"].value !== undefined
        ? this.state.controls["BOOKING_STATUS"].value
        : "";
    /*
       let EMAIL = (this.state.controls['EMAIL'].value !== '' && this.state.controls['EMAIL'].value !== null && this.state.controls['EMAIL'].value !== undefined) ? this.state.controls['EMAIL'].value : ''
       */
    /*let ROLE = (this.state.controls['ROLE'].value !== '' && this.state.controls['ROLE'].value !== null && this.state.controls['ROLE'].value !== undefined) ? this.state.controls['ROLE'].value : ''
       let USERTYPE = (this.state.controls['USERTYPE'].value !== '' && this.state.controls['USERTYPE'].value !== null && this.state.controls['USERTYPE'].value !== undefined) ? this.state.controls['USERTYPE'].value : ''
       let SERVICEID = (this.state.controls['SERVICEID'].value !== '' && this.state.controls['SERVICEID'].value !== null && this.state.controls['SERVICEID'].value !== undefined) ? this.state.controls['SERVICEID'].value : ''
       let ACTIVE = (this.state.controls['ACTIVE'].value !== '' && this.state.controls['ACTIVE'].value !== null && this.state.controls['ACTIVE'].value !== undefined) ? this.state.controls['ACTIVE'].value : ''
       */

    let data = {
      booking_ref: BOOKINGREF,
      booking_status: BOOKING_STATUS,
    };
    // console.log(data);
    if (BOOKINGREF === "") {
      alert("booking ref not available");
      return;
    }
    API.changeStatus(data).then((response) => {
      //  console.log(response);

      if (response.data.status == "200 Ok") {
        toastr.success("Booking Status Successfully Updated", toastrOptions);

        /*
                                this.props.onStatusChangeResponse(true, "Booking Status Successfully Updated");
                */

        /*
                this.props.handleStatusChangeResponse(true, response.data.message)
*/
      } else {
        toastr.error(
          "Booking Status Has Not Been Updated right now",
          toastrOptions
        );

        /* this.props.onStatusChangeResponse(false, "Booking Status Has Not Been Updated");
         */
      }
    });
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

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  render() {
    return (
      <div>
        <Col xs="12">
          <form>
            <FormGroup>
              <Label htmlFor="displayrolename">Booking Reference</Label>
              <Input
                className="input_resize"
                col={4}
                value={this.state.controls.BOOKINGREF.value}
                onChange={(event) =>
                  this.inputChangeHandler(event, "BOOKINGREF")
                }
                type="text"
                disabled
                id="displayrolename"
                placeholder="Enter display rolename"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="booking_status">Booking Status</Label>

              {/* //<Input type="text" value={this.state.controls.BOOKING_STATUS.value} id="active" onChange={event => this.inputChangeHandler(event,'BOOKING_STATUS')} placeholder="Select Status " />*/}

              <Input
                id="booking_status"
                type="select"
                onChange={(event) =>
                  this.inputChangeHandler(event, "BOOKING_STATUS")
                }
              >
                <option value="BOOKED_WITHOUT_PAYMENT">
                  BOOKED_WITHOUT_PAYMENT
                </option>
                <option value="BOOKED_CASH_PAID">BOOKED_CASH_PAID</option>
                <option value="BOOKED_CARD_PAID">BOOKED_CARD_PAID</option>
                <option value="BOOKING_IN_PROGRESS">BOOKING_IN_PROGRESS</option>
                <option value="INVALID_INFORMATION">INVALID_INFORMATION</option>
                <option value="BOOKED_CARD_PAID">BOOKED_CARD_PAID</option>
                <option value="BOOKING_IN_PROGRESS">BOOKING_IN_PROGRESS</option>
                <option value="BOOKING_CANCEL_REQUESTED">
                  BOOKING_CANCEL_REQUESTED
                </option>
                <option value="BOOKING_CANCELLED">BOOKING_CANCELLED</option>
                <option value="BOOKING_UPDATE_REQUESTED">
                  BOOKING_UPDATE_REQUESTED
                </option>
              </Input>
            </FormGroup>

            <div>
              <div className="text-center">
                <Button onClick={this.changeStatusHandle} color="primary">
                  <span className="margin-right10">
                    {" "}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  <b>Change Status</b>
                </Button>
              </div>
            </div>
          </form>
        </Col>
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
    );
  }
}

export default changeStatus;
