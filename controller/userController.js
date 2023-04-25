var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//REGISTER
async function register(req, res, next) {
  try {
    // console.log(req.body);
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
    // console.log(newUser);
  } catch (err) {
    res.status(401).json(err.message);
  }
}
//LOGIN

async function login(req, res) {
  try {
    const { moblieNum, password } = req.body;
    const user = await User.findOne({ moblieNum: moblieNum }).exec();
    if (user) {
      const valid = bcrypt.compareSync(password, user.password);
      if (valid) {
        const token = jwt.sign({ data: { isAdmin: user.isAdmin, userId: user.id } }, process.env.SECRET, { expiresIn: "24h" });
        res.status(200).json({ ...user._doc, accessToken: token });
      } else {
        res.status(401).json("insert correct password");
      }
    } else {
      res.status(401).json("insert correct Mobile");
    }
  } catch (err) {
    res.status(422).json(err.message);
  }
}

//GET BY ID
async function getUserByID(req, res, next) {
  try {
    const id = req.params.id;
    const getUser = await User.findById(id);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(422).json(err.message);
  }
}
//DELETE USER
async function deleteUser(req, res, next) {
  try {
    var id = req.params.id;
    var deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser.isAdmin === true) {
      res.status(204).json("you cant delete admin user");
    }
    res.status(204).json(" email deleted successfully");
  } catch (err) {
    res.status(422).json({ status: "failed", message: `${err.message}` });
  }
}
//UPDATE INFO
async function updateInfo(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = bcrypt.hashSync(data.password, salt);
      data.password = hashPass;
    }
    await User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

//ALL USERS
async function getAllUsers(req, res) {
  try {
    allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
//admin LOGIN
// async function loginAdmin(req, res) {
//   try {
//     const { moblieNum, password } = req.body;
//     const admin = await User.findOne({ moblieNum: moblieNum });
//     if (admin) {
//       const valid = bcrypt.compareSync(password, admin.password);
//       if (valid) {
//         const token = jwt.sign({ data: { isAdmin: admin.isAdmin == true, adminId: admin.id } }, process.env.SECRET, { expiresIn: "24h" });
//         res.status(200).json({ acssesToken: token });
//       } else {
//         res.status(401).json("password is invaild");
//       }
//     }
//     res.status(401).json("Mobile number is invalid");
//   } catch (err) {
//     res.status(422).json(err.message);
//   }
// }
//admin logout
async function logout(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, { $set: { isActive: false } });
    res.status(200).json("logout successfully");
  } catch (err) {
    res.status(420).json(err.message);
  }
}
module.exports = { register, login, getUserByID, deleteUser, updateInfo, getAllUsers, logout };
