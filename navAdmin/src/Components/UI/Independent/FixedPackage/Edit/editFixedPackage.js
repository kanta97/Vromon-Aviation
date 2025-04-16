import React, { Component, Fragment, Suspense } from "react";
import Loadable from "react-loadable";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as API from "../../../../../API";
import * as helper from "../../../../../Helpers";
import "./editFixedPackage.css";
import "trix/dist/trix";
import { TrixEditor } from "react-trix";
//import CKEditor from "ckeditor4-react";

import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
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
/*
const base64url = require('base64-url')
*/
/*
const fetch = require('fetch-base64');
*/
const tour_type_array = ["REGULAR", "PREMIUM", "DELUXE"];
const base64Img = require("base64-img");

class editFixedPackage extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props.modal_data)

    this.state = {
      image_base_path: API.image_base_path,
      isChanged: 0,
      package_id: this.props.modal_data.id,
      controls: {
        origin: {
          value: this.props.modal_data.origin,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        destination: {
          value: this.props.modal_data.destination,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        name: {
          value: this.props.modal_data.name,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        summary: {
          value: this.props.modal_data.summary,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        duration_day: {
          value: this.props.modal_data.duration_day,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        duration_night: {
          value: this.props.modal_data.duration_night,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        start_date: {
          value: helper.dateYYYMMDDHyphens(this.props.modal_data.vaidFrom),
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        end_date: {
          value: helper.dateYYYMMDDHyphens(this.props.modal_data.validTo),
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        description: {
          value: this.props.modal_data.description,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        status: {
          value: this.props.modal_data.status,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        country: {
          value: this.props.modal_data.country,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        exclusions: {
          value: this.props.modal_data.exclusions,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        itinerary: {
          value: this.props.modal_data.itinerary,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        inclusions: {
          value: this.props.modal_data.inclusions,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        terms_conditions: {
          value: this.props.modal_data.terms_conditions,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        minimum_number_people: {
          value: this.props.modal_data.minimum_number_people,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        isFeatured: {
          value: this.props.modal_data.isFeatured,
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
        },
        price: [
          {
            tour_type: "",
            price: "",
            currency: "",
            hotel_id: "",
          },
        ],
        resource: [],
        featured_image: [],
      },
      allResource: [],
      allFeaturedImage: [],
      counter: 0,
      price: [],
      hotelOption: [],
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
      modal_data: this.props.modal_data,
      fullData: [
        {
          tour_type: "",
          hotel: "",
          duration: "",
        },
      ],
      tourTypeArray: [],
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
    await this.getAllHotelItem();
    await this.loadPrice(this.props.modal_data);
    await this.loadMedia(this.props.modal_data);
  }
  async loadMedia(val) {
    let featArray = [];
    let notFeatArray = [];
    let subFeat = {};
    let subNotFeat = {};
    if (val !== undefined && val.media !== undefined) {
      if (val.media.length > 0) {
        val.media.map((item, index) => {
          if (item.isFeatured === 1 || item.isFeatured === "1") {
            subFeat = {
              path: item.path,
              type: item.type,
              isFeatured: item.isFeatured,
            };
            featArray.push(subFeat);
          } else {
            subNotFeat = {
              path: item.path,
              type: item.type,
              isFeatured: item.isFeatured,
            };
            notFeatArray.push(subNotFeat);
          }
        });
        this.setState({
          allResource: notFeatArray,
          allFeaturedImage: featArray,
        });
      }
    }
  }
  async loadPrice(val) {
    let tourType = await API.loadtourTypeSession();
    //  console.log(tourType)
    let hotelArray = [];
    let hotelSub = {};
    let tourArray = [];
    if (val !== undefined && val.tourTypeDetails !== undefined) {
      if (val.tourTypeDetails.length > 0) {
        tourType.map((item1, index1) => {
          val.tourTypeDetails.map((item, index) => {
            if (item1.tour_type === item.tour_type) {
              hotelSub = {
                tour_type: item.tour_type,
                hotel: item.hotel_id + "||" + item.name,
                duration: item.duration,
              };
              hotelArray.push(hotelSub);
            }
            let price = `price_${item.tour_type}`;
            let currency = `currency_${item.tour_type}`;

            const updatedControls1 = updateObject(this.state.controls, {
              [price]: updateObject(this.state.controls[price], {
                value: item.price,
                touched: true,
              }),
            });
            let len = hotelArray.length;
            this.setState({
              controls: updatedControls1,
              tourTypeArray: tourType,
              fullData: hotelArray,
              counter: len,
            });
            const updatedControls2 = updateObject(this.state.controls, {
              [currency]: updateObject(this.state.controls[currency], {
                value: item.currency,
                touched: true,
              }),
            });
            this.setState({ controls: updatedControls2 });
          });
        });
        /*val.tourTypeDetails.map((item, index)=>{
                  let hotel_id = `${item.hotel_id}_hotel_${item.tour_type}`;
                  let price = `price_${item.tour_type}`;
                  let currency = `currency_${item.tour_type}`;
                  console.log(currency)
                  console.log(price)
                  console.log(hotel_id)
                  const updatedControls = updateObject( this.state.controls, {
                    [hotel_id]: updateObject( this.state.controls[hotel_id], {
                      value: item.hotel_id,
                      touched: true
                    })
                  })
                  this.setState( { controls: updatedControls} )

                  const updatedControls1 = updateObject( this.state.controls, {
                    [price]: updateObject( this.state.controls[price], {
                      value: item.price,
                      touched: true
                    })
                  })
                  this.setState( { controls: updatedControls1} )
                  const updatedControls2 = updateObject( this.state.controls, {
                    [currency]: updateObject( this.state.controls[currency], {
                      value: item.currency,
                      touched: true
                    })
                  })
                  this.setState( { controls: updatedControls2} )
                })*/
      }
    }
  }
  async getAllHotelItem() {
    API.getAllHotel()
      .then((response) => {
        if (response.data.status === "200 OK") {
          if (response.data.body.length > 0) {
            //console.log(response.data.body)
            this.setState({
              hotelOption: response.data.body,
            });
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  editFixedPackageHandle = (event) => {
    event.preventDefault();

    event.preventDefault();
    //console.log(this.state)
    let totalArray = [];
    let priceArray = [];
    let sub = {};
    let inner_flag = true;
    let featuredFlag = false;
    let errorMessage = "";
    let flag = false;
    let priceFlag = false;
    let currencyFlag = false;
    let cur = "";
    this.state.tourTypeArray.map((item) => {
      //  console.log(item)
      let hotel_id = `hotel_${item.tour_type}`;
      let price = `price_${item.tour_type}`;
      let currency = `currency_${item.tour_type}`;
      let amount = 0;
      let hotel = "";
      let curr = "";
      priceFlag = false;
      currencyFlag = false;

      if (
        this.state.controls[price] !== "" &&
        this.state.controls[price] !== undefined &&
        this.state.controls[price] !== null
      ) {
        if (
          this.state.controls[price].value !== "" &&
          this.state.controls[price].value !== undefined &&
          this.state.controls[price].value !== null &&
          this.state.controls[price].value > 0
        ) {
          if (!priceFlag) {
            priceFlag = true;
            amount = this.state.controls[price].value;
          }
        } else {
          priceFlag = false;
          /*if(priceFlag){
                      errorMessage = 'Amount missing for tour type '+ item.tour_type
                      inner_flag = false
                    }     */
          //   console.log(item.tour_type)
        }
      } else {
        priceFlag = false;
        /*  errorMessage = 'Amount missing for tour type '+ item.tour_type
                  inner_flag = false*/
        //console.log(item.tour_type)
      }
      if (
        this.state.controls[currency] !== "" &&
        this.state.controls[currency] !== undefined &&
        this.state.controls[currency] !== null
      ) {
        if (
          this.state.controls[currency].value !== "" &&
          this.state.controls[currency].value !== undefined &&
          this.state.controls[currency].value !== null
        ) {
          if (!currencyFlag) {
            currencyFlag = true;
            cur = this.state.controls[currency].value;
          }
          // console.log(item.tour_type)
        } else {
          priceFlag = false;
          /* errorMessage = 'Currency missing for tour type '+ item.tour_type
                     inner_flag = false*/
        }
      } else {
        priceFlag = false;
        /*errorMessage = 'Currency missing for tour type '+ item.tour_type
                inner_flag = false*/
        //console.log(item.tour_type)
      }

      let hotelArray = [];
      let s = {};
      if (this.state.fullData.length > 0) {
        this.state.fullData.map((it) => {
          if (it !== undefined && it !== "" && it !== null) {
            if (it.tour_type === item.tour_type) {
              totalArray.push(it.tour_type);
              let as = it.hotel.split("||");
              s = {
                hotel_id: parseInt(as[0]),
                tour_type: it.tour_type,
                duration: it.duration,
              };
              hotelArray.push(s);
            }
          }
        });
        //console.log(hotelArray)
      }
      console.log(amount);
      console.log(hotelArray);
      /* if(hotelArray.length < 1 ){
               errorMessage = 'Hotel and duration not defined'
               inner_flag = false
             }*/
      // console.log(inner_flag)
      //  console.log(hotelArray.length)
      if (priceFlag && currencyFlag) {
        sub = {
          tour_type: item.tour_type,
          price: parseInt(amount),
          currency: cur,
          hotel: hotelArray,
        };
        priceArray.push(sub);
      }
    });
    console.log(totalArray);
    let uniqueItems = Array.from(new Set(totalArray));
    console.log(uniqueItems);
    console.log(uniqueItems.length + "length");
    console.log(priceArray);
    if (uniqueItems.length < 0) {
      errorMessage = "Please add price at least one tour type";
      inner_flag = false;
    }
    let resource = [];
    if (
      this.state.controls["resource"].value === "" ||
      this.state.controls["resource"].value === undefined ||
      this.state.controls["resource"].value === null
    ) {
      resource = [];
    } else {
      resource = this.state.controls["resource"].value;
    }

    let allResource = [];
    if (this.state.allResource.length > 0) {
      allResource = this.state.allResource;
    } else {
      allResource = [];
    }

    let featuredImage = [];
    if (
      this.state.controls["featured_image"].value === "" ||
      this.state.controls["featured_image"].value === undefined ||
      this.state.controls["featured_image"].value === null
    ) {
      console.log(this.state.allFeaturedImage);
      if (this.state.allFeaturedImage.length > 0) {
        featuredFlag = true;
        featuredImage = this.state.allFeaturedImage;
      } else {
        errorMessage = "Featured image required";
        inner_flag = false;
      }
    } else {
      featuredFlag = false;
      featuredImage = this.state.controls["featured_image"].value;
    }

    //console.log(resource)
    // console.log(priceArray)
    let origin = "";
    if (
      this.state.controls["origin"].value === "" ||
      this.state.controls["origin"].value === undefined ||
      this.state.controls["origin"].value === null
    ) {
      errorMessage = "Origin required";
      inner_flag = false;
    } else {
      origin = this.state.controls["origin"].value;
    }

    let destination = "";
    if (
      this.state.controls["destination"].value === "" ||
      this.state.controls["destination"].value === undefined ||
      this.state.controls["destination"].value === null
    ) {
      errorMessage = "Destination required";
      inner_flag = false;
    } else {
      destination = this.state.controls["destination"].value;
    }

    let start_date = "";
    if (
      this.state.controls["start_date"].value === "" ||
      this.state.controls["start_date"].value === undefined ||
      this.state.controls["start_date"].value === null
    ) {
      errorMessage = "Start date required";
      inner_flag = false;
    } else {
      start_date = this.state.controls["start_date"].value;
    }

    let end_date = "";
    if (
      this.state.controls["end_date"].value === "" ||
      this.state.controls["end_date"].value === undefined ||
      this.state.controls["end_date"].value === null
    ) {
      errorMessage = "End date required";
      inner_flag = false;
    } else {
      end_date = this.state.controls["end_date"].value;
    }

    let country = "";
    if (
      this.state.controls["country"].value === "" ||
      this.state.controls["country"].value === undefined ||
      this.state.controls["country"].value === null
    ) {
      errorMessage = "Country required";
      inner_flag = false;
    } else {
      country = this.state.controls["country"].value;
    }

    let minimum_number_people = "";
    if (
      this.state.controls["minimum_number_people"].value === "" ||
      this.state.controls["minimum_number_people"].value === undefined ||
      this.state.controls["minimum_number_people"].value === null ||
      this.state.controls["minimum_number_people"].value < 0
    ) {
      errorMessage = "Minimum people required";
      inner_flag = false;
    } else {
      minimum_number_people =
        this.state.controls["minimum_number_people"].value;
    }

    let description = "";
    if (
      this.state.controls["description"].value === "" ||
      this.state.controls["description"].value === undefined ||
      this.state.controls["description"].value === null
    ) {
      description = "";
    } else {
      description = this.state.controls["description"].value;
    }

    let name = "";
    if (
      this.state.controls["name"].value === "" ||
      this.state.controls["name"].value === undefined ||
      this.state.controls["name"].value === null
    ) {
      name = "";
    } else {
      name = this.state.controls["name"].value;
    }

    let summary = "";
    if (
      this.state.controls["summary"].value === "" ||
      this.state.controls["summary"].value === undefined ||
      this.state.controls["summary"].value === null
    ) {
      summary = "";
    } else {
      summary = this.state.controls["summary"].value;
    }

    let terms_conditions = "";
    if (
      this.state.controls["terms_conditions"].value === "" ||
      this.state.controls["terms_conditions"].value === undefined ||
      this.state.controls["terms_conditions"].value === null
    ) {
      terms_conditions = "";
    } else {
      terms_conditions = this.state.controls["terms_conditions"].value;
    }

    let status = "";
    if (
      this.state.controls["status"].value === "" ||
      this.state.controls["status"].value === undefined ||
      this.state.controls["status"].value === null
    ) {
      status = 0;
    } else {
      status = this.state.controls["status"].value;
    }

    let exclusions = "";
    if (
      this.state.controls["exclusions"].value === "" ||
      this.state.controls["exclusions"].value === undefined ||
      this.state.controls["exclusions"].value === null
    ) {
      exclusions = "";
    } else {
      exclusions = this.state.controls["exclusions"].value;
    }

    let itinerary = "";
    if (
      this.state.controls["itinerary"].value === "" ||
      this.state.controls["itinerary"].value === undefined ||
      this.state.controls["itinerary"].value === null
    ) {
      itinerary = "";
    } else {
      itinerary = this.state.controls["itinerary"].value;
    }

    let inclusions = "";
    if (
      this.state.controls["inclusions"].value === "" ||
      this.state.controls["inclusions"].value === undefined ||
      this.state.controls["inclusions"].value === null
    ) {
      inclusions = "";
    } else {
      inclusions = this.state.controls["inclusions"].value;
    }

    let duration_day = "";
    if (
      this.state.controls["duration_day"].value === "" ||
      this.state.controls["duration_day"].value === undefined ||
      this.state.controls["duration_day"].value === null
    ) {
      duration_day = "";
    } else {
      duration_day = this.state.controls["duration_day"].value;
    }
    let duration_night = "";
    if (duration_day !== "") {
      if (
        this.state.controls["duration_night"].value === "" ||
        this.state.controls["duration_night"].value === undefined ||
        this.state.controls["duration_night"].value === null
      ) {
        duration_night = "";
      } else {
        duration_night = this.state.controls["duration_night"].value;
      }
    } else {
      duration_night = "";
    }

    let isFeatured = "";
    if (
      this.state.controls["isFeatured"].value === "" ||
      this.state.controls["isFeatured"].value === undefined ||
      this.state.controls["isFeatured"].value === null
    ) {
      isFeatured = 0;
    } else {
      isFeatured = this.state.controls["isFeatured"].value;
    }
    //  let multiple_files_uploads = document.querySelector('input[type="file"]').files[0]
    if (inner_flag) {
      let mainObject = {
        featuredImage: featuredImage,
        name: name,
        summary: summary,
        origin: origin,
        terms_conditions: terms_conditions,
        destination: destination,
        description: description,
        start_date: start_date,
        end_date: end_date,
        status: status,
        country: country,
        exclusions: exclusions,
        itinerary: itinerary,
        inclusions: inclusions,
        minimum_number_people: minimum_number_people,
        isFeatured: isFeatured,
        price: priceArray,
        allResource: allResource,
        files: resource,
      };
      console.log(mainObject);
      let url = [];
      let sub_url = {};
      let data = new FormData();
      if (featuredFlag) {
        for (let item of featuredImage) {
          // console.log(item)
          sub_url = {
            path: item.path,
            isFeatured: 1,
          };
          url.push(sub_url);
        }
      } else {
        for (let item of featuredImage) {
          // console.log(item)
          data.append("files", item);
          data.append("featuredresourceindex", 0);
        }
      }

      for (let item of resource) {
        // console.log(item)
        data.append("files", item);
      }
      for (let item of allResource) {
        // console.log(item)
        sub_url = {
          path: item.path,
          isFeatured: 0,
        };
        url.push(sub_url);
      }

      data.append("resource_url", JSON.stringify(url));
      data.append("id", this.state.package_id);
      data.append("origin", origin);
      data.append("duration_day", duration_day);
      data.append("duration_night", duration_night);
      data.append("summary", summary);
      data.append("terms_conditions", terms_conditions);
      data.append("name", name);
      data.append("destination", destination);
      data.append("description", description);
      data.append("vaidFrom", start_date);
      data.append("validTo", end_date);
      data.append("status", status);
      data.append("country", country);
      data.append("exclusions", exclusions);
      data.append("itinerary", itinerary);
      data.append("inclusions", inclusions);
      data.append("minimum_number_people", minimum_number_people);
      data.append("isFeatured", isFeatured);
      data.append("price", JSON.stringify(priceArray));
      console.log(data);
      API.editFixedPackage(data)
        .then((response) => {
          //console.log(response)
          if (response.data.status === "200 OK") {
            this.props.onEditFixedPackageResponse(true, response.data.body.msg);
          } else {
            this.props.onEditFixedPackageResponse(
              false,
              "FixedPackage not added. Invalid data supplied"
            );
          }
        })
        .catch((err) => {
          this.props.onEditFixedPackageResponse(
            false,
            "FixedPackage not added. Error occurred"
          );
        });
    } else {
      this.setState({
        modal: true,
        danger: true,
        dangerModalTitle: "Failure",
        dangerModalBody: errorMessage,
      });
    }
  };
  removeTourDetail = (event, index) => {
    event.preventDefault();
    let fullData = [...this.state.fullData];
    let newState = fullData.splice(index, 1);
    let len = fullData.length;

    this.setState({
      fullData: fullData,
    });
  };

  removeImage = (event, index, val) => {
    event.preventDefault();
    if (val === "featured") {
      this.setState({
        //allResource: notFeatArray,
        allFeaturedImage: [],
      });
    } else {
      let fullData = [...this.state.allResource];
      let newState = fullData.splice(index, 1);
      let len = fullData.length;

      this.setState({
        allResource: fullData,
      });
    }
  };

  addMoreHotel = (event, tour) => {
    event.preventDefault();
    //console.log(tour)
    let count = this.state.counter;
    let hotel_id = `hotel_${tour}`;
    let duration = `duration_${tour}`;
    let data = {};
    if (
      this.state.controls[hotel_id] !== "" &&
      this.state.controls[hotel_id] !== undefined &&
      this.state.controls[hotel_id] !== null &&
      this.state.controls[duration] !== "" &&
      this.state.controls[duration] !== undefined &&
      this.state.controls[duration] !== null
    ) {
      if (
        this.state.controls[hotel_id].value === "" ||
        this.state.controls[hotel_id].value === undefined ||
        this.state.controls[hotel_id].value === null ||
        this.state.controls[duration].value === "" ||
        this.state.controls[duration].value === undefined ||
        this.state.controls[duration].value === null
      ) {
      } else {
        /*data = {
                  tour_type: tour,
                  hotel: this.state.controls[hotel_id].value,
                  duration: this.state.controls[duration].value,
                }
                console.log(data)*/

        let fullData = [...this.state.fullData];
        let length = fullData.length;
        let item = { ...fullData[count] };
        item.tour_type = tour;
        item.hotel = this.state.controls[hotel_id].value;
        item.duration = this.state.controls[duration].value;
        fullData[count] = item;
        count = parseInt(count) + 1;
        this.state.controls[duration].value = "";
        this.state.controls[hotel_id].value = "";
        this.setState({ fullData: fullData, counter: count });
      }
    } else {
    }
    console.log(this.state);
  };

  textInputChangeHandler = (event, controlName) => {
    let value = event;
    if (controlName === "description") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }
    if (controlName === "summary") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }
    if (controlName === "itinerary") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }

    if (controlName === "inclusions") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }
    if (controlName === "exclusions") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }
    if (controlName === "terms_conditions") {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });

      return this.setState({ controls: updatedControls });
    }
  };

  inputChangeHandler = (event, controlName) => {
    /*event.preventDefault()
        if(controlName === 'resource'){
          const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
              value: event.target.files,
              //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
              touched: true
            })
          })

          this.setState( { controls: updatedControls, isChanged: 1 } )
          console.log(updatedControls)
        } else {
          const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
              value: event.target.value,
              //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
              touched: true
            })
          })
          this.setState( { controls: updatedControls} )



          console.log(this.state)
        }*/
    /*if(controlName==='name'){
            const updatedControls = updateObject( this.state.controls, {
                [controlName]: updateObject( this.state.controls[controlName], {
                    value: event.editor.getData(),
                    //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
                    touched: true
                })
            })

            return this.setState({controls: updatedControls})
        }*/

    event.preventDefault();
    if (controlName === "resource") {
      let len = event.target.files.length;
      let i = 0;
      let filename = "";
      let regex = new RegExp("(.*?).(png|jpg|jpeg|gif)$");
      let flag = true;
      for (i = 0; i < len; i++) {
        filename = event.target.files[i].type.split("/");
        if (
          filename[0] === "video" ||
          filename[0] === "VIDEO" ||
          filename[0] === "image" ||
          filename[0] === "IMAGE"
        ) {
        } else {
          flag = false;
        }
      }
      if (flag) {
        const updatedControls = updateObject(this.state.controls, {
          [controlName]: updateObject(this.state.controls[controlName], {
            value: event.target.files,
            //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
            touched: true,
          }),
        });

        this.setState({ controls: updatedControls });
      } else {
        this.setState({
          modal: true,
          danger: true,
          dangerModalTitle: "Failure",
          dangerModalBody: "Only image or video file supported",
        });
      }
    } else if (controlName === "featured_image") {
      let len = event.target.files.length;
      let i = 0;
      let filename = "";
      let regex = new RegExp("(.*?).(png|jpg|jpeg|gif)$");
      let flag = true;
      for (i = 0; i < len; i++) {
        filename = event.target.files[i].type.split("/");
        if (
          filename[0] === "video" ||
          filename[0] === "VIDEO" ||
          filename[0] === "image" ||
          filename[0] === "IMAGE"
        ) {
        } else {
          flag = false;
        }
      }
      if (flag) {
        const updatedControls = updateObject(this.state.controls, {
          [controlName]: updateObject(this.state.controls[controlName], {
            value: event.target.files,
            //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
            touched: true,
          }),
        });

        this.setState({ controls: updatedControls, allFeaturedImage: [] });
      } else {
        this.setState({
          modal: true,
          danger: true,
          dangerModalTitle: "Failure",
          dangerModalBody: "Only image or video file supported",
        });
      }
    } else {
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: event.target.value,
          //valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
          touched: true,
        }),
      });
      this.setState({ controls: updatedControls });
    }
  };
  createFile = (url) => {
    /*let data = base64Img.base64Sync(url);
        console.log(data)
        return data;*/
    /*base64Img.base64(url, function(err, data) {
          console.log(data)
          return data
        })*/
    /*//let response = await fetch('http://127.0.0.1:8085/test.jpg');
        let data =  url.blob();
        let metadata = {
          type: 'image/jpeg'
        };
        let file = new File([data], "test.jpg", metadata);
        return file;*/
    /*let baseImage = new Image;
        baseImage.setAttribute('crossOrigin', 'anonymous');
        baseImage.src = url

        let canvas = document.createElement("canvas");
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0);
        console.log(ctx)
        let dataURL = canvas.toDataURL("image/png");
        console.log(dataURL)
        return dataURL*/
    // ... do something with the file or return it
  };

  render() {
    let checker = [];
    console.log(this.state);
    let flag = false;
    //console.log(this.state.fullData)
    this.state.fullData.map((item) => {
      if (item !== undefined && item !== null && item !== "") {
        if (
          item.tour_type !== undefined &&
          item.tour_type !== null &&
          item.tour_type !== ""
        ) {
          flag = true;
        }
      }
    });

    console.log(this.state);
    let tour = this.state.tourTypeArray.map((item, index) => {
      let hotel_id = `hotel_${item.tour_type}`;
      let price = `price_${item.tour_type}`;
      let currency = `currency_${item.tour_type}`;
      let duration = `duration_${item.tour_type}`;

      let hotel_val = "";
      if (
        this.state.controls[hotel_id] !== undefined &&
        this.state.controls[hotel_id] !== "" &&
        this.state.controls[hotel_id] !== null
      ) {
        if (
          this.state.controls[hotel_id].value !== undefined &&
          this.state.controls[hotel_id].value !== "" &&
          this.state.controls[hotel_id].value !== null
        ) {
          hotel_val = this.state.controls[hotel_id].value;
        }
      }

      let duration_val = "";
      if (
        this.state.controls[duration] !== undefined &&
        this.state.controls[duration] !== "" &&
        this.state.controls[duration] !== null
      ) {
        if (
          this.state.controls[duration].value !== undefined &&
          this.state.controls[duration].value !== "" &&
          this.state.controls[duration].value !== null
        ) {
          duration_val = this.state.controls[duration].value;
        }
      }

      return (
        <div key={item.tour_type}>
          <div className={"text-center"}>{item.tour_type}</div>
          <br />
          <FormGroup key={item.tour_type} row className="my-0">
            <Col xs="2">
              <FormGroup>
                <Label htmlFor="day">Amount</Label>
                <Input
                  type="number"
                  min="0"
                  value={
                    this.state.controls[price] !== undefined
                      ? this.state.controls[price].value
                      : ""
                  }
                  onChange={(event) => this.inputChangeHandler(event, price)}
                  placeholder="Amount"
                />
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="hour">Currency</Label>
                <Input
                  value={
                    this.state.controls[currency] !== undefined
                      ? this.state.controls[currency].value
                      : ""
                  }
                  type="select"
                  onChange={(event) => this.inputChangeHandler(event, currency)}
                >
                  <option key={"1"} value="">
                    Select Currency
                  </option>
                  <option key={"2"} value="BDT">
                    BDT
                  </option>
                  <option key={"3"} value="USD">
                    USD
                  </option>
                  <option key={"4"} value="EURO">
                    EURO
                  </option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="hour">Hotel</Label>
                <Input
                  value={hotel_val}
                  type="select"
                  onChange={(event) => this.inputChangeHandler(event, hotel_id)}
                >
                  <option value="">Hotel</option>
                  {this.state.hotelOption.map((hotel_item, index) => {
                    if (item.tour_type === hotel_item.tour_type) {
                      return (
                        <option
                          key={index}
                          value={hotel_item.id + "||" + hotel_item.name}
                        >
                          {hotel_item.name}
                        </option>
                      );
                    }
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  value={duration_val}
                  type="number"
                  min="0"
                  onChange={(event) => this.inputChangeHandler(event, duration)}
                  placeholder="Duration"
                />
              </FormGroup>
            </Col>
            <Col xs="1">
              <div className={"add_more_btn"}>
                <Button
                  onClick={(event) => this.addMoreHotel(event, item.tour_type)}
                  color={"primary"}
                >
                  Add
                </Button>
              </div>
            </Col>
          </FormGroup>
        </div>
      );
    });

    return (
      <div>
        <Col xs="12">
          <form>
            <Card>
              <CardHeader>Package info</CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        value={this.state.controls.origin.value}
                        type="text"
                        id="origin"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "origin")
                        }
                        placeholder="Enter Origin"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Destination</Label>
                      <Input
                        value={this.state.controls.destination.value}
                        type="text"
                        id="destination"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "destination")
                        }
                        placeholder="Enter Destination"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">name</Label>

                      <Input
                        value={this.state.controls.name.value}
                        type="text"
                        id="name"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "name")
                        }
                        placeholder="Enter name"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="minimum_number_people">Min people</Label>
                      <Input
                        value={this.state.controls.minimum_number_people.value}
                        type="number"
                        id="minimum_number_people"
                        onChange={(event) =>
                          this.inputChangeHandler(
                            event,
                            "minimum_number_people"
                          )
                        }
                        placeholder="Enter Min people"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="start_date">Valid From</Label>
                      <Input
                        value={this.state.controls.start_date.value}
                        type="date"
                        id="start_date"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "start_date")
                        }
                        placeholder="Enter Start Day"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="end_date">Valid To</Label>
                      <Input
                        value={this.state.controls.end_date.value}
                        type="date"
                        id="end_date"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "end_date")
                        }
                        placeholder="Enter End Day"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="start_date">Country</Label>
                      <Input
                        value={this.state.controls.country.value}
                        type="text"
                        id="country"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "country")
                        }
                        placeholder="Enter country"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      {/*
                                            <Input value={this.state.controls.description.value}  className={'input_resize'} type="textarea" colSpan="4" id="description" onChange={event => this.inputChangeHandler(event,'description')} placeholder="Enter Description" />
*/}

                      <TrixEditor
                        value={this.state.controls.description.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "description")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="summary">Summary</Label>
                      {/*
                                            <Input value={this.state.controls.summary.value}  className={'input_resize'} type="textarea" colSpan="4" id="summary" onChange={event => this.inputChangeHandler(event,'summary')} placeholder="Enter summary" />
*/}

                      <TrixEditor
                        value={this.state.controls.summary.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "summary")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="terms_conditions">Terms Conditions</Label>

                      <TrixEditor
                        value={this.state.controls.terms_conditions.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "terms_conditions")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="exclusions">Exclusions</Label>

                      <TrixEditor
                        value={this.state.controls.exclusions.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "exclusions")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="inclusions">Inclusions</Label>

                      <TrixEditor
                        value={this.state.controls.inclusions.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "inclusions")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="itinerary">Itinerary</Label>
                      <TrixEditor
                        value={this.state.controls.itinerary.value}
                        onChange={(event) =>
                          this.textInputChangeHandler(event, "itinerary")
                        }
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input
                        value={this.state.controls.status.value}
                        type="select"
                        id="status"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "status")
                        }
                        placeholder="Enter Status"
                      >
                        <option value="">Select Status</option>
                        <option value="0">Active</option>
                        <option value="1">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="isFeatured">Featured</Label>
                      <Input
                        value={this.state.controls.isFeatured.value}
                        type="select"
                        id="isFeatured"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "isFeatured")
                        }
                        placeholder="Enter Featured"
                      >
                        <option value="">Select Featured</option>
                        <option value="1">Is featured</option>
                        <option value="0">Not featured</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="duration_day">Duration Days</Label>
                      <Input
                        value={this.state.controls.duration_day.value}
                        className={"input_resize"}
                        type="number"
                        id="duration_day"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "duration_day")
                        }
                        placeholder="Enter duration day"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="duration_night">Duration Nights</Label>
                      <Input
                        value={this.state.controls.duration_night.value}
                        className={"input_resize"}
                        type="number"
                        id="duration_night"
                        onChange={(event) =>
                          this.inputChangeHandler(event, "duration_night")
                        }
                        placeholder="Enter duration night"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Price</CardHeader>
              <CardBody>
                {this.state.fullData.length > 0 && flag ? (
                  <Fragment>
                    <div className={"text-center"}>
                      <h4>Hotels</h4>
                    </div>
                    <div>
                      <table className={"table table-striped table-bordered"}>
                        <thead>
                          <tr>
                            <th className={"text-center"}>Type</th>
                            <th className={"text-center"}>Amount</th>
                            <th className={"text-center"}>Currency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.fullData.map((item, index) => {
                            //console.log(item)
                            if (
                              item !== undefined &&
                              item !== "" &&
                              item !== null
                            ) {
                              let price = `price_${item.tour_type}`;
                              let currency = `currency_${item.tour_type}`;
                              let hotel = item.hotel.split("||");
                              let c = helper.isInArray(item.tour_type, checker);
                              //  console.log(c)
                              if (!c) {
                                checker.push(item.tour_type);
                                //  console.log(checker)

                                return (
                                  <tr key={item.hotel}>
                                    <td className={"text-center"}>
                                      {item.tour_type}
                                    </td>
                                    <td className={"text-center"}>
                                      {this.state.controls[price] !== undefined
                                        ? this.state.controls[price].value
                                        : ""}
                                    </td>
                                    <td className={"text-center"}>
                                      {this.state.controls[currency] !==
                                      undefined
                                        ? this.state.controls[currency].value
                                        : ""}
                                    </td>
                                  </tr>
                                );
                              }
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
                {this.state.fullData.length > 0 && flag ? (
                  <Fragment>
                    <div>
                      <table className={"table table-striped table-bordered"}>
                        <thead>
                          <tr>
                            <th className={"text-center"}>Type</th>
                            <th className={"text-center"}>Hotel</th>
                            <th className={"text-center"}>Duration</th>
                            <th className={"text-center"}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.fullData.map((item, index) => {
                            // console.log(item)
                            if (
                              item !== undefined &&
                              item !== "" &&
                              item !== null
                            ) {
                              let price = `price_${item.tour_type}`;
                              let currency = `currency_${item.tour_type}`;
                              let hotel = item.hotel.split("||");
                              return (
                                <tr key={item.hotel}>
                                  <td className={"text-center"}>
                                    {item.tour_type}
                                  </td>
                                  <td className={"text-center"}>{hotel[1]}</td>
                                  <td className={"text-center"}>
                                    {item.duration}
                                  </td>
                                  <td className={"text-center"}>
                                    <Button
                                      color={"danger"}
                                      onClick={(event) =>
                                        this.removeTourDetail(event, index)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
                {tour}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Resource</CardHeader>
              <CardBody>
                <Row>
                  {this.state.allFeaturedImage.length > 0
                    ? this.state.allFeaturedImage.map((item, index) => {
                        // console.log(item)
                        return (
                          <Col key={item.path} md={"3"}>
                            <h5>Featured image</h5>
                            <div className={"text-center"}>
                              {item.type === "IMAGE" ? (
                                <img
                                  src={this.state.image_base_path + item.path}
                                  height="120"
                                  width="120"
                                />
                              ) : (
                                <video width="120" height="120" controls>
                                  <source src={item.path} type="video/mp4" />
                                  <source src={item.path} type="video/ogg" />
                                </video>
                              )}
                            </div>
                            {/*<div className={'displayNone'}>
                          <Input type={'file'} name="featureInput" onChange={event => this.inputChangeHandler(event,'allFeaturedImage')} value={item.path !== undefined ? this.createFile(item.path) : ''}/>
                        </div>*/}
                            <br />
                            <div className={"text-center"}>
                              <Button
                                size="sm"
                                color={"danger"}
                                onClick={(event) =>
                                  this.removeImage(event, index, "featured")
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </Col>
                        );
                      })
                    : ""}
                  {this.state.allResource.length > 0
                    ? this.state.allResource.map((item, index) => {
                        // console.log(item)
                        return (
                          <Col key={item.path} md={"3"}>
                            <h5>Others image</h5>
                            <div className={"text-center"}>
                              {item.type === "IMAGE" ? (
                                <img
                                  src={this.state.image_base_path + item.path}
                                  height="120"
                                  width="120"
                                />
                              ) : (
                                <video height="120" width="120" controls>
                                  <source src={item.path} type="video/mp4" />
                                  <source src={item.path} type="video/ogg" />
                                </video>
                              )}
                            </div>
                            {/*<div className={'displayNone'}>
                          <Input type={'file'} onChange={event => this.inputChangeHandler(event,'allResource')} name="nonFeatureInput[]" value={item.path}/>
                        </div>*/}
                            <br />
                            <div className={"text-center"}>
                              <Button
                                size="sm"
                                color={"danger"}
                                onClick={(event) =>
                                  this.removeImage(event, index, "not featured")
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </Col>
                        );
                      })
                    : ""}
                </Row>
                <br />
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Featured Image</Label>
                      <Input
                        type="file"
                        id={"featured_image"}
                        onChange={(event) =>
                          this.inputChangeHandler(event, "featured_image")
                        }
                        placeholder="Enter featured file"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="hour">Others</Label>
                      <Input
                        type="file"
                        id={"multiple_files_uploads"}
                        multiple
                        onChange={(event) =>
                          this.inputChangeHandler(event, "resource")
                        }
                        placeholder="Enter file"
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
            <div>
              <div className="text-center">
                <Button onClick={this.editFixedPackageHandle} color="primary">
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

export default editFixedPackage;
