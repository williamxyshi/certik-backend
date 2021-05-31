
const express = require("express");
const { query, validationResult} = require("express-validator");
const router = express.Router();

const axios = require('axios')

const TwitterService = require('../services/TwitterService')

router.get(
  "/",
  [
      query("username", "Please Enter a Valid Username")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
              errors: errors.array()
          });
      }
    // const {
    //   username,
    // } = req.query;

    var service_response = await TwitterService.getTweets()
    return res.status(200).json({
      data: service_response
    })

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
  }
);


module.exports = router;
