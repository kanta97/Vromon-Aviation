app.controller("propertiesController", function ($scope, $http, $timeout) {
  $scope.id = "";
  $scope.searchText = "";
  $scope.propertyLoading = 0;
  $scope.propertyData = {};
  $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
  $scope.uploadMsg = "";
  $scope.propertySaveLoading = false;
  $scope.editMode = true;
  $scope.modeName = "Edit";
  $scope.isClickEnable = true;
  $scope.reachedLimit = false;

  // $scope.fromDate = ''
  // $scope.toDate = ''
  // $scope.fromDateTemp = ''
  // $scope.toDateTemp = ''
  // $scope.filterAppliedFlag = 0

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
    } else if (callFor === "topTenTags") {
      $scope.propertyData.topTenTags[index].value =
        !$scope.propertyData.topTenTags[index].value;
      doTopTenCount();
      if ($scope.reachedLimit) {
        alert("You have reached at maximum limit 10!");
        $scope.propertyData.topTenTags[index].value =
          !$scope.propertyData.topTenTags[index].value;
      }
    }
  };

  function doTopTenCount() {
    $scope.topTenTagsCount = 0;
    for (let i = 0; i < $scope.propertyData.topTenTags.length; i++) {
      if ($scope.topTenTagsCount <= 10) {
        if ($scope.propertyData.topTenTags[i].value) {
          $scope.topTenTagsCount = $scope.topTenTagsCount + 1;
        }
      } else {
        $scope.topTenTagsCount = 10;
        $scope.reachedLimit = true;
      }
    }
  }

  $scope.prepareComplexData = function () {
    $scope.propertyData.popularFacilities = [
      {
        name: "Free WiFi",
        value: false,
      },
      {
        name: "Restaurant",
        value: false,
      },
      {
        name: "Room service",
        value: false,
      },
      {
        name: "Bar",
        value: false,
      },
      {
        name: "24-hour front desk",
        value: false,
      },
      {
        name: "Fitness center",
        value: false,
      },
      {
        name: "Garden",
        value: false,
      },
      {
        name: "Terrace",
        value: false,
      },
      {
        name: "Non-smoking rooms",
        value: false,
      },
      {
        name: "Airport shuttle",
        value: false,
      },
      {
        name: "Family rooms",
        value: false,
      },
      {
        name: "Spa",
        value: false,
      },
      {
        name: "Hot tub/Jacuzzi",
        value: false,
      },
      {
        name: "Air conditioning",
        value: false,
      },
      {
        name: "Kids club",
        value: false,
      },
      {
        name: "Water park",
        value: false,
      },
      {
        name: "Swimming pool",
        value: false,
      },
    ];

    $scope.propertyData.amenities = [
      {
        name: "Air conditioning",
        value: false,
      },
      {
        name: "Bathtub",
        value: false,
      },
      {
        name: "Spa tub",
        value: false,
      },
      {
        name: "Flat-screen TV",
        value: false,
      },
      {
        name: "Electric kettle",
        value: false,
      },
      {
        name: "Balcony View",
        value: false,
      },
      {
        name: "Terrace",
        value: false,
      },
    ];

    $scope.propertyData.roomAmenities = [
      {
        name: "Clothes rack",
        value: false,
      },
      {
        name: "Drying rack for clothing",
        value: false,
      },
      {
        name: "Fold-up bed",
        value: false,
      },
      {
        name: "Sofa bed",
        value: false,
      },
      {
        name: "Carpeted",
        value: false,
      },
      {
        name: "Wardrobe or closet",
        value: false,
      },
      {
        name: "Dressing room",
        value: false,
      },
      {
        name: "Extra long beds (> 2 metres)",
        value: false,
      },
      {
        name: "Fan",
        value: false,
      },
      {
        name: "Fireplace",
        value: false,
      },
      {
        name: "Heating",
        value: false,
      },
      {
        name: "Interconnected room(s) available",
        value: false,
      },
      {
        name: "Iron",
        value: false,
      },
      {
        name: "Ironing facilities",
        value: false,
      },
      {
        name: "Mosquito net",
        value: false,
      },
      {
        name: "Private entrance",
        value: false,
      },
      {
        name: "Safety deposit box",
        value: false,
      },
      {
        name: "Sofa",
        value: false,
      },
      {
        name: "Soundproofing",
        value: false,
      },
      {
        name: "Seating Area",
        value: false,
      },
      {
        name: "Tile/marble floor",
        value: false,
      },
      {
        name: "Pants press",
        value: false,
      },
      {
        name: "Hardwood or parquet floors",
        value: false,
      },
      {
        name: "Desk",
        value: false,
      },
      {
        name: "Hypoallergenic",
        value: false,
      },
      {
        name: "Cleaning products",
        value: false,
      },
      {
        name: "Tile/marble floor",
        value: false,
      },
      {
        name: "Toilet paper",
        value: false,
      },
      {
        name: "Bath",
        value: false,
      },
      {
        name: "Bidet",
        value: false,
      },
      {
        name: "Bath or shower",
        value: false,
      },
      {
        name: "Bathrobe",
        value: false,
      },
      {
        name: "Private bathroom",
        value: false,
      },
      {
        name: "Free toiletries",
        value: false,
      },
      {
        name: "Hairdryer",
        value: false,
      },
      {
        name: "Spa bath",
        value: false,
      },
      {
        name: "Shared bathroom",
        value: false,
      },
      {
        name: "Shower",
        value: false,
      },
      {
        name: "Slippers",
        value: false,
      },
      {
        name: "Toilet",
        value: false,
      },
    ];

    $scope.propertyData.mediaTechnology = [
      {
        name: "Computer",
        value: false,
      },
      {
        name: "Game console",
        value: false,
      },
      {
        name: "Game console – Nintendo Wii",
        value: false,
      },
      {
        name: "Game console – PS2",
        value: false,
      },
      {
        name: "Game console – PS3",
        value: false,
      },
      {
        name: "Game console – Xbox 360",
        value: false,
      },
      {
        name: "Laptop",
        value: false,
      },
      {
        name: "iPad",
        value: false,
      },
      {
        name: "Cable channels",
        value: false,
      },
      {
        name: "CD player",
        value: false,
      },
      {
        name: "DVD player",
        value: false,
      },
      {
        name: "Fax",
        value: false,
      },
      {
        name: "iPod dock",
        value: false,
      },
      {
        name: "Laptop safe",
        value: false,
      },
      {
        name: "Flat-screen TV",
        value: false,
      },
      {
        name: "Pay-per-view channels",
        value: false,
      },
      {
        name: "Radio",
        value: false,
      },
      {
        name: "Satellite channels",
        value: false,
      },
      {
        name: "Telephone",
        value: false,
      },
      {
        name: "TV",
        value: false,
      },
      {
        name: "Video",
        value: false,
      },
      {
        name: "Video games",
        value: false,
      },
      {
        name: "Blu-ray player",
        value: false,
      },
    ];

    $scope.propertyData.extraServices = [
      {
        name: "Executive Lounge Access",
        value: false,
      },
      {
        name: "Alarm clock",
        value: false,
      },
      {
        name: "Wake-up service",
        value: false,
      },
      {
        name: "Wake up service/Alarm clock",
        value: false,
      },
      {
        name: "Linen",
        value: false,
      },
      {
        name: "Towels/sheets (extra fee)",
        value: false,
      },
    ];

    $scope.propertyData.outdoorView = [
      {
        name: "Balcony",
        value: false,
      },
      {
        name: "Patio View",
        value: false,
      },
      {
        name: "Terrace",
        value: false,
      },
      {
        name: "City View",
        value: false,
      },
      {
        name: "Garden View",
        value: false,
      },
      {
        name: "Lake View",
        value: false,
      },
      {
        name: "Landmark View",
        value: false,
      },
      {
        name: "Mountain view",
        value: false,
      },
      {
        name: "Pool view",
        value: false,
      },
      {
        name: "River view",
        value: false,
      },
      {
        name: "Sea view",
        value: false,
      },
    ];

    $scope.propertyData.accessibility = [
      {
        name: "Room is situated on the ground floor",
        value: false,
      },
      {
        name: "Room is entirely wheelchair accessible",
        value: false,
      },
      {
        name: "Upper floors accessible by elevator",
        value: false,
      },
      {
        name: "Upper floors accessible by stairs only",
        value: false,
      },
      {
        name: "Toilet with grab rails",
        value: false,
      },
    ];

    $scope.propertyData.entertainmentAndFamilyServices = [
      {
        name: "Baby safety gates",
        value: false,
      },
      {
        name: "Board games/puzzles",
        value: false,
      },
      {
        name: "Books, DVDs, or music for children",
        value: false,
      },
      {
        name: "Child safety socket covers",
        value: false,
      },
    ];

    $scope.propertyData.otherFacilities = [
      {
        name: "Bath/Hot spring",
        value: false,
      },
      {
        name: "Safety & security",
        value: false,
      },
      {
        name: "Safety features",
        value: false,
      },
      {
        name: "Physical distancing",
        value: false,
      },
      {
        name: "Cleanliness & disinfecting",
        value: false,
      },
    ];

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
    $scope.propertyData.thumbnail = [];
    $scope.propertyData.topTenTags = [];
    $scope.propertyData.topTenTags = [
      ...$scope.propertyData.popularFacilities,
      ...$scope.propertyData.amenities,
      ...$scope.propertyData.roomAmenities,
      ...$scope.propertyData.mediaTechnology,
      ...$scope.propertyData.extraServices,
      ...$scope.propertyData.outdoorView,
      ...$scope.propertyData.accessibility,
      ...$scope.propertyData.entertainmentAndFamilyServices,
      ...$scope.propertyData.otherFacilities,
    ];
  };

  $scope.prepareComplexData();
  $scope.populateMultipleInput();

  $scope.addAlldetails = async function (callFrom) {
    console.log($scope.propertyData);
    if (callFrom == "Save") {
      $scope.propertySaveLoading = true;
      $scope.forDisable("disable");
      let addUrl = "/ws/updatePropertyDetails";
      let response = await axios.post(addUrl, $scope.propertyData);
      response = response.data[0][0];
      console.log(response);
      if (response.result === "+success") {
        $scope.propertySaveLoading = false;
        $scope.propertyLoading = 0;
        $scope.getAllPropertyList();
        $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
        $scope.modeName = "Edit";
      } else {
        $scope.forDisable("enable");
      }
      $timeout(function () {
        $scope.uploadMsg = "";
      }, 600);
    } else if (callFrom === "Edit") {
      $scope.modeName = "Save";
      $scope.forDisable("enable");
    }
  };

  // console.log($scope.propertyData);

  $scope.getAllPropertyList = function () {
    $scope.propertyLoading = 0;
    $http
      .get(
        "/ws/getPropertyDetails?userId=" + $scope.sessionInfo.sessionInfo.email
      )
      .then(function (response) {
        let pFaci = $scope.propertyData.popularFacilities;
        let amenities = $scope.propertyData.amenities;
        let rAmenities = $scope.propertyData.roomAmenities;
        let mTechnology = $scope.propertyData.mediaTechnology;
        let eServices = $scope.propertyData.extraServices;
        let outView = $scope.propertyData.outdoorView;
        let accessibility = $scope.propertyData.accessibility;
        let eAndFServices = $scope.propertyData.entertainmentAndFamilyServices;
        let oFacilities = $scope.propertyData.otherFacilities;
        let topTags = $scope.propertyData.topTenTags;
        $scope.propertyData = response.data[0][0];
        if (
          !response.data[0][0].amenities &&
          !response.data[0][0].popularFacilities &&
          !response.data[0][0].roomAmenities &&
          !response.data[0][0].mediaTechnology &&
          !response.data[0][0].extraServices &&
          !response.data[0][0].outdoorView &&
          !response.data[0][0].accessibility &&
          !response.data[0][0].entertainmentAndFamilyServices &&
          !response.data[0][0].otherFacilities
        ) {
          $scope.propertyData.popularFacilities = pFaci;
          $scope.propertyData.amenities = amenities;
          $scope.propertyData.roomAmenities = rAmenities;
          $scope.propertyData.mediaTechnology = mTechnology;
          $scope.propertyData.extraServices = eServices;
          $scope.propertyData.outdoorView = outView;
          $scope.propertyData.accessibility = accessibility;
          $scope.propertyData.entertainmentAndFamilyServices = eAndFServices;
          $scope.propertyData.otherFacilities = oFacilities;
        } else {
          $scope.propertyData.popularFacilities = JSON.parse(
            response.data[0][0].popularFacilities
          );
          $scope.propertyData.amenities = JSON.parse(
            response.data[0][0].amenities
          );
          $scope.propertyData.roomAmenities = JSON.parse(
            response.data[0][0].roomAmenities
          );
          $scope.propertyData.mediaTechnology = JSON.parse(
            response.data[0][0].mediaTechnology
          );
          $scope.propertyData.extraServices = JSON.parse(
            response.data[0][0].extraServices
          );
          $scope.propertyData.outdoorView = JSON.parse(
            response.data[0][0].outdoorView
          );
          $scope.propertyData.accessibility = JSON.parse(
            response.data[0][0].accessibility
          );
          $scope.propertyData.entertainmentAndFamilyServices = JSON.parse(
            response.data[0][0].entertainmentAndFamilyServices
          );
          $scope.propertyData.otherFacilities = JSON.parse(
            response.data[0][0].otherFacilities
          );
        }
        if (!response.data[0][0].topTenTags) {
          $scope.propertyData.topTenTags = topTags;
          doTopTenCount();
        } else {
          $scope.propertyData.topTenTags = JSON.parse(
            response.data[0][0].topTenTags
          );
          doTopTenCount();
        }

        $scope.propertyData.images = JSON.parse($scope.propertyData.images);
        $scope.propertyData.thumbnail = JSON.parse(
          $scope.propertyData.thumbnail
        );
      });
  };

  $scope.getAllPropertyList();

  $scope.uploadPictureThum = async function () {
    let uploadedFile = document.getElementById("uploadedFileThum");
    let body = new FormData();
    body.append("uploadedFile", uploadedFile.files[0]);
    let url = "/content/upload";
    let response = await axios.post(url, body);
    if (response.data[0].message === "Upload Successful") {
      let tempObj = {
        url: `/content${response.data[0].fileName}`,
      };
      $scope.$apply(function () {
        if (!$scope.propertyData.thumbnail) {
          $scope.propertyData.thumbnail = [];
        }
        $scope.propertyData.thumbnail.push(tempObj);
      });
    }
    console.log($scope.propertyData.thumbnail);
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
        if (!$scope.propertyData.images) {
          $scope.propertyData.images = [];
        }
        $scope.propertyData.images.push(tempObj);
      });
    }
    console.log($scope.propertyData.images);
  };

  $scope.getMapLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.propertyData.lat = position.coords.latitude;
        $scope.propertyData.lng = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  document.getElementById("propertyName").disabled = true;
  document.getElementById("propertyAddressStreet2").disabled = true;
  document.getElementById("lat").disabled = true;
  document.getElementById("lng").disabled = true;

  $scope.forDisable = function (callFor) {
    if (callFor === "enable") {
      document.getElementById("propertyName").disabled = false;
      document.getElementById("propertyAddressStreet2").disabled = false;
      document.getElementById("lat").disabled = false;
      document.getElementById("lng").disabled = false;
      document.getElementById("uploadedFileThum").disabled = false;
      document.getElementById("uploadedFile").disabled = false;
      document.getElementById("select-option").disabled = false;
      $scope.isClickEnable = false;
      const demoClasses = document.querySelectorAll(".not-allowed");
      demoClasses.forEach((element) => {
        element.style.setProperty("cursor", "pointer", "important");
      });
    } else if (callFor === "disable") {
      document.getElementById("propertyName").disabled = true;
      document.getElementById("propertyAddressStreet2").disabled = true;
      document.getElementById("lat").disabled = true;
      document.getElementById("lng").disabled = true;
      document.getElementById("uploadedFileThum").disabled = true;
      document.getElementById("uploadedFile").disabled = true;
      document.getElementById("select-option").disabled = true;
      $scope.isClickEnable = true;
      const demoClasses = document.querySelectorAll(".not-allowed");
      demoClasses.forEach((element) => {
        element.style.setProperty("cursor", "not-allowed", "important");
      });
    }
  };
});
