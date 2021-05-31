const axios = require('axios')
var Twitter = require('twitter');

/**
 
    API key: WcdhN9xQzuptwlJoOj9xOaIua
    API secret key: 4PaTXIYO5Q1hcauw4Meeimvyvbnam2uNgvIwXLKPoeM6c2iFh4
    bearer token: AAAAAAAAAAAAAAAAAAAAADnWQAEAAAAAvW2EUVw7WJNOnuaVMBFYKaREVNU%3DUeqt0Tbo4INmp9jDtBiMoiMVvg5roLOOwgqayzmDNWILI2GqR3

    certikorg twitter id: 1232319080637616128
 */ 
const token = 'Bearer AAAAAAAAAAAAAAAAAAAAADnWQAEAAAAAvW2EUVw7WJNOnuaVMBFYKaREVNU%3DUeqt0Tbo4INmp9jDtBiMoiMVvg5roLOOwgqayzmDNWILI2GqR3'

var client = new Twitter({
    consumer_key: 'WcdhN9xQzuptwlJoOj9xOaIua',
    consumer_secret: '4PaTXIYO5Q1hcauw4Meeimvyvbnam2uNgvIwXLKPoeM6c2iFh4',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAADnWQAEAAAAAvW2EUVw7WJNOnuaVMBFYKaREVNU%3DUeqt0Tbo4INmp9jDtBiMoiMVvg5roLOOwgqayzmDNWILI2GqR3'
  });
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
            return response.data
        } catch(e){
            console.log(e)
            return e
        }



    }

    preprocessText(){

    }



  



}

module.exports = new TwitterService();