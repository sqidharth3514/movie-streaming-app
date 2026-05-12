/*const express = require("express");

const router = express.Router();

const User = require("../models/User");

const auth = require("../middleware/auth");

const upload = require("../middleware/upload");

router.post(
  "/upload-avatar",
  auth,
  upload.single("avatar"),

  async (req, res) => {
    try {

      const user = await User.findById(req.user.id);

      user.avatar = req.file.path;

      await user.save();

      res.json({
        success: true,
        avatar: user.avatar,
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

module.exports = router;*/

import express from "express";

const router = express.Router();

// 👤 TEST ROUTE
router.get("/profile", (req, res) => {
  res.json({
    message: "User route working ✅",
  });
});

export default router;