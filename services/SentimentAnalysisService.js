// const natural = require('natural')
// const { SentimentAnalyzer, PorterStemmer } = natural;

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

/**
 * service that handles 
 */
class SentimentAnalysisService{

    processText(tweets){
        try{
            // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
            // const analysis = analyzer.getSentiment(tweets); 
            // console.log(analysis)
            var positive = []
            var neutral = []
            var negative = []
            tweets.forEach(element=>{
                var analysis = sentiment.analyze(element);
                console.log(analysis)
                if(analysis.score>0){
                    positive.push({
                        word: element,
                        score: analysis.score
                    })
                } else if(analysis.score == 0){
                    neutral.push({
                        word: element,
                        score: analysis.score
                    })
                } else {
                    negative.push({
                        word: element,
                        score: analysis.score
                    })
                }
            })

            return {
                positive: positive,
                neutral: neutral,
                negative: negative
            }
        } catch(e){
            console.log(e)
            return e
        }
    }



  



}

module.exports = new SentimentAnalysisService();