app.controller("roomsController", function ($scope, $http, $timeout) {
  $scope.id = "";
  $scope.searchText = "";
  $scope.propertyLoading = 1;
  $scope.propertyData = {};
  $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
  $scope.uploadMsg = "";

  // $scope.fromDate = ''
  // $scope.toDate = ''
  // $scope.fromDateTemp = ''
  // $scope.toDateTemp = ''
  // $scope.filterAppliedFlag = 0

  function initDate() {
    $(document).ready(function () {
      $("#datepicker").datepicker({
        startDate: new Date(),
        multidate: true,
        format: "mm/dd/yyyy",
        daysOfWeekHighlighted: "5,6",
        datesDisabled: ["31/08/2017"],
        language: "en",
      });
    });
  }

  initDate();

  $scope.showDates = function () {
    $scope.notAvDates = $scope.propertyData.roomNotAvailDates.split(",");
    let tempDate = [];
    for (let i = 0; i < $scope.notAvDates.length; i++) {
      tempDate.push(new Date($scope.notAvDates[i]));
    }
    $("#datepicker").datepicker("setDates", tempDate);
    console.log($scope.notAvDates);
  };

  $scope.populateMultipleInput = function (callFor, index) {
    if (callFor === "popularFacilities") {
      $scope.propertyData.popularFacilities[index].value =
        !$scope.propertyData.popularFacilities[index].value;
    } else if (callFor === "amenities") {
      $scope.propertyData.amenities[index].value =
        !$scope.propertyData.amenities[index].value;
    } else if (callFor === "roomAmenities") {
      $scope.propertyData.roomAmenities[index].value =
        !$scope.propertyData.roomAmenities[index].value;
    } else if (callFor === "mediaTechnology") {
      $scope.propertyData.mediaTechnology[index].value =
        !$scope.propertyData.mediaTechnology[index].value;
    } else if (callFor === "extraServices") {
      $scope.propertyData.extraServices[index].value =
        !$scope.propertyData.extraServices[index].value;
    } else if (callFor === "outdoorView") {
      $scope.propertyData.outdoorView[index].value =
        !$scope.propertyData.outdoorView[index].value;
    } else if (callFor === "accessibility") {
      $scope.propertyData.accessibility[index].value =
        !$scope.propertyData.accessibility[index].value;
    } else if (callFor === "entertainmentAndFamilyServices") {
      $scope.propertyData.entertainmentAndFamilyServices[index].value =
        !$scope.propertyData.entertainmentAndFamilyServices[index].value;
    } else if (callFor === "otherFacilities") {
      $scope.propertyData.otherFacilities[index].value =
        !$scope.propertyData.otherFacilities[index].value;
    } else if (callFor === "onlinePaymentList") {
      $scope.propertyData.onlinePaymentList[index].value =
        !$scope.propertyData.onlinePaymentList[index].value;
    }
  };

  $scope.prepareComplexData = function () {
    $scope.propertyData.mealData = [
      {
        mealName: "",
        isMealAvailable: "",
        mealType: "",
      },
    ];

    $scope.propertyData.priceOffers = [];

    fetch(
      `/ws/getPropertyFacilities?userId=${$scope.sessionInfo.sessionInfo.email}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0][0]);
        $scope.propertyData.popularFacilities = JSON.parse(
          data[0][0].popularFacilities
        );
        $scope.propertyData.amenities = JSON.parse(data[0][0].amenities);
        $scope.propertyData.roomAmenities = JSON.parse(
          data[0][0].roomAmenities
        );
        $scope.propertyData.mediaTechnology = JSON.parse(
          data[0][0].mediaTechnology
        );
        $scope.propertyData.extraServices = JSON.parse(
          data[0][0].extraServices
        );
        $scope.propertyData.outdoorView = JSON.parse(data[0][0].outdoorView);
        $scope.propertyData.accessibility = JSON.parse(
          data[0][0].accessibility
        );
        $scope.propertyData.entertainmentAndFamilyServices = JSON.parse(
          data[0][0].entertainmentAndFamilyServices
        );
        $scope.propertyData.otherFacilities = JSON.parse(
          data[0][0].otherFacilities
        );
      });

    // $scope.propertyData.popularFacilities = [
    //   {
    //     name: "Free WiFi",
    //     value: false,
    //   },
    //   {
    //     name: "Restaurant",
    //     value: false,
    //   },
    //   {
    //     name: "Room service",
    //     value: false,
    //   },
    //   {
    //     name: "Bar",
    //     value: false,
    //   },
    //   {
    //     name: "24-hour front desk",
    //     value: false,
    //   },
    //   {
    //     name: "Fitness center",
    //     value: false,
    //   },
    //   {
    //     name: "Garden",
    //     value: false,
    //   },
    //   {
    //     name: "Terrace",
    //     value: false,
    //   },
    //   {
    //     name: "Non-smoking rooms",
    //     value: false,
    //   },
    //   {
    //     name: "Airport shuttle",
    //     value: false,
    //   },
    //   {
    //     name: "Family rooms",
    //     value: false,
    //   },
    //   {
    //     name: "Spa",
    //     value: false,
    //   },
    //   {
    //     name: "Hot tub/Jacuzzi",
    //     value: false,
    //   },
    //   {
    //     name: "Air conditioning",
    //     value: false,
    //   },
    //   {
    //     name: "Kids club",
    //     value: false,
    //   },
    //   {
    //     name: "Water park",
    //     value: false,
    //   },
    //   {
    //     name: "Swimming pool",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.amenities = [
    //   {
    //     name: "Air conditioning",
    //     value: false,
    //   },
    //   {
    //     name: "Bathtub",
    //     value: false,
    //   },
    //   {
    //     name: "Spa tub",
    //     value: false,
    //   },
    //   {
    //     name: "Flat-screen TV",
    //     value: false,
    //   },
    //   {
    //     name: "Electric kettle",
    //     value: false,
    //   },
    //   {
    //     name: "Balcony View",
    //     value: false,
    //   },
    //   {
    //     name: "Terrace",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.roomAmenities = [
    //   {
    //     name: "Clothes rack",
    //     value: false,
    //   },
    //   {
    //     name: "Drying rack for clothing",
    //     value: false,
    //   },
    //   {
    //     name: "Fold-up bed",
    //     value: false,
    //   },
    //   {
    //     name: "Sofa bed",
    //     value: false,
    //   },
    //   {
    //     name: "Carpeted",
    //     value: false,
    //   },
    //   {
    //     name: "Wardrobe or closet",
    //     value: false,
    //   },
    //   {
    //     name: "Dressing room",
    //     value: false,
    //   },
    //   {
    //     name: "Extra long beds (> 2 metres)",
    //     value: false,
    //   },
    //   {
    //     name: "Fan",
    //     value: false,
    //   },
    //   {
    //     name: "Fireplace",
    //     value: false,
    //   },
    //   {
    //     name: "Heating",
    //     value: false,
    //   },
    //   {
    //     name: "Interconnected room(s) available",
    //     value: false,
    //   },
    //   {
    //     name: "Iron",
    //     value: false,
    //   },
    //   {
    //     name: "Ironing facilities",
    //     value: false,
    //   },
    //   {
    //     name: "Mosquito net",
    //     value: false,
    //   },
    //   {
    //     name: "Private entrance",
    //     value: false,
    //   },
    //   {
    //     name: "Safety deposit box",
    //     value: false,
    //   },
    //   {
    //     name: "Sofa",
    //     value: false,
    //   },
    //   {
    //     name: "Soundproofing",
    //     value: false,
    //   },
    //   {
    //     name: "Seating Area",
    //     value: false,
    //   },
    //   {
    //     name: "Tile/marble floor",
    //     value: false,
    //   },
    //   {
    //     name: "Pants press",
    //     value: false,
    //   },
    //   {
    //     name: "Hardwood or parquet floors",
    //     value: false,
    //   },
    //   {
    //     name: "Desk",
    //     value: false,
    //   },
    //   {
    //     name: "Hypoallergenic",
    //     value: false,
    //   },
    //   {
    //     name: "Cleaning products",
    //     value: false,
    //   },
    //   {
    //     name: "Tile/marble floor",
    //     value: false,
    //   },
    //   {
    //     name: "Toilet paper",
    //     value: false,
    //   },
    //   {
    //     name: "Bath",
    //     value: false,
    //   },
    //   {
    //     name: "Bidet",
    //     value: false,
    //   },
    //   {
    //     name: "Bath or shower",
    //     value: false,
    //   },
    //   {
    //     name: "Bathrobe",
    //     value: false,
    //   },
    //   {
    //     name: "Private bathroom",
    //     value: false,
    //   },
    //   {
    //     name: "Free toiletries",
    //     value: false,
    //   },
    //   {
    //     name: "Hairdryer",
    //     value: false,
    //   },
    //   {
    //     name: "Spa bath",
    //     value: false,
    //   },
    //   {
    //     name: "Shared bathroom",
    //     value: false,
    //   },
    //   {
    //     name: "Shower",
    //     value: false,
    //   },
    //   {
    //     name: "Slippers",
    //     value: false,
    //   },
    //   {
    //     name: "Toilet",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.mediaTechnology = [
    //   {
    //     name: "Computer",
    //     value: false,
    //   },
    //   {
    //     name: "Game console",
    //     value: false,
    //   },
    //   {
    //     name: "Game console – Nintendo Wii",
    //     value: false,
    //   },
    //   {
    //     name: "Game console – PS2",
    //     value: false,
    //   },
    //   {
    //     name: "Game console – PS3",
    //     value: false,
    //   },
    //   {
    //     name: "Game console – Xbox 360",
    //     value: false,
    //   },
    //   {
    //     name: "Laptop",
    //     value: false,
    //   },
    //   {
    //     name: "iPad",
    //     value: false,
    //   },
    //   {
    //     name: "Cable channels",
    //     value: false,
    //   },
    //   {
    //     name: "CD player",
    //     value: false,
    //   },
    //   {
    //     name: "DVD player",
    //     value: false,
    //   },
    //   {
    //     name: "Fax",
    //     value: false,
    //   },
    //   {
    //     name: "iPod dock",
    //     value: false,
    //   },
    //   {
    //     name: "Laptop safe",
    //     value: false,
    //   },
    //   {
    //     name: "Flat-screen TV",
    //     value: false,
    //   },
    //   {
    //     name: "Pay-per-view channels",
    //     value: false,
    //   },
    //   {
    //     name: "Radio",
    //     value: false,
    //   },
    //   {
    //     name: "Satellite channels",
    //     value: false,
    //   },
    //   {
    //     name: "Telephone",
    //     value: false,
    //   },
    //   {
    //     name: "TV",
    //     value: false,
    //   },
    //   {
    //     name: "Video",
    //     value: false,
    //   },
    //   {
    //     name: "Video games",
    //     value: false,
    //   },
    //   {
    //     name: "Blu-ray player",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.extraServices = [
    //   {
    //     name: "Executive Lounge Access",
    //     value: false,
    //   },
    //   {
    //     name: "Alarm clock",
    //     value: false,
    //   },
    //   {
    //     name: "Wake-up service",
    //     value: false,
    //   },
    //   {
    //     name: "Wake up service/Alarm clock",
    //     value: false,
    //   },
    //   {
    //     name: "Linen",
    //     value: false,
    //   },
    //   {
    //     name: "Towels/sheets (extra fee)",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.outdoorView = [
    //   {
    //     name: "Balcony",
    //     value: false,
    //   },
    //   {
    //     name: "Patio View",
    //     value: false,
    //   },
    //   {
    //     name: "Terrace",
    //     value: false,
    //   },
    //   {
    //     name: "City View",
    //     value: false,
    //   },
    //   {
    //     name: "Garden View",
    //     value: false,
    //   },
    //   {
    //     name: "Lake View",
    //     value: false,
    //   },
    //   {
    //     name: "Landmark View",
    //     value: false,
    //   },
    //   {
    //     name: "Mountain view",
    //     value: false,
    //   },
    //   {
    //     name: "Pool view",
    //     value: false,
    //   },
    //   {
    //     name: "River view",
    //     value: false,
    //   },
    //   {
    //     name: "Sea view",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.accessibility = [
    //   {
    //     name: "Room is situated on the ground floor",
    //     value: false,
    //   },
    //   {
    //     name: "Room is entirely wheelchair accessible",
    //     value: false,
    //   },
    //   {
    //     name: "Upper floors accessible by elevator",
    //     value: false,
    //   },
    //   {
    //     name: "Upper floors accessible by stairs only",
    //     value: false,
    //   },
    //   {
    //     name: "Toilet with grab rails",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.entertainmentAndFamilyServices = [
    //   {
    //     name: "Baby safety gates",
    //     value: false,
    //   },
    //   {
    //     name: "Board games/puzzles",
    //     value: false,
    //   },
    //   {
    //     name: "Books, DVDs, or music for children",
    //     value: false,
    //   },
    //   {
    //     name: "Child safety socket covers",
    //     value: false,
    //   },
    // ];

    // $scope.propertyData.otherFacilities = [
    //   {
    //     name: "Bath/Hot spring",
    //     value: false,
    //   },
    //   {
    //     name: "Safety & security",
    //     value: false,
    //   },
    //   {
    //     name: "Safety features",
    //     value: false,
    //   },
    //   {
    //     name: "Physical distancing",
    //     value: false,
    //   },
    //   {
    //     name: "Cleanliness & disinfecting",
    //     value: false,
    //   },
    // ];

    $scope.propertyData.onlinePaymentList = [
      {
        name: "American Express",
        value: false,
      },
      {
        name: "Visa",
        value: false,
      },
      {
        name: "Euro/Mastercard",
        value: false,
      },
      {
        name: "Diners Club",
        value: false,
      },
      {
        name: "JCB",
        value: false,
      },
      {
        name: "Maestro",
        value: false,
      },
      {
        name: "Discover",
        value: false,
      },
      {
        name: "UnionPay debit card",
        value: false,
      },
      {
        name: "UnionPay credit card",
        value: false,
      },
    ];

    $scope.propertyData.images = [];
  };

  $scope.prepareComplexData();

  $scope.pushMealData = function () {
    let tempObj = {
      mealName: "",
      isMealAvailable: "",
      mealType: "",
    };
    $scope.propertyData.mealData.unshift(tempObj);
  };

  $scope.pushPriceOffer = function () {
    let tempObj = {
      name: "",
      price: 0,
      description: "",
    };
    $scope.propertyData.priceOffers.unshift(tempObj);
  };

  $scope.addEditProperty = async function (callFrom, property) {
    $("#propertyModal").modal({
      backdrop: "static",
      keyboard: false,
    });
    if (callFrom == "addShow") {
      $scope.propertyModalTitle = "Add Room";
      $scope.propertyModalBtnTxt = "Add";
      $("#propertyModal").modal("show");
      $("#datepicker").datepicker("setDates", []);
    } else if (callFrom == "editShow") {
      $scope.propertyModalTitle = "Edit Room";
      $scope.propertyModalBtnTxt = "Save";
      $scope.propertyData = property;
      try {
        $scope.showDates();
      } catch (e) {
        $scope.notAvDates = [];
        console.log(e);
      }
      $("#propertyModal").modal("show");
    } else if (callFrom == "addEdit") {
      var addEditUrl = "";
      if ($scope.propertyModalTitle == "Add Room") {
        addEditUrl = "/ws/addProperty";
      } else if ($scope.propertyModalTitle == "Edit Room") {
        addEditUrl = "/ws/updateProperty?propertyId=" + $scope.propertyData.id;
      }

      if ($scope.propertyData.images.length == 0) {
        $scope.uploadMsg = "Please upload at least one image";
      } else {
        let response = await axios.post(addEditUrl, $scope.propertyData);
        response = response.data[0][0];
        if (response.result === "+success") {
          $("#propertyModal").modal("hide");
          console.log($scope.propertyData);
          $scope.propertyData = {};
          $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
          $scope.getAllPropertyList();
          $scope.prepareComplexData();
        }
      }

      $timeout(function () {
        $scope.uploadMsg = "";
      }, 600);
    }
  };

  $scope.getAllPropertyList = function () {
    $scope.propertyLoading = 1;
    $http
      .get(
        "/ws/getAllProperties?userId=" +
          $scope.sessionInfo.sessionInfo.email +
          "&query=" +
          $scope.searchText
      )
      .then(function (response) {
        $scope.allProperties = response.data[0];
        for (let i = 0; i < $scope.allProperties.length; i++) {
          try {
            $scope.allProperties[i].mealData = JSON.parse(
              $scope.allProperties[i].mealData
            );
            $scope.allProperties[i].priceOffers = JSON.parse(
              $scope.allProperties[i].priceOffers
            );
            $scope.allProperties[i].popularFacilities = JSON.parse(
              $scope.allProperties[i].popularFacilities
            );
            $scope.allProperties[i].amenities = JSON.parse(
              $scope.allProperties[i].amenities
            );
            $scope.allProperties[i].roomAmenities = JSON.parse(
              $scope.allProperties[i].roomAmenities
            );
            $scope.allProperties[i].mediaTechnology = JSON.parse(
              $scope.allProperties[i].mediaTechnology
            );
            $scope.allProperties[i].extraServices = JSON.parse(
              $scope.allProperties[i].extraServices
            );
            $scope.allProperties[i].outdoorView = JSON.parse(
              $scope.allProperties[i].outdoorView
            );
            $scope.allProperties[i].accessibility = JSON.parse(
              $scope.allProperties[i].accessibility
            );
            $scope.allProperties[i].entertainmentAndFamilyServices = JSON.parse(
              $scope.allProperties[i].entertainmentAndFamilyServices
            );
            $scope.allProperties[i].otherFacilities = JSON.parse(
              $scope.allProperties[i].otherFacilities
            );
            $scope.allProperties[i].onlinePaymentList = JSON.parse(
              $scope.allProperties[i].onlinePaymentList
            );
            $scope.allProperties[i].images = JSON.parse(
              $scope.allProperties[i].images
            );
          } catch (e) {
            console.log(e);
          }
        }
        $scope.propertyLoading = 0;
      });
  };

  $scope.getAllPropertyList();

  $scope.deleteProperty = function (callFrom, propertyId) {
    $("#deleteModal").modal({
      backdrop: "static",
      keyboard: false,
    });
    if (callFrom == "warning") {
      $scope.id = propertyId;
      $("#deleteModal").modal("show");
    } else if (callFrom == "delete") {
      $http({
        url: "/ws/deleteProperty",
        method: "POST",
        data: {
          propertyId: $scope.id,
        },
      }).then(
        function (response) {
          if (response.data[0][0].result == "+success") {
            $scope.getAllPropertyList();
            $("#deleteModal").modal("hide");
          } else {
          }
        },
        function (response) {
          // optional
          console.log(response);
        }
      );
    }
  };

  $scope.clearModal = function () {
    $scope.propertyData = {};
    $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
    $scope.prepareComplexData();
    $scope.notAvDates = [];
  };

  $scope.showDetails = function (property) {
    $scope.propertyData = JSON.parse(JSON.stringify(property));
    $scope.propertyModalTitle = "Property details";
    $scope.propertyModalBtnTxt = "Details";
    $("#propertyModal").modal("show");
  };

  $scope.mapAddress = function () {
    if ($scope.propertyData.sameInvoiceAddress === "Yes") {
      $scope.propertyData.invoiceStreetAddress =
        $scope.propertyData.streetAddress;
      $scope.propertyData.invoiceAddressLineTwo =
        $scope.propertyData.addressLine;
      $scope.propertyData.invoiceCountry = $scope.propertyData.country;
      $scope.propertyData.invoiceCity = $scope.propertyData.city;
      $scope.propertyData.invoiceState = $scope.propertyData.state;
      $scope.propertyData.invoiceZipCode = $scope.propertyData.zipCode;
    } else {
      $scope.propertyData.invoiceStreetAddress = "";
      $scope.propertyData.invoiceAddressLineTwo = "";
      $scope.propertyData.invoiceCountry = "";
      $scope.propertyData.invoiceCity = "";
      $scope.propertyData.invoiceState = "";
      $scope.propertyData.invoiceZipCode = "";
    }
  };

  $scope.uploadPicture = async function () {
    let uploadedFile = document.getElementById("uploadedFile");
    let body = new FormData();
    body.append("uploadedFile", uploadedFile.files[0]);
    let url = "/content/upload";
    let response = await axios.post(url, body);
    if (response.data[0].message === "Upload Successful") {
      let tempObj = {
        url: `/content${response.data[0].fileName}`,
      };
      $scope.$apply(function () {
        $scope.propertyData.images.push(tempObj);
      });
    }
    console.log($scope.propertyData.images);
  };

  // $scope.doFilter = function (callFrom) {
  //     if (callFrom == 'show') {
  //         $('#filterModal').modal('show');
  //     }
  //     else if (callFrom == 'apply') {
  //         if ($scope.fromDate != '') {
  //             $scope.fromDateTemp = $scope.fromDate.setDate($scope.fromDate.getDate());
  //             $scope.fromDateTemp = new Date($scope.fromDateTemp).toLocaleDateString();
  //         }
  //         if ($scope.toDate != '') {
  //             $scope.toDateTemp = $scope.toDate.setDate($scope.toDate.getDate() + 1);
  //             $scope.toDateTemp = new Date($scope.toDateTemp).toLocaleDateString();
  //         }
  //         console.log($scope.fromDateTemp);
  //         console.log($scope.toDateTemp);
  //     }
  //     else if (callFrom == 'finalApply') {
  //         $http.get("/ws/applyFilter?source=supplier&fromDate=" + $scope.fromDateTemp + '&toDate=' + $scope.toDateTemp)
  //             .then(function (response) {
  //                 $scope.allSuppliers = response.data;
  //                 $('#filterModal').modal('hide');
  //                 $scope.filterAppliedFlag = 1;
  //             });
  //     }
  // }

  // $scope.getMapLocation = function () {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       $scope.propertyData.lat = position.coords.latitude;
  //       $scope.propertyData.lng = position.coords.longitude;
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };
});
