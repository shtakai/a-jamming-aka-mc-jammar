import { CLIENT_ID, REDIRECT_URI } from './config';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const { matchToken, matchExpire } = getTokenAndExpire()
    accessToken = matchToken ? matchToken[1] : null;
    expiresIn = matchExpire ? matchExpire[1] : null;

    if (accessToken && expiresIn) {
      window.setTimeout(() => accessToken = '', Number(expiresIn) * 1000);
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

  savePlayList(name, trackUris) {
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
