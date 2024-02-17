const express = require("express");
const router = express.Router();
const postModel = require("../Schema/PostModel");

router.use(express.json());

const errorHandler = (error, req, res, next) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Server Error" });
};

router.get("/posts", async (req, res, next) => {
  try {
    const data = await postModel.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/posts/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/posts", async (req, res, next) => {
  try {
    const data = await postModel.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/posts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = await postModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

router.patch("/posts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = await postModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
