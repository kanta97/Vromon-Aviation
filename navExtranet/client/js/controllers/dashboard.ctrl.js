app.controller("dashboardController", function ($scope, $http) {
  $scope.dashLoading = 1;
  $scope.getDashboardData = function () {
    $scope.dashLoading = 1;
    $http
      .get("/ws/getDashboardData?userId=" + localStorage.getItem("email"))
      .then(function (response) {
        console.log(response);
        $scope.dashboardData = response.data;
        $scope.dashLoading = 0;
      });
  };

  $scope.getDashboardData();
});
