const express = require('express');
const router = express.Router(); 
const userModel = require('../Schema/UserModel');

router.get("/users", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});



module.exports = router;