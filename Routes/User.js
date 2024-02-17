const express = require('express');
const router = express.Router(); 
const userModel = require('../Schema/UserModel');

router.use(express.json());

const errorHandler = (error, req, res, next) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Server Error" });
};

router.get("/users", async (req, res, next) => {
    try {
        const data = await userModel.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/users/:id", async (req, res, next) => {
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

router.post("/users", async (req, res, next) => {
    try {
      console.log(req.body);
      const data = await userModel.create(req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
});
  
router.put("/users/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedData = await userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            Username: req.body.Username,
            Password: req.body.Password
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
  
router.patch("/users/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const updateFields = {};
      if (req.body.name) {
        updateFields.name = req.body.name;
      }
      if (req.body.Username) {
        updateFields.Username = req.body.Username;
      }
      if (req.body.password) {
        updateFields.password = req.body.password;
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

router.delete("/users/:id", async (req, res, next) => {
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
