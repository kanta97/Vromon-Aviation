var app = angular.module("navExtranetApp", ["ngRoute"]);

app.controller("rootController", function ($scope, $http) {
  $scope.selectedNav = "dashboard";
  var routeExt = "";
  var location = window.location.href;
  try {
    location = location.substring(location.indexOf("/") + 1);
    location = location.substring(location.indexOf("/") + 1);
    location = location.substring(location.indexOf("/") + 1);
    location = location.substring(location.indexOf("/") + 1);
    routeExt = location;
  } catch (e) {}

  if (routeExt == "") {
    $scope.selectedNav = "dashboard";
  } else {
    $scope.selectedNav = routeExt;
  }

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $scope.checkSession = function () {
    $http.get("/getSessionInfo").then(function (response) {
      $scope.sessionInfo = response.data;
      if (!$scope.sessionInfo.state) {
        window.location.replace("/?message=Logged Out");
      }
    });
  };

  $scope.logout = function () {
    $http.get("/logout").then(function (response) {
      $scope.logOutRes = response.data;
      if (
        $scope.logOutRes.result == "log out successfully" ||
        $scope.logOutRes.result == "not logged in"
      ) {
        window.location.replace("/");
      }
    });
  };

  $scope.checkSession();
});
