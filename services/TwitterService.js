const axios = require('axios')
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural')
const SW = require('stopword');

const token = Process.env.BearerToken
/**
 * service that handles retrieving tweets from Twitter API and preprocessing
 */
class TwitterService{

    async getActivity(){


    }
    
    async getTweets(startTime){
        try{
            // var response = await client.get('statuses/user_timeline',{'screen_name': 'CertikOrg', 'trim_user': 1, 'exclude_replies': true} )
            var response = await axios.get(
            'https://api.twitter.com/2/users/1232319080637616128/tweets?tweet.fields=created_at', 
            { 
                Params: {
                    'max_results': 100,
                    'start_time': startTime
                },
                headers:{'Authorization': token}
            })
            var allTweets = response.data.data
            var paginToken = response.data.meta.next_token

            while(paginToken != undefined){
                var response = await axios.get(
                    'https://api.twitter.com/2/users/1232319080637616128/tweets?tweet.fields=created_at', 
                    {
                        params: {
                            'pagination_token': paginToken,
                            'max_results': 100,
                            'start_time': startTime
                        },
                        headers:{'Authorization': token}
                    })

                paginToken = response.data.meta.next_token
                allTweets = allTweets.concat(response.data.data)
            }
            console.log(allTweets)
            //preprocessed single tokens ready for sentiment analysis
            var postPreTweest = this.preprocessText(allTweets)
            return postPreTweest
        } catch(e){
            console.log(e)
            return e
        }
    }

    /**
     *  get the contribution activity here
     */
    preprocessText(tweets){
        try{                        
            const currentDate = new Date()
            const year = currentDate.getFullYear()

            var processedTokens = []
            var activityDates = []
            tweets.forEach(element => {
                if(element){
                    const lexed = aposToLexForm(element.text);
                    const cased = lexed.toLowerCase();
                    const alphaonly = cased.replace(/[^a-zA-Z\s]+/g, '');
                    const { WordTokenizer } = natural;
                    const tokenizer = new WordTokenizer();
                    const tokenized = tokenizer.tokenize(alphaonly);
                    const filteredReview = SW.removeStopwords(tokenized);
                    filteredReview.forEach(filteredElement=>{
                        processedTokens.push({text:filteredElement})
                    })
    
                    var tweetYear = element.created_at.slice(0,5)
                    var date = element.created_at.slice(0,10)
                    activityDates.push({date: date})
                } 
        

                // if(parseInt(year) - parseInt(tweetYear) < 2){
                //     activityDates.push({date: date})
                // }

                // const filteredReview = SW.removeStopwords(alphaonly);
                // postpreTweets.push(alphaonly)
         
            });

            return {
                tokens: processedTokens,
                dates: activityDates
            }
        } catch(e){
            console.log(e)
            return e
        }
    }



  



}

module.exports = new TwitterService();