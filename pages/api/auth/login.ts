// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import generateRandomString from '@/utils/generateRandomString';
import { setCookie } from '@/utils/cookies';


const LoginController = (_req: NextApiRequest, res: NextApiResponse) => {
  var state = generateRandomString(16);

  setCookie(res, 'spotify_auth_state', state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
  params.append('scope', scope);
  params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
  params.append('state', state);
  res.redirect(
    'https://accounts.spotify.com/authorize?' + params.toString()
  );
};

export default LoginController;

