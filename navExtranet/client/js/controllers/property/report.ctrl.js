app.controller("reportController", function ($scope, $http) {
  $scope.reportLoading = 0;
  $scope.searchText = "";
  $scope.count = 0;
  $scope.fromDateF = "08-07-2022";
  $scope.toDateF = "08-17-2022";
  // document.getElementById("fromDate").value = $scope.fromDateF;
  // document.getElementById("toDate").value = $scope.toDateF;
  // form Date
  $scope.formDatePick = function () {
    console.log($scope.formDate.value);
  };

  $scope.formDate = {
    value: "",
  };

  // to date
  $scope.toDatePick = function () {
    console.log($scope.toDate.value);
  };

  $scope.toDate = {
    value: "",
  };
  $scope.exportedData = function () {
    alasql(
      'SELECT id ID, roomName RoomName, totalAmount TotalAmount, totalDays TotalDays, totalRoom TotalRoom, checkInDate CheckInDate, checkOutDate CheckOutDate INTO XLSX("Report.xlsx",{headers:true}) FROM ?',
      [$scope.allBookingList]
    );
  };

  $scope.applyFilter = function () {
    $scope.fromDateF = document.getElementById("fromDate").value;
    $scope.toDateF = document.getElementById("toDate").value;
    $scope.getAllBookingList();
    console.log($scope.fromDateF);
    console.log($scope.toDateF);
  };

  $scope.getAllBookingList = function () {
    $scope.reportLoading = 1;
    let partnerId = localStorage.getItem("email");
    $http
      .get(
        "/ws/getAllBookingListByDate?fromDate=" +
          $scope.fromDateF +
          "&toDate=" +
          $scope.toDateF +
          "&partnerId=" +
          partnerId +
          "&query=" +
          $scope.searchText
      )
      .then(function (response) {
        $scope.allBookingList = response.data[0];
        $scope.reportLoading = 0;
        console.log($scope.allBookingList);
      });
  };

  $scope.getAllBookingList();
});
