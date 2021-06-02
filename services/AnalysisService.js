// const natural = require('natural')
// const { SentimentAnalyzer, PorterStemmer } = natural;

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

/**
 * service that handles the analysis of text
 */
class AnalysisService{

    processActivity(tweets){
                 /**
             * object that tracks twitter activity
             */
        var activity = {

        }

        tweets.forEach(element => {

            var date = element.date                
            if(activity.hasOwnProperty(date)){
                activity[date] += 1
            } else {
                activity[date] = 1
            }
        }) 
        return activity
    }

    processText(tokens){
        try{
            // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
            // const analysis = analyzer.getSentiment(tweets); 
            // console.log(analysis)

            /**
             * used for percentages (waste of time to use map to find count)
             */
            var positive = 0
            var neutral = 0
            var negative = 0

            var positivej = {}
            var neutralj = {}
            var negativej = {}

   

            tokens.forEach(element=>{
                /**
                 * track created_at for activity graph
                 */
                // console.log(element)

                /**
                 * sentiment analysis
                 */
                var analysis = sentiment.analyze(element.text);
                if(analysis.score>0){
                    positive += 1
                    if(positivej.hasOwnProperty(element.text)){
                        positivej[element.text].count += 1
                    } else {
                        positivej[element.text] = {
                            score: analysis.score,
                            count: 1
                        }
                    }

                } else if(analysis.score == 0){
                    neutral += 1
                    if(neutralj.hasOwnProperty(element.text)){
                        neutralj[element.text].count += 1
                    } else {
                        neutralj[element.text] = {
                            score: analysis.score,
                            count: 1
                        }
                    }

                } else {
                    negative += 1
                    if(negativej.hasOwnProperty(element.text)){
                        negativej[element.text].count += 1
                    } else {
                        negativej[element.text] = {
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
            }
        } catch(e){
            console.log(e)
            return e
        }
    }



  



}

module.exports = new AnalysisService();