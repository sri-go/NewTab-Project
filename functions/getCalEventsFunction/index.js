const {google} = require('googleapis')
const credentials = require('./credentials.json')

exports.getCalEvents = async (req, res) => {
  // wait for an event 
  // request comes in with code parameter and query string from 'GET' request 
  let params = req.query;
  const code = params.code;
  let token, response;

  try {
    token = await getAccessToken(code);
    console.log('token', token);
  } catch (err) {
    response = JSON.stringify({
        statusCode: 500,
      })
    return response;
  }
  async function getAccessToken(code) {
    console.log(code);
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    
    oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[1] //redirect to home page
    );

    try{
      let accessToken = await oAuth2Client.getToken(code, (err, token) => {
        if(err) return res.send(JSON.stringify(err));
        console.log('token-in-function', token);
        
        //return access token
        response = JSON.stringify({
          statusCode: 302,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Cache-Control': 'no-cache',
          },
          body: {'token': token},
        });

        console.log('response', response);
        return res.send(response);
      });

      console.log('access token', accessToken);
      return accessToken; 

    }catch(error){
      console.log(error);
      throw e;
    }
  }
}