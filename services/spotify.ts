const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const getAccessToken = async (code: string) => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('redirect_uri', redirect_uri);
  params.append('grant_type', 'authorization_code');

  var authOptions: RequestInit = {
    method: 'POST',
    body: params,
    headers: {
      Authorization: `Basic ${basic}`,
    },
  };

  const tokenResponse = await fetch(
    'https://accounts.spotify.com/api/token',
    authOptions
  );

  return await tokenResponse.json();
};
