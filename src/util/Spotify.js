import { CLIENT_ID, REDIRECT_URI } from './config';

let accessToken;
let expiresIn;
const DEFAULT_EXPIRES_IN = 10; // spotify's default expires_in(an hour)
const EXPIRES_AT = 'expires_at'; // key of expires_at for sessionStorage

const Spotify = {
  getAccessToken() {
    // FIXME MORE ELEGANT WAY.
    const { matchToken, matchExpire } = getTokenAndExpire();
    expiresIn = matchExpire ? matchExpire[1] : null;
    expiresIn = expiresIn || DEFAULT_EXPIRES_IN;

    let expiresAt = sessionStorage.getItem(EXPIRES_AT);
    if (!expiresAt) {
      expiresAt = Date.now() + Number(expiresIn) * 1000;
      sessionStorage.setItem(EXPIRES_AT, expiresAt);
    }

    if (Date.now() > expiresAt) {
      sessionStorage.removeItem(EXPIRES_AT);
    }

    if (accessToken && (Date.now() < expiresAt)) {
      return accessToken;
    }

    accessToken = matchToken ? matchToken[1] : null;

    if (accessToken) {
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    const redirectUri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-public`;
    window.location = redirectUri;
  },

  search(term) {
    accessToken = this.getAccessToken();
    term = term.replace(' ', '%20');

    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return fetch(searchUrl, headers)
    .then(response => response.json())
    .then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => (
        {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          imageUrl: track.album.images[2].url,
        }
      ));
    });
  },

  async savePlayList(name, trackUris) {
    if (!name || !trackUris || trackUris.length === 0) {
      return;
    }

    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    let userId = undefined;
    let playlistId = undefined;

    fetch(userUrl, {
      headers: headers,
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name,
          })
        })
      .then(response => response.json())
      .then(jsonResponse => playlistId = jsonResponse.id)
      .then(() => {
        const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        fetch(addPlaylistTracksUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackUris,
          })
        });
      });
    });
  },
};

const getTokenAndExpire = () => {
  const matchToken = window.location.href.match(/access_token=([^&]*)/)
  const matchExpire = window.location.href.match(/expires_in=([^&]*)/)
  return {
    matchToken,
    matchExpire,
  };
}

export default Spotify;
