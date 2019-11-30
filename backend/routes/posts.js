const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("",checkAuth,multer({ storage: storage }).single("image"), (req, res, next) => {   // route for posting message

  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    }
    else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.put("/:id", checkAuth,(req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post updated successfully"
    })
  })
});

router.get("", (req, res, next) => {   // same route for fetching message
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPost;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then(documents => {
    fetchedPost = documents;
    return Post.count();

  })
    .then(count => {
      res.status(200).json({
        message: "post fetched successfully",
        posts: fetchedPost,
        maxPosts: count

      });
    });
});

router.delete("/:id", checkAuth,(req, res, next) => {   // route for deleting a post
  console.log(req.param.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "post deleted"
    });
  });

})

module.exports = router;
