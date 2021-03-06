
const express = require("express");
const { query, validationResult} = require("express-validator");
const router = express.Router();

const axios = require('axios')

const TwitterService = require('../services/TwitterService')
const AnalysisService = require('../services/AnalysisService')


router.get(
  "/",
  [
  ],
  async (req, res) => {
    try {


    const {
      startDate
    } = req.query;

    var tweet_response = await TwitterService.getTweets(startDate)
    var sentiment_response = await AnalysisService.processText(tweet_response.tokens)
    var activity_response = await AnalysisService.processActivity(tweet_response.dates)
    

    return res.status(200).json({
      data: sentiment_response,
      activity: activity_response
    })

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
  }
);



module.exports = router;
