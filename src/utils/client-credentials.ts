import {LocalStorage} from 'node-localstorage' 

var localStorage = new LocalStorage('./scratch'); 

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

let token;

spotifyApi.clientCredentialsGrant().
    then(function(result: { body: { access_token: any; }; }) {
        localStorage.setItem('token', result.body.access_token);
        token = localStorage.getItem('token')
        console.log(token)
        return token
    }).catch(function(err: Error) {
        console.log('If this is printed, it probably means that you used invalid ' +
        'clientId and clientSecret values. Please check!');
        console.log('Hint: ');
        console.log(err);
    });

    module.exports = {
        token: token
    }

// spotifyApi.clientCredentialsGrant().
// then((data: { body: { [x: string]: any; }; }) => {
//   const access_token = data.body['access_token'];
//   const expires_in = data.body['expires_in'];

//   spotifyApi.setAccessToken(access_token);

//   // console.log(
//   //   `Sucessfully retreived access token. Expires in ${expires_in} s.`
//   // );

//   setInterval(async () => {
//     const data = await spotifyApi.refreshAccessToken();
//     const access_token = data.body['access_token'];

//     console.log('The access token has been refreshed!');
//     console.log('access_token:', access_token);
//     spotifyApi.setAccessToken(access_token);
//   }, expires_in / 2 * 1000);
// })
// .catch((error: any) => {
//   console.error('Error getting Tokens:', error);
// });

