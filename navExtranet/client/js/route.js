app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../templates/dashboard.html",
    })
    .when("/properties", {
      templateUrl: "../templates/property/properties.html",
    })
    .when("/rooms", {
      templateUrl: "../templates/property/rooms.html",
    })
    .when("/property-bookings", {
      templateUrl: "../templates/property/bookings.html",
    })
    .when("/report", {
      templateUrl: "../templates/property/report.html",
    })
    .when("/transports", {
      templateUrl: "../templates/transport/transports.html",
    })
    .when("/transport-bookings", {
      templateUrl: "../templates/transport/bookings.html",
    })
    .when("/rates", {
      templateUrl: "../templates/property/rates.html",
    })
    .when("/availability", {
      templateUrl: "../templates/property/availability.html",
    })
    .when("/bulk_edit", {
      templateUrl: "../templates/property/bulk_edit.html",
    })
    .when("/profile", {
      templateUrl: "../templates/profile.html",
    });
  //$locationProvider.hashPrefix('')
  //$locationProvider.html5Mode(true)
});
