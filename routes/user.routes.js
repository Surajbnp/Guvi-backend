const { Router } = require("express");
const { UserModel } = require("../models/User.model");
const { ProfileModel } = require("../models/Profile.model");
const authentication = require("../middlewares/authentication");
const userController = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utills/utills");
require("dotenv").config();

// signup route

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req?.body;

  const userExist = await UserModel.find({ email });

  if (userExist?.length > 0) {
    return res.status(403).send({ msg: "user allready exist" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      try {
        const user = new UserModel({
          email,
          name,
          password: hash,
        });
        await user.save();
        res.status(200).json({
          msg: "signup success",
          email: user.email,
          name: user.name,
        });
      } catch (err) {
        res.status(400).send({ msg: "something went wrong" });
      }
    });
  }
});

// login route

userController.post("/login", async (req, res) => {
  const { email, password } = req?.body;

  const user = await UserModel.findOne({ email: email });
  const hash = user?.password;

  if (user && hash) {
    const verification = await bcrypt.compare(password, hash);
    if (verification) {
      if (verification) {
        let profileExist = await ProfileModel.findOne({ userId: user?._id });

        if (!profileExist) {
          // creating profile of user after succesfull login

          let profile = new ProfileModel({
            email: user?.email,
            name: user?.name,
            userId: user?._id,
          });

          await profile.save();
        }

        const token = generateToken({
          userId: user._id,
          email: user.email,
        });
        res.status(200).send({
          msg: "login success",
          email: user.email,
          name: user.name,
          userId: user._id,
          token,
        });
      }
    } else {
      res.status(401).send({ msg: "invalid credentials" });
    }
  }
});

// Profile route for getting data

userController.get("/profile", authentication, async (req, res) => {
  let { userId } = req?.body;
  try {
    let profileData = await ProfileModel.findOne({ userId: userId });
    res.status(200).send({ profile: profileData });
  } catch {
    res.status(500).send({ msg: "something went wrong" });
  }
});

// Profile route for posting data

userController.patch("/profile/update", authentication, async (req, res) => {
  let data = req?.body;
  try {
    await ProfileModel.findOneAndUpdate(
      { userId: data?.userId },
      data
    );

    res.status(201).send({ msg: "profile updated" });
  } catch {
    res.status(500).send({ msg: "something went wrong" });
  }
});

module.exports = userController;
