import React, { Component } from "react";
import Loadable from "react-loadable";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as API from "../../../../../API";

import {
  Badge,
  Button,
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

class FixedPackagePreview extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props.modal_data)
    this.state = {
      isImage: false,
      isVideo: false,
      isTour: false,
      imageFile: [],
      videoFile: [],
      image_base_path: API.image_base_path,
    };
  }
  async componentDidMount() {
    await this.checkIsMedia(this.props.modal_data);
    await this.checkIsTour(this.props.modal_data);
  }
  async checkIsMedia(val) {
    if (val.media !== undefined) {
      if (val.media.length > 0) {
        let video = [];
        let image = [];
        let v = false;
        let i = false;
        val.media.map((item) => {
          if (item.type === "IMAGE") {
            i = true;
            image.push(item);
          } else {
            v = true;
            video.push(item);
          }
        });

        this.setState({
          isImage: i,
          isVideo: v,
          imageFile: image,
          videoFile: video,
        });
      } else {
        this.setState({
          isImage: false,
        });
      }
    }
  }

  async checkIsTour(val) {
    if (val.tourTypeDetails) {
      if (val.tourTypeDetails.length > 0) {
        this.setState({
          isTour: true,
        });
      } else {
        this.setState({
          isTour: false,
        });
      }
    }
  }

  render() {
    //console.log(this.state)
    return (
      <div>
        <Col xs="12 row">
          <h2 className={"text-center"}>Basic Info</h2>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{this.props.modal_data.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.name,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>

                {/*
                <td>{this.props.modal_data.name}</td>
*/}
              </tr>
              <tr>
                <th>Origin</th>
                <td>{this.props.modal_data.origin}</td>
              </tr>
              <tr>
                <th>Destination</th>
                <td>{this.props.modal_data.destination}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{this.props.modal_data.country}</td>
              </tr>
              <tr>
                <th>Summary</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.summary,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>

                {/*
                <td>{this.props.modal_data.summary}</td>
*/}
              </tr>
              <tr>
                <th>Description</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.description,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>
              </tr>
              <tr>
                <th>Itinerary</th>
                {/*                   <td sty{{ le=whiteSpace : 'pre }}'}}>{this.props.modal_data.itinerary}</td> */}
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.itinerary,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>
              </tr>
              <tr>
                <th>Inclusions</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.inclusions,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>
              </tr>
              <tr>
                <th>Exclusions</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.exclusions,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>
              </tr>
              <tr>
                <th>Terms & conditions</th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: this.props.modal_data.terms_conditions,
                  }}
                  style={{ whiteSpace: "pre-line" }}
                ></td>
              </tr>
              <tr>
                <th>Duration Day</th>
                <td>{this.props.modal_data.duration_day}</td>
              </tr>
              <tr>
                <th>Duration Night</th>
                <td>{this.props.modal_data.duration_night}</td>
              </tr>

              <tr>
                <th>Valid From</th>
                <td>
                  {new Date(
                    this.props.modal_data.vaidFrom
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th>Valid To</th>
                <td>
                  {new Date(this.props.modal_data.validTo).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  {this.props.modal_data.status === 0 ? "Active" : "Inactive"}
                </td>
              </tr>
              <tr>
                <th>Minimum People</th>
                <td>{this.props.modal_data.minimum_number_people}</td>
              </tr>
              <tr>
                <th>IsFeatured</th>
                <td>
                  {this.props.modal_data.isFeatured === 1
                    ? "Featured"
                    : "Not Featured"}
                </td>
              </tr>
            </tbody>
          </table>
          {this.state.isTour ? (
            <div>
              <h2 className={"text-center"}>Tour Type</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Description</th>
                    <th>Tour Type</th>
                    <th>Amount</th>
                    <th>Duration</th>
                    <th>Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.modal_data.tourTypeDetails.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.tour_type}</td>
                        <td>{item.price}</td>
                        <td>{item.duration}</td>
                        <td>{item.currency}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}

          {this.state.isImage ? (
            <div>
              <h2 className={"text-center"}>Image</h2>
              <Row>
                {this.state.imageFile.length > 0
                  ? this.state.imageFile.map((image) => {
                      //console.log('images')

                      return (
                        <Col key={image.path} md={"3"}>
                          <div className={"text-center"}>
                            <img
                              src={this.state.image_base_path + image.path}
                              height="100"
                              width="100"
                            />
                          </div>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </div>
          ) : (
            ""
          )}
          {this.state.isVideo ? (
            <div>
              <h2 className={"text-center"}>Video</h2>
              <Row>
                {this.state.videoFile.length > 0
                  ? this.state.videoFile.map((video) => {
                      //console.log(video)
                      return (
                        <Col key={video.path} md={"6"}>
                          <div className={"text-center"}>
                            <video width="320" height="240" controls>
                              <source src={video.path} type="video/mp4" />
                              <source src={video.path} type="video/ogg" />
                            </video>
                          </div>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </div>
          ) : (
            ""
          )}
        </Col>
      </div>
    );
  }
}

export default FixedPackagePreview;
