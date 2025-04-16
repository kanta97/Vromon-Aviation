app.controller(
  "transportBookingController",
  function ($scope, $http, $timeout) {
    $scope.bookingLoading = 0;
    $scope.searchText = "";
    $scope.getAllBookingList = function () {
      $scope.bookingLoading = 1;
      let partnerId = localStorage.getItem("email");
      $http
        .get(
          "/ws/getAllBookingList?partnerId=" +
            partnerId +
            "&query=" +
            $scope.searchText
        )
        .then(function (response) {
          $scope.allBookingList = response.data[0];
          $scope.bookingLoading = 0;
          console.log($scope.allBookingList);
        });
    };

    $scope.getAllBookingList();

    $scope.clearModal = function () {};
  }
);
