// const natural = require('natural')
// const { SentimentAnalyzer, PorterStemmer } = natural;

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

/**
 * service that handles 
 */
class AnalysisService{

    processText(tweets){
        try{
            // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
            // const analysis = analyzer.getSentiment(tweets); 
            // console.log(analysis)

            /**
             * provavly dont need these if i have maps?
             */
            var positive = 0
            var neutral = 0
            var negative = 0

            var positivej = {}
            var neutralj = {}
            var negativej = {}

            tweets.forEach(element=>{
                var analysis = sentiment.analyze(element);
                if(analysis.score>0){
                    positive += 1
                    if(positivej.hasOwnProperty(element)){
                        positivej[element].count += 1
                    } else {
                        positivej[element] = {
                            score: analysis.score,
                            count: 1
                        }
                    }

                    
                } else if(analysis.score == 0){
                    neutral += 1
                    if(neutralj.hasOwnProperty(element)){
                        neutralj[element].count += 1
                    } else {
                        neutralj[element] = {
                            score: analysis.score,
                            count: 1
                        }
                    }
                } else {
                    negative += 1
                    if(negativej.hasOwnProperty(element)){
                        negativej[element].count += 1
                    } else {
                        negativej[element] = {
                            score: analysis.score,
                            count: 1
                        }
                    }
                }
            })
            return {
                positive: positivej,
                neutral: neutralj,
                negative: negativej,
                count: { 
                    positive: positive,
                    neutral: neutral,
                    negative: negative
                }



                // positive: positive,
                // neutral: neutral,
                // negative: negative
            }
        } catch(e){
            console.log(e)
            return e
        }
    }



  



}

module.exports = new AnalysisService();