app.controller("transportsController", function ($scope, $http, $timeout) {
  $scope.id = "";
  $scope.searchText = "";
  $scope.propertyLoading = 1;
  $scope.propertyData = {};
  $scope.propertyData.userId = $scope.sessionInfo.sessionInfo.email;
  $scope.uploadMsg = "";

  $scope.prepareComplexData = function () {
    fetch(`/ws/getTransport?userId=${$scope.sessionInfo.sessionInfo.email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
      });
  };
  console.log($scope.prepareComplexData);

  $scope.addEditProperty = async function (callFrom, property) {
    $("#propertyModal").modal({
      backdrop: "static",
      keyboard: false,
    });

    if (callFrom == "addShow") {
      $scope.transportModalTitle = "Add Transport";
      $scope.propertyModalBtnTxt = "Add";
      $("#propertyModal").modal("show");
    } else if (callFrom == "editShow") {
      $scope.transportModalTitle = "Edit Transport";
      $scope.propertyModalBtnTxt = "Save";
      $scope.propertyData = property;
      $("#propertyModal").modal("show");
    } else if (callFrom == "addEdit") {
      var addEditUrl = "";
      if ($scope.transportModalTitle == "Add Transport") {
        addEditUrl =
          "/ws/addTransport?userId=" + $scope.sessionInfo.sessionInfo.email;
      } else if ($scope.transportModalTitle == "Edit Transport") {
        addEditUrl = "/ws/editTransport?transportId=" + $scope.propertyData.id;
      }
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

      $timeout(function () {
        $scope.uploadMsg = "";
      }, 600);
    }
  };

  $scope.getAllPropertyList = function () {
    $scope.propertyLoading = 1;
    $http
      .get("/ws/getTransport?userId=" + $scope.sessionInfo.sessionInfo.email)
      .then(function (response) {
        $scope.allProperties = response.data[0];
        $scope.propertyLoading = 0;
      });
  };

  $scope.getAllPropertyList();
  console.log($scope.getAllPropertyList);

  $scope.deleteProperty = function (callFrom, transportId) {
    $("#deleteModal").modal({
      backdrop: "static",
      keyboard: false,
    });
    if (callFrom == "warning") {
      $scope.id = transportId;
      $("#deleteModal").modal("show");
    } else if (callFrom == "delete") {
      $http({
        url:
          "/ws/deleteTransport?userId=" + $scope.sessionInfo.sessionInfo.email,
        method: "POST",
        data: {
          transportId: $scope.id,
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
    $scope.transportModalTitle = "Property details";
    $scope.propertyModalBtnTxt = "Details";
    $("#propertyModal").modal("show");
  };
});
