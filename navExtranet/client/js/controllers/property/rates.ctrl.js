app.controller("ratesController", function ($scope, $http, $timeout) {
  $scope.id = "";
  $scope.searchText = "";
  $scope.rateLoading = 1;
  $scope.rates = {};
  $scope.rates.userId = $scope.sessionInfo.sessionInfo.email;
  $scope.rooms = [];

  $scope.prepareComplexData = function () {
    $scope.rates.rateData = [
      {
        day: "Sun",
        basePrice: "",
        tax: "",
      },
      {
        day: "Mon",
        basePrice: "",
        tax: "",
      },
      {
        day: "Tue",
        basePrice: "",
        tax: "",
      },
      {
        day: "Wed",
        basePrice: "",
        tax: "",
      },
      {
        day: "Thu",
        basePrice: "",
        tax: "",
      },
      {
        day: "Fri",
        basePrice: "",
        tax: "",
      },
      {
        day: "Sat",
        basePrice: "",
        tax: "",
      },
    ];
  };

  $scope.prepareComplexData();

  $scope.addEditRate = async function (callFrom, rate) {
    $("#propertyModal").modal({
      backdrop: "static",
      keyboard: false,
    });
    if (callFrom == "addShow") {
      $scope.propertyModalTitle = "Add Rate";
      $scope.propertyModalBtnTxt = "Add";
      $("#propertyModal").modal("show");
    } else if (callFrom == "editShow") {
      $scope.propertyModalTitle = "Edit Rate";
      $scope.propertyModalBtnTxt = "Save";
      $scope.rates = JSON.parse(JSON.stringify(rate));
      $scope.rates.id = String($scope.rates.id);
      console.log($scope.rates);
      $("#propertyModal").modal("show");
    } else if (callFrom == "addEdit") {
      var addEditUrl = "";
      if (
        $scope.propertyModalTitle == "Add Rate" ||
        $scope.propertyModalTitle == "Edit Rate"
      ) {
        addEditUrl = "/ws/addRate";
      }
      let response = await axios.post(addEditUrl, $scope.rates);
      response = response.data[0][0];
      if (response.result === "+success") {
        $("#propertyModal").modal("hide");
        $scope.rates = {};
        $scope.rates.userId = $scope.sessionInfo.sessionInfo.email;
        $scope.getAllRateList();
        $scope.prepareComplexData();
      }
    }
  };

  $scope.getAllRateList = function () {
    $scope.rateLoading = 1;
    $scope.rooms = [];
    $http
      .get(
        "/ws/getAllRates?userId=" +
          $scope.sessionInfo.sessionInfo.email +
          "&query=" +
          $scope.searchText
      )
      .then(function (response) {
        $scope.allRates = response.data[0];
        for (let i = 0; i < $scope.allRates.length; i++) {
          try {
            $scope.allRates[i].rateData = JSON.parse(
              $scope.allRates[i].rateData
            );
            if (!$scope.allRates[i].rateData) {
              $scope.rooms.push($scope.allRates[i]);
            }
          } catch (e) {
            console.log(e);
          }
        }
        $scope.rateLoading = 0;
      });
  };

  $scope.getAllRateList();

  $scope.deleteProperty = function (callFrom, rateId) {
    $("#deleteModal").modal({
      backdrop: "static",
      keyboard: false,
    });
    if (callFrom == "warning") {
      $scope.id = rateId;
      $("#deleteModal").modal("show");
    } else if (callFrom == "delete") {
      $http({
        url: "/ws/addRate",
        method: "POST",
        data: {
          id: $scope.id,
          rateData: null,
        },
      }).then(
        function (response) {
          if (response.data[0][0].result == "+success") {
            $scope.getAllRateList();
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
    $scope.rates = {};
    $scope.rates.userId = $scope.sessionInfo.sessionInfo.email;
    $scope.prepareComplexData();
  };
});
