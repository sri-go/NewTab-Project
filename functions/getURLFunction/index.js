const { google } = require('googleapis');

const credentials = require('./credentials.json')

// This function returns an url that the user can authenticate with
// This function should be run on page load so the link will be 

exports.getURL = async (req, res) => {
    const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    let redirectURL, oAuth2Client, response;

    try {
        redirectURL = await authorize(credentials);
    }
    catch (e) {
        // console.log(e.message);
        response = JSON.stringify({
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              error: e.message,
            }),
        })
        return res.send(response);
    } 
    
    console.log(redirectURL);
    response = {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
      },
      body: redirectURL,
    }
    return res.send(response);

    function authorize(credentials) {
        // const { CLIENT_SECRET, CLIENT_ID, REDIRECT_URIS } = process.env
        const {client_secret, client_id, redirect_uris} = credentials.installed
        oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[1] // redirect to cloud function getToken
        );
        return getAccessToken(oAuth2Client);
    }
    
    function getAccessToken(oAuth2Client) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: "offline",
          scope: SCOPES,
        });
        // returns link that user clicks to authorize app
        return authUrl;
    }
}
