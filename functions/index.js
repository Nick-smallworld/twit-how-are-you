const functions = require("firebase-functions");
const axios = require("axios")
const fs = require("fs");

const token = fs.readFileSync("keys/twitter_token.data");
const twitterId = fs.readFileSync("keys/twitter_id.data");
const gcp_key = fs.readFileSync("keys/gcp_key.data"); 

exports.analyze = functions.https.onRequest((request, response) => {

    getTweets()
        .then(value => {
            retrieveSentiment(value)
                .then(newValue => {
            
                    switch (true) {
                            case newValue < -0.5:
                                response.send("Oh, What's Happened? Take a breath, and feel easy!");
                                break;
                            case newValue > 0.5 :
                                response.send("You look great! Go Ahead!");
                                break;
                            default:
                                response.send("Ok, you looks good. Please keep it!");
                                break;
                    }
    
        })
    })
 });


async function getTweets() {

     const uri = "https://api.twitter.com/2/users/" + twitterId + "/tweets?exclude=retweets,replies&max_results=5";
     let config = {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json",
        }
      }
    
   const res1 = await axios.get(uri, config).then(res => {
        return JSON.stringify(res.data.data[0].text);
    });
     return res1;
    
}

async function retrieveSentiment(textvalue) {
    const apiKey = gcp_key;
    const apiEndpoint = 
  'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + apiKey;
  
    const docDetails = {
      "content" : textvalue,
      "language" : "en-us",
      "type" : "PLAIN_TEXT",
    };
  
    const nlData = {
        "document" : docDetails,
        "encodingType": "UTF8",
    };

    const nlOptions = {
        method: "POST",
        headers :  { 'content-type': 'application/json' },
        data : nlData
    };
  
    const score = await axios(apiEndpoint,nlOptions).then(res => {
        return JSON.stringify(res.data.documentSentiment.score);
    });
    return score;
    
  }