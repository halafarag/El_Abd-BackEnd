const jwt = require("jsonwebtoken");

const User = require("../models/user");
function auth(req, res, next) {
  let { token } = req.headers;

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (decoded) {
      req.userdata = decoded.data;
      next();
    }

    if (err) {
      res.status(401).json("you must to be authenticated");
    }
  });
}
function authorization(req, res, next) {
  auth(req, res, function () {
    if (req.userdata.userId == req.params.id || req.userdata.isAdmin == true) {
      next();
    } else {
      res.status(401).json("you not authorized");
    }
  });
}
function isAdmin(req, res, next) {
  auth(req, res, function () {
    if (req.userdata.isAdmin == true) {
      next();
    } else {
      res.status(401).json("NOT ADMIN !");
    }
  });
}
function isUser(req, res, next) {
  auth(req, res, async function () {
    if (req.userdata.isAdmin == false) {
      const reqUser = await User.findById(req.userdata.userId);
      console.log(req.userdata.userId);
      if (reqUser) {
        next();
      } else {
        res.status(401).json("NOT USER !");
      }
    }
  });
}
module.exports = { auth, authorization, isAdmin, isUser };
