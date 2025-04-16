app.controller("availabilityController", function ($scope, $http, $timeout) {
  // variables
  $scope.availabilityLoading = 0;
  $scope.dateArray = [];
  $scope.searchText = "";
  $scope.availibilityLoading = 0;
  $scope.isDisabled = true;
  $scope.finalData = [];
  $scope.undefined = 0;
  $scope.isclick = false;
  $scope.selectCtrl="";

  
  // variables end

  // functions definition
  $scope.populateAngUi = function () {
    $scope.dateArray = $scope.dateArray;
    for (let i = 0; i < $scope.dateArray.length; i++) {
      $scope.dateArray[i].availableRoom = 0;
      $scope.dateArray[i].soldRoom = 0;
      $scope.dateArray[i].price = 0;
    }
    $scope.getRoomAvailability();
  };

  $scope.hide_me=function (){
    var k=document.getElementsByClassName("form-alternet AvailableRoom ng-pristine ng-untouched ng-valid ng-not-empty")
    for(var i=1; i<k.length; i++){
      k[i].style.visibility="hidden"
      }
      var k=document.getElementsByClassName("form-alternet price ng-pristine ng-untouched ng-valid ng-not-empty")
      for(var i=1; i<k.length; i++){
        k[i].style.visibility="hidden"
        }

        var k=document.getElementsByClassName("form-alternet sold ng-pristine ng-untouched ng-valid ng-not-empty")
        for(var i=1; i<k.length; i++){
          k[i].style.visibility="hidden"
          }
  };

  $scope.getRoomAvailability = function () {
    $scope.availibilityLoading = 1;
    $http
      .get(
        "/ws/getRoomAvailability?userId=" +
          $scope.sessionInfo.sessionInfo.email +
          "&query=" +
          $scope.searchText
      )
      .then(function (response) {
        $scope.allData = response.data[0];
        localStorage.setItem('availData', JSON.stringify(response.data[0]));
        for (let i = 0; i < $scope.allData.length; i++) {
          try {
            $scope.allData[i].availabilityData = JSON.parse($scope.allData[i].availabilityData);
            if ($scope.allData[i].availabilityData) {
              for (let j = 0; j < $scope.allData[i].availabilityData.length; j++) {
                for (let k = 0; k < $scope.dateArray.length; k++) {
                  if (new Date($scope.allData[i].availabilityData[j].date).toDateString() == new Date($scope.dateArray[k].date).toDateString()) {
                    $scope.dateArray[k].availableRoom=$scope.allData[i].availabilityData[j].availableRoom
                    $scope.dateArray[k].soldRoom=$scope.allData[i].availabilityData[j].soldRoom
                    $scope.dateArray[k].price=$scope.allData[i].availabilityData[j].price
                  }
                  else{
                  }
                }
              }
            } else {

            }
            $scope.allData[i].availabilityData = JSON.parse(JSON.stringify($scope.dateArray));
            $scope.allData[i].editable=true
          } catch (e) {
            console.log(e);
          }
        }
        $scope.allData = JSON.parse(JSON.stringify($scope.allData));
        $scope.availibilityLoading = 0;
      });
      
 

  };

  $scope.change = function(all, ind, val) {
    console.log(all, ind, val)
    all[ind].availableRoom=val
    for(var i=0; i<all.length; i++){
      all[i].availableRoom=val
    }
    console.log(all)
  };
  $scope.change = function(all, ind, val) {
    for(var i=0; i<all.length; i++){
      all[i].availableRoom=val
    }
  };
    $scope.price = function(all, ind, val) {
    for(var i=0; i<all.length; i++){
      all[i].price=val
    }
  };

  $scope.handleCalendarData = async function (roomId, index, editable) {
    let masterAllData=JSON.parse(localStorage.getItem('availData'))
    if(editable===true){
      $scope.allData[index].editable=false   
    }
    else if(editable===false){
      $scope.allData[index].editable=true
      let body = {
        id: roomId
      };

      for (let i = 0; i < $scope.allData.length; i++) {
        if ($scope.allData[i].id == roomId) {
          body.availabilityData = JSON.parse(JSON.stringify($scope.allData[i].availabilityData));
        }
      }

      let masterAllData=JSON.parse(localStorage.getItem('availData'))
      for (let i = 0; i < masterAllData.length; i++) {
        masterAllData[i].availabilityData=JSON.parse(masterAllData[i].availabilityData)
        if(masterAllData[i].availabilityData){
          if (masterAllData[i].id == roomId) {
            for(let j=0;j<masterAllData[i].availabilityData.length;j++){
              for(let k=0;k<body.availabilityData.length;k++){
                if(new Date(masterAllData[i].availabilityData[j].date).toDateString() == new Date(body.availabilityData[k].date).toDateString()){
                  masterAllData[i].availabilityData[j]=body.availabilityData[k]
                }
              }
            }
            body.availabilityData = masterAllData[i].availabilityData;
          }
        }
      }



      body.availabilityData = JSON.parse(JSON.stringify($scope.allData[index].availabilityData));
      var tree= localStorage.getItem('availData')
      var tree_data=JSON.parse(tree)[index].availabilityData
      var dp=JSON.parse(tree_data)

      console.log("room id", roomId)
      
        try{    
          dp.forEach(x => {
          if(body.availabilityData.length < dp.length){
            body.availabilityData.push(x)
            console.log("body.availabilityData",body.availabilityData)
          }else{
          }
        });
      }catch{}


      let updateUrl = "/ws/updateRoomAvailability";
       let response = await axios.post(updateUrl, body);
      //let response = await axios.post(updateUrl, {"id": roomId, "availabilityData":body.availabilityData});
      response = response.data[0][0];
     
      alert("Edit sucessfully ",response)


    //   var not={
    //     "id":'',
    //     "availabilityData":[]
    //   }
    //   var   defult={
    //     "date": "",
    //     "availableRoom": 0,
    //     "soldRoom": 0,
    //     "price": 0,
    //     "$$hashKey": ""
    //   }
    //    for(dp=0; dp<body.availabilityData.length; dp++){
    //     console.log(body.availabilityData[dp].date)
    //     defult.date=body.availabilityData[dp].date
    //     defult.$$hashKey=body.availabilityData[dp].$$hashKey
    //     not.availabilityData.push(defult)
    //    }

    
    //    var go= localStorage.getItem('availData')
    //    var do_data=JSON.parse(tree)
       
    //    for(var i=0; i<do_data.length; i++){
    //        if(do_data[i].id!==roomId){
    //        not.id=do_data[i].id
    //        console.log(not.id)

    //        let response = await axios.post(updateUrl, not);
    //        console.log(response);
    //        }else{
    //        }
    //    }

    //  console.log("dsfdsf", not)
    //  console.log("dp",body);
 

      
    }
  };

  function makeDate(fromDate, endDate) {
    $scope.dateArray = [];
    var start = new Date(fromDate);
    var end = new Date(endDate);
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      let obj = {};
      obj.date = new Date(d);
      $scope.dateArray.push(obj);
    }
    $scope.populateAngUi();
  }
  // functions definition end

  // functions calling
  $(function () {
    let today = new Date();
    let past = new Date();
    past.setDate(past.getDate() - 6);
    console.log(today, past);

    $('input[name="daterange"]').daterangepicker(
      {
        opens: "center",
        startDate: past,
        endDate: today,
      },
      function (startD, endD, label) {
        let fromDate = startD.format("MM/DD/YYYY");
        let endDate = endD.format("MM/DD/YYYY");
        makeDate(fromDate, endDate);
      }
    );

    let startD = $('[name="daterange"]')
      .data("daterangepicker")
      .startDate.format("MM/DD/YYYY");
    let endD = $('[name="daterange"]')
      .data("daterangepicker")
      .endDate.format("MM/DD/YYYY");
    makeDate(startD, endD);
  });
  // functions calling end
});
