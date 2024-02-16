const express = require('express');
const router = express.Router(); 
const userModel = require('../Schema/UserModel');
const app = express()

app.use(express.json())
router.get("/users", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
      const userID = req.params.id;
      const userData = await userModel.findById(userID);
  
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(userData);
    } catch (error) {
      console.error("error occurred while getting user details:", error);
      res
        .status(500)
        .json({
          error:
            "Server Error with GET method while getting the user details",
        });
    }
  });
  router.post("/users", async (req, res) => {
    try {
      console.log(req.body);
      const data = await userModel.create(req.body);
      res.json(data);
    } catch (err) {
      console.log("An error with POST user data", err);
      res.status(500).json({
        error: "Server Error: Unable to create user",
      });
    }
  });
  
  router.put("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = await userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            Username: req.body.Username,
            Password: req.body.Password
            // phone_number: req.body.phone_number,
          },
        },
        { new: true }
      );
  
      if (!updatedData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(updatedData);
    } catch (error) {
      console.error("Error occurred while updating user:", error);
      res.status(500).json({
        error: "Server Error with PUT method for updating user details",
      });
    }
  });
  
  router.patch("/users/:id", async (req, res) => {
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
      console.error("error occurred while updating user details:", error);
      res
        .status(500)
        .json({
          error:
            "Server Error with PATCH method for updating user dtails",
        });
    }
  });

  router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.status(201).json({
      Message: "Deleted Succussfully",
    });
  });

module.exports = router;