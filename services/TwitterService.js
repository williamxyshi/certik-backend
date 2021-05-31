const axios = require('axios')
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural')
const SW = require('stopword');


/**
 
    API key: WcdhN9xQzuptwlJoOj9xOaIua
    API secret key: 4PaTXIYO5Q1hcauw4Meeimvyvbnam2uNgvIwXLKPoeM6c2iFh4
    bearer token: AAAAAAAAAAAAAAAAAAAAADnWQAEAAAAAvW2EUVw7WJNOnuaVMBFYKaREVNU%3DUeqt0Tbo4INmp9jDtBiMoiMVvg5roLOOwgqayzmDNWILI2GqR3

    certikorg twitter id: 1232319080637616128
 */ 
const token = 'Bearer AAAAAAAAAAAAAAAAAAAAADnWQAEAAAAAvW2EUVw7WJNOnuaVMBFYKaREVNU%3DUeqt0Tbo4INmp9jDtBiMoiMVvg5roLOOwgqayzmDNWILI2GqR3'

/**
 * service that handles 
 */
class TwitterService{
    
    async getTweets(){
        try{
            // var response = await client.get('statuses/user_timeline',{'screen_name': 'CertikOrg', 'trim_user': 1, 'exclude_replies': true} )
            var response = await axios.get(
            'https://api.twitter.com/2/users/1232319080637616128/tweets?max_results=100', 
            { 
                Params: {
                    'id': '1232319080637616128'
                },
                headers:{'Authorization': token}
            })
             var postPreTweest = this.preprocessText(response.data.data)
            return postPreTweest
        } catch(e){
            console.log(e)
            return e
        }
    }

    preprocessText(tweets){
        try{
            var postpreTweets = []
            tweets.forEach(element => {
                const lexed = aposToLexForm(element.text);
                const cased = lexed.toLowerCase();
                const alphaonly = cased.replace(/[^a-zA-Z\s]+/g, '');
                const { WordTokenizer } = natural;
                const tokenizer = new WordTokenizer();
                const tokenized = tokenizer.tokenize(alphaonly);
                const filteredReview = SW.removeStopwords(tokenized);
                filteredReview.forEach(element=>{
                    postpreTweets.push(element)
                })                
            });
            return postpreTweets
        } catch(e){
            console.log(e)
            return e
        }
    }



  



}

module.exports = new TwitterService();