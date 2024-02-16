const express = require("express");
const router = express.Router();
const postModel = require("../Schema/PostModel");

router.use(express.json());

router.get("/posts", async (req, res) => {
  try {
    const data = await postModel.find();
    res.json(data);
  } catch (error) {
    console.error("An error occurred while fetching posts:", error);
    res.status(500).json({ error: "Server Error while fetching posts" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("An error occurred while fetching post details:", error);
    res.status(500).json({ error: "Server Error while fetching post details" });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const data = await postModel.create(req.body);
    res.json(data);
  } catch (error) {
    console.error("An error occurred while creating a post:", error);
    res.status(500).json({ error: "Server Error while creating a post" });
  }
});

router.put("/posts/:id", async (req, res) => {
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
    console.error("An error occurred while updating a post:", error);
    res.status(500).json({ error: "Server Error while updating a post" });
  }
});

router.patch("/posts/:id", async (req, res) => {
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
    console.error("An error occurred while updating a post (PATCH):", error);
    res.status(500).json({ error: "Server Error while updating a post" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("An error occurred while deleting a post:", error);
    res.status(500).json({ error: "Server Error while deleting a post" });
  }
});

module.exports = router;
