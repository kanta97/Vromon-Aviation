const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ApiAccess = require("./middleware/access");

const UserController = require("./controllers/UserController");
const forgotController = require("./controllers/forgotpass");
const checkController = require("./controllers/token_validator");
const loginController = require("./controllers/login");
const adminController = require("./controllers/admin");
const roleController = require("./controllers/role");
const roleMenuController = require("./controllers/rolemenu");
const rolePermissionController = require("./controllers/rolepermission");
const roleUserController = require("./controllers/roleuser");

let router = express.Router();

/*
 * CORS
 * */
router.use(cors());
let app = express();

app.use(morgan("dev"));
/*app.use(boydParser.urlencoded({extended: false}))
app.use(boydParser.json())*/

//app.use('/service/uploads', express.static('uploads'));

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

router.use(function (request, resposne, next) {
  resposne.append("Access-Control-Allow-Headers", ["Content-Type, APP_KEY"]);
  resposne.append("Connection", "close");
  let access = new ApiAccess(request);
  //console.log(request.headers)
  let flag = access.checkAppKey();
  if (flag) {
    next();
  } else {
    resposne.json("access denied");
  }
});

//api main route
app.use("/auth", router);

// roues
router.use("/checker", checkController);
router.use("/user", loginController);
router.use("/admin", adminController);
router.use("/role", roleController);
router.use("/rolemenu", roleMenuController);
router.use("/rolepermission", rolePermissionController);
router.use("/roleuser", roleUserController);
router.use("/forgot", forgotController);

router.route("/user/profile").post(UserController.create_profile);
router.route("/user/profile/:id").put(UserController.update_profile);
router.route("/user/profile/:id").get(UserController.read_user);

router.route("/user/verification/:code").get(UserController.verification_user);
router
  .route("/user/info/by/list")
  .post(UserController.bulkUserInfoForNotification);

router.use((req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

router.use((req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
