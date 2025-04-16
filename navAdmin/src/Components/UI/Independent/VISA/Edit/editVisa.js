import React, { Component } from "react";
import Loadable from "react-loadable";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as API from "../../../../../API";
import "./editVisa.css";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
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

class EditVisa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        COUNTRY: {
          value: this.props.modal_data.country_name,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
      modal: false,
      loader: false,
      tourTypeOption: [],
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
      document_path: null,
      flag_path: null,
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

  addVisaHandle = (event) => {
    event.preventDefault();
    //console.log(this.state)
    let COUNTRY =
      this.state.controls["COUNTRY"].value !== "" &&
      this.state.controls["COUNTRY"].value !== null &&
      this.state.controls["COUNTRY"].value !== undefined
        ? this.state.controls["COUNTRY"].value
        : "";

    let formData = new FormData();
    formData.append("country_name", COUNTRY);
    formData.append("status", 1);
    if (this.state.document_path && this.state.flag_path) {
      formData.append("files", this.state.document_path);
      formData.append("files", this.state.flag_path);
    }

    API.editVisa(this.props.modal_data.id, formData)
      .then((response) => {
        // this.setState({
        //   success: true,
        //   successModalTitle: "Edited Success",
        //   successModalBody: "Visa document has been edited successfully",
        // });
        console.log("data edited success", response);
      })
      .catch((err) => console.log("error posting visa", err));

    //  console.log(data)
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

  fileUploadHandler = (event, field) => {
    const file = event.target.files[0];
    const fileType = file.type.split("/")[0];
    console.log("the file type", fileType);
    if (field == "document_path") {
      if (file.type !== "application/pdf") {
        this.setState({
          danger: true,
          dangerModalTitle: "File Type Error",
          dangerModalBody: "Please upload pdf file",
        });
      } else {
        this.setState({
          document_path: file,
        });
      }
      console.log("modal details", this.state.danger);
    } else {
      if (fileType !== "image") {
        this.setState({
          danger: true,
          dangerModalTitle: "File Type Error",
          dangerModalBody: "Only image files are supported",
        });
      } else {
        this.setState({
          flag_path: file,
        });
      }
    }
    console.log("uploading file", event.target.files[0]);
  };

  render() {
    const { modal_data } = this.props;
    return (
      <div>
        <Col xs="12">
          <form>
            <FormGroup>
              <Label htmlFor="location">Country name</Label>
              <Input
                type="text"
                id="country_name"
                onChange={(event) => this.inputChangeHandler(event, "COUNTRY")}
                placeholder={modal_data.country_name}
              />
            </FormGroup>
            <Row>
              <Col xs="6">
                <h6>Current Document</h6>{" "}
                <a href={modal_data.document_path} download target="_blank">
                  <i class="fa fa-download" aria-hidden="true"></i>
                  Preview
                </a>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="description">Edit Document</Label>
                  <Input
                    onChange={(event) =>
                      this.fileUploadHandler(event, "document_path")
                    }
                    type="file"
                    id="document_path"
                    placeholder="Upload pdf"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <h5>Current Flag</h5>
                <img src={modal_data.flag_path} height="20px" width="40px" />
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="location">Upload Flag</Label>
                  <Input
                    type="file"
                    id="flag_path"
                    onChange={(event) =>
                      this.fileUploadHandler(event, "flag_path")
                    }
                    placeholder="upload file"
                  />
                </FormGroup>
              </Col>
            </Row>
            <div>
              <div className="text-center">
                <Button onClick={this.addVisaHandle} color="primary">
                  <span className="margin-right10">
                    {" "}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  <b>SUBMIT</b>
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

export default EditVisa;
