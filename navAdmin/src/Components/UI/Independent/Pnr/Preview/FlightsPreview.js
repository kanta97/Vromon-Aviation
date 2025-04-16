import React, { Component } from "react";
import { Col } from "reactstrap";
import "./preview.css";
class hotelPreview extends Component {
  constructor(props) {
    super(props);
    console.log("modall", this.props.modal_data);
    console.log("datat", this.props.airlineMap);
  }

  render() {
    return (
      <div className="flight_card">
        <Col xs="12">
          {this.props.modal_data.legs.map((item, i) => (
            <div className="box_dev">
              <div className="row m-2 p-3">
                <div className="col-2 p-0">
                  <span>
                    {" "}
                    {item.MarketingAirlineCode}-{item.FlightNumber}
                  </span>
                  <h5>
                    {this.props.airlineMap[item.MarketingAirlineCode]
                      ? this.props.airlineMap[item.MarketingAirlineCode]
                      : item.MarketingAirlineCode}
                  </h5>
                </div>
                <div className="col-4">
                  <h5> {item.OriginLocationCode}</h5>
                  <h5>
                    {" "}
                    {this.props.airportMap[item.OriginLocationCode]
                      ? this.props.airportMap[item.OriginLocationCode]
                      : item.OriginLocationCode}
                  </h5>
                  <h5>{item.DepartureDateTime}</h5>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <div
                    className="col-4 for_transform"
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      fontSize: "12px",
                      transform: "translateX(-55px)",
                      color: "#535D7E",
                    }}
                  >
                    <div className="flight_stops_info">
                      <div className="flight_stop_names"></div>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-4">
                  <h5>{item.DestinationLocationCode}</h5>
                  <h5>
                    {this.props.airportMap[item.DestinationLocationCode]
                      ? this.props.airportMap[item.DestinationLocationCode]
                      : item.DestinationLocationCode}
                  </h5>
                  <h5>{item.ArrivalDateTime}</h5>
                </div>
              </div>
            </div>
          ))}

          {/* <table className="table table-bordered">
            <tbody>
              {this.props.modal_data.legs.map((item, i) => (
                <tr>
                  <th>{item.DepartureDateTime}</th>
                  <td>
                    <table className="table table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Departure From</th>
                          <td>
                            {this.props.airportMap[item.OriginLocationCode]
                              ? this.props.airportMap[item.OriginLocationCode]
                              : item.OriginLocationCode}
                          </td>
                        </tr>
                        <tr>
                          <th>Airline</th>
                          <td>
                            {this.props.airlineMap[item.MarketingAirlineCode]
                              ? this.props.airlineMap[item.MarketingAirlineCode]
                              : item.MarketingAirlineCode}
                          </td>
                        </tr>
                        <tr>
                          <th>Arrival At</th>
                          <td>
                            {this.props.airportMap[item.DestinationLocationCode]
                              ? this.props.airportMap[
                                  item.DestinationLocationCode
                                ]
                              : item.DestinationLocationCode}
                          </td>
                        </tr>
                        <tr>
                          <th>Arrival Time</th>
                          <td>{item.ArrivalDateTime}</td>
                        </tr>
                        <tr>
                          <th>Baggage Info</th>
                          <td>
                            {Object.keys(item.baggageInfo).length === 0 ? (
                              "No baggage info available"
                            ) : (
                              <ul>
                                <li>
                                  Max. luggage allowance :{" "}
                                  {item.baggageInfo.pieceCount}
                                </li>
                                {item.baggageInfo.description1 ? (
                                  <li>{item.baggageInfo.description1}</li>
                                ) : null}

                                {item.baggageInfo.description2 ? (
                                  <li>{item.baggageInfo.description2}</li>
                                ) : null}
                              </ul>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </Col>
      </div>
    );
  }
}

export default hotelPreview;
