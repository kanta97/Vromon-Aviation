app.controller("authController", function ($scope, $http) {
  $scope.loginLoading = 0;
  $scope.errMsgFlag = 0;
  $scope.errMsg = "";
  $scope.showLogin = true;
  $scope.showOtpVerification = false;
  $scope.signupLoading = false;
  document.getElementById("signup").style.display = "block";
  document.getElementById("otpVerify").style.display = "none";
  document.getElementById("verifySuccess").style.display = "none";

  var urlParams = new URLSearchParams(window.location.search);
  $scope.errMsg = urlParams.get("message");
  let otpmsg = urlParams.get("otpmsg");

  console.log($scope.errMsg);

  if ($scope.errMsg == "" || $scope.errMsg == null) {
    $scope.errMsgFlag = 0;
  } else {
    $scope.errMsgFlag = 1;
  }

  if (otpmsg == "success") {
    document.getElementById("verifySuccess").style.display = "block";
    document.getElementById("signin").style.display = "block";
  }

  $scope.signup = async function () {
    $scope.signupLoading = true;
    let body = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password,
    };

    let signUpResData = await axios.post("/ws/signup", body);
    $scope.signupLoading = false;
    signUpResData = signUpResData.data[0][0];
    if (signUpResData.result == "+success") {
      document.getElementById("signin").style.display = "none";
      document.getElementById("signup").style.display = "none";
      document.getElementById("otpVerify").style.display = "block";
      localStorage.setItem("email", $scope.email);
    }
  };

  $scope.verifyOtp = async function () {
    $scope.otpLoading = true;
    let body = {
      userId: localStorage.getItem("email"),
      otp: $scope.otp,
    };

    let signUpResData = await axios.post("/ws/verifyOtp", body);
    $scope.otpLoading = false;
    signUpResData = signUpResData.data[0][0];
    if (signUpResData.result === "+success") {
      window.location.replace("/?otpmsg=success");
    }
  };

  $scope.login = function () {
    $scope.loginLoading = 1;
    $http({
      url: "/ws/login",
      method: "POST",
      data: {
        email: $scope.signinEmail,
        password: $scope.signinPassword,
      },
    }).then(
      function (response) {
        if (response.data[0][0].result == "+success") {
          if (response.data[0][0].isVerified == 0) {
            document.getElementById("signin").style.display = "none";
            document.getElementById("signup").style.display = "none";
            document.getElementById("otpVerify").style.display = "block";
            localStorage.setItem("email", $scope.email);
          } else if (response.data[0][0].isVerified == 1) {
            localStorage.setItem("email", $scope.signinEmail);
            window.location.replace("/admin-panel.html");
            $scope.loginLoading = 0;
          }
        } else {
          window.location.replace("/?message=Invalid username or password");
          $scope.loginLoading = 0;
        }
      },
      function (response) {
        // optional
        console.log(response);
      }
    );
  };
});
