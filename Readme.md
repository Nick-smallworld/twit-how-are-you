# twit-how-are-you

## What's this?

This is the experimental implementation app using Firebase, Twitter API v2, and GCP Natural Language API.
The app retrieves the latest timeline from official Twitter account (https://twitter.com/Twitter).

When user view the page and click button, the Firebase functions get the latest tweets from the official Twitter account, analyze the content of the tweet, and return the result of the anayzing.

If the content of the tweet is postive, the app cheer up the account.
If the content of the tweet is negative, the app encourage the account to calm down.

