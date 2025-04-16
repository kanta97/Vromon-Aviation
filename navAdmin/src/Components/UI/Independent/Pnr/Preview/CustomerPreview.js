import React, { Component } from "react";
import { Col } from "reactstrap";
import "./preview.css";
class hotelPreview extends Component {
  constructor(props) {
    super(props);
    console.log("cus modal data", this.props.modal_data);
  }

  render() {
    const { modal_data } = this.props;
    const adults = modal_data.others.filter((item) => item.title === "adult");
    const children = modal_data.others.filter((item) => item.title === "child");
    const infant = modal_data.others.filter((item) => item.title === "infant");
    return (
      <div>
        <Col xs="12">
          <div className="card border-0 preview_card">
            <div className="card-body p-0 rounded">
              <div className="card-title">
                <h4>Personal Information</h4>
              </div>
              <div className="row">
                <div className="col-4">
                  <label>Title</label>
                  <h5>{this.props.modal_data.who || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Name</label>
                  <h5>{this.props.modal_data.name || "N/A"}</h5>
                </div>{" "}
                <div className="col-4">
                  <label>Surname</label>
                  <h5>{this.props.modal_data.surname || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Passport Number</label>
                  <h5>{this.props.modal_data.passport_number || "N/A"}</h5>
                </div>
                {/* <div className="col-4">
                  <label>Passport issue country</label>
                  <h5>{this.props.modal_data.country_of_issue}</h5>
                </div> */}
                <div className="col-4">
                  <label>Passport issue date</label>
                  <h5>{this.props.modal_data.passport_issue_date || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Passport expire date</label>
                  <h5>{this.props.modal_data.passport_expire_date || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Date of birth</label>
                  <h5>{this.props.modal_data.date_of_birth || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Nationality</label>
                  <h5>{this.props.modal_data.nationality || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Contact Number</label>
                  <h5>{this.props.modal_data.contact_number || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Email</label>
                  <h5>{this.props.modal_data.email || "N/A"}</h5>
                </div>
                <div className="col-4">
                  <label>Adult passenger</label>
                  <h5>{this.props.more.adultCount || "N/A"}</h5>
                </div>
                {this.props.more.childrenCount > 0 ? (
                  <div className="col-4">
                    <label>Child passenger</label>
                    <h5>{this.props.more.childrenCount || "N/A"}</h5>
                  </div>
                ) : null}
                {this.props.more.infantCount > 0 ? (
                  <div className="col-4">
                    <label>Infant passenger</label>
                    <h5>{this.props.more.infantCount || "N/A"}</h5>
                  </div>
                ) : null}
              </div>
            </div>{" "}
          </div>
          {/* <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th>Title</th>
                <td>{this.props.modal_data.who}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{this.props.modal_data.name}</td>
              </tr>
              <tr>
                <th>Surname</th>
                <td>{this.props.modal_data.surname}</td>
              </tr>
              <tr>
                <th>Adult passenger</th>
                <td>{this.props.more.adultCount}</td>
              </tr>
              {this.props.more.childrenCount > 0 ? (
                <tr>
                  <th>Child passenger</th>
                  <td>{this.props.more.childrenCount}</td>
                </tr>
              ) : null}

              {this.props.more.infantCount > 0 ? (
                <tr>
                  <th>Infant passenger</th>
                  <td>{this.props.more.infantCount}</td>
                </tr>
              ) : null}

              <tr>
                <th>Contact Number</th>
                <td>{this.props.modal_data.contact_number}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{this.props.modal_data.email}</td>
              </tr>
              <tr>
                <th>Passport Number</th>
                <td>{this.props.modal_data.passport_number}</td>
              </tr>
              <tr>
                <th>Passport issue country</th>
                <td>{this.props.modal_data.country_of_issue}</td>
              </tr>
              <tr>
                <th>Passport issue date</th>
                <td>{this.props.modal_data.passport_issue_date}</td>
              </tr>
              <tr>
                <th>Passport expire date</th>
                <td>{this.props.modal_data.passport_expire_date}</td>
              </tr>
              <tr>
                <th>Date of birth</th>
                <td>{this.props.modal_data.date_of_birth}</td>
              </tr>
              <tr>
                <th>Nationality</th>
                <td>{this.props.modal_data.nationality}</td>
              </tr>
            </tbody>
          </table> */}

          {this.props.modal_data.others.map((item, i) => (
            <div className="card border-0 preview_card">
              <h4>
                Traveller:&nbsp;
                {item.title === "adult"
                  ? `${adults.indexOf(item) + 2} (Adult)`
                  : item.title === "child"
                  ? `${children.indexOf(item) + 1} (Child) `
                  : item.title === "infant"
                  ? `${infant.indexOf(item) + 1} (Infant)`
                  : ""}
              </h4>
              <div className="card-body p-0 mt-3 rounded">
                <div className="card-title">
                  <h4>Personal Information</h4>
                </div>
                <div className="row">
                  <div className="col-4">
                    <label>Title</label>
                    <h5>{item.who || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Name</label>
                    <h5>{item.name || "N/A"}</h5>
                  </div>{" "}
                  <div className="col-4">
                    <label>Surname</label>
                    <h5>{item.surname || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Passport Number</label>
                    <h5>{item.passportNumber || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Passport issue country</label>
                    <h5>{item.countryOfIssue || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Passport issue date</label>
                    <h5>{item.passportIssueDate || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Passport expire date</label>
                    <h5>{item.passportExpireDate || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Date of birth</label>
                    <h5>{item.dateOfBirth || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Nationality</label>
                    <h5>{item.nationality || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Contact Number</label>
                    <h5>{item.contactNumber || "N/A"}</h5>
                  </div>
                  <div className="col-4">
                    <label>Email</label>
                    <h5>{item.email || "N/A"}</h5>
                  </div>
                </div>{" "}
              </div>{" "}
            </div>
          ))}
          {/* <table className="table table-striped table-bordered">
            {this.props.modal_data.others.map((item, i) => (
              <tbody>
                {" "}
                <th>Travellers {i + 1}</th>
                <tr>
                  <th>Name</th>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <th>Surname</th>
                  <td>{item.surname}</td>
                </tr>
                <tr>
                  <th>Contact Number</th>
                  <td>{item.contactNumber}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{item.email}</td>
                </tr>
                <tr>
                  <th>Passport Number</th>
                  <td>{item.passportNumber}</td>
                </tr>
                <tr>
                  <th>Passport issue country</th>
                  <td>{item.countryOfIssue}</td>
                </tr>
                <tr>
                  <th>Passport issue date</th>
                  <td>{item.passportIssueDate}</td>
                </tr>
                <tr>
                  <th>Passport expire date</th>
                  <td>{item.passportExpireDate}</td>
                </tr>
                <tr>
                  <th>Date of birth</th>
                  <td>{item.dateOfBirth}</td>
                </tr>
                <tr>
                  <th>Nationality</th>
                  <td>{item.nationality}</td>
                </tr>
              </tbody>
            ))}
          </table> */}
        </Col>
      </div>
    );
  }
}

export default hotelPreview;
