const express = require("express");
const router = express.Router();
const postModel = require("../Schema/PostModel");
router.use(express.json());

const errorHandler = (error, req, res, next) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Server Error" });
};
router.get("/", async (req, res, next) => {
  try {
    const selectedUser = req.query.Username;

    if (selectedUser) {
      const posts = await postModel.find({ Username: selectedUser });
      return res.json(posts);
    } else {
      const allPosts = await postModel.find();
      return res.json(allPosts);
    }
  } catch (error) {
    next(error);
  }
});




router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const post = await postModel.findById(_id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await postModel.create(req.body);
    res.json(data);
  } catch (error) {
    res.json({error:error});
  }
})

router.put("/:id", async (req, res, next) => {
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

router.patch("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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
