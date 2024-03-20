const express = require("express");
const router = express.Router();
const Joi = require("joi"); 
const userModel = require("../Schema/UserModel");
const jwt = require('jsonwebtoken')
require('dotenv').config(); 
const app = express()

router.use(express.json());

const userSchema = Joi.object({
  Username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  Email: Joi.string().email().required(), 
});

const errorHandler = (error, req, res, next) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Server Error" });
};
router.get("/", async (req, res, next) => {
  try {
    const UsernameQ = req.query.Username;

    if (UsernameQ) {
      const user = await userModel.findOne({ Username: UsernameQ });
      return res.json(user);
    } else {
      const data = await userModel.find();
      return res.json(data);
    }
  } catch (error) {
    next(error);
  }
});



router.get("/:id", async (req, res, next) => {
  try {
    const userID = req.params.id;
    const userData = await userModel.findById(userID);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = userSchema.validate(req.body); 
    const { Username ,name,Password,Email} = req.body;

    const tokenPayload = {
      Username,
      name,
      Password,
      Email
    };

    const secretKey = process.env.SECRET_KEY; 
  
      const token = jwt.sign(tokenPayload, secretKey)

      res.cookie('token', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'strict' 
      });

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const existingUser = await userModel.findOne({
      Username: req.body.Username,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await userModel.findOne({ Email: req.body.Email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const data = await userModel.create(req.body);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          Username: req.body.Username,
          Password: req.body.Password,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const updateFields = {};
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.Username) {
      updateFields.Username = req.body.Username;
    }
    if (req.body.Password) {
      updateFields.Password = req.body.Password;
    }

    const validationResult = userSchema.validate(updateFields); // Validate updated fields

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const updatedData = await userModel.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.status(201).json({
      Message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
