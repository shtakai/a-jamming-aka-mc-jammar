// import { SPOTIFY_ACCESS_TOKEN } from './config';
let accessToken = null;
let expiresIn = null;

const Spotify = {
  getAccessToken() {
    console.log(`getAccessToken`)
    if (accessToken !== null) {
      return accessToken;
    }
    const { matchToken, matchExpire } = getTokenAndExpire()
    accessToken = matchToken ? matchToken[0] : null;
    expiresIn = matchExpire ? matchExpire[0] : null;
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  },
};

const getTokenAndExpire = () => {
  const matchToken = window.location.href.match(/access_token=([^&]*)/)
  const matchExpire = window.location.href.match(/expires_in=([^&]*)/)
  // console.log(`matchToken:${matchToken} / matchExpire:${matchExpire}`)
  return {
    matchToken,
    matchExpire
  };
}

export default Spotify;
