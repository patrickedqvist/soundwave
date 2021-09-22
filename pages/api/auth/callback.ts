// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { removeCookie } from '@/utils/cookies';
import checkStatus from '@/utils/checkStatus';
import { getAccessToken } from '@/services/spotify';

const CallbackController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#?error=state_mismatch');
  } else {
    removeCookie(res, 'spotify_auth_state');

    try {
      if (!code || Array.isArray(code)) {
        throw Error('missformed code');
      }

      const tokenResponse = await getAccessToken(code);

      checkStatus(tokenResponse);

      const data: Record<string, string | number> = await tokenResponse.json();

      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'number') {
          params.append(key, value.toString());
        } else {
          params.append(key, value);
        }
      }

      if (typeof data.expires_in === 'number') {
        params.append(
          'expired_at',
          new Date(Date.now() + data.expires_in).toString()
        );
      }

      res.redirect(`/auth/callback?${params.toString()}`);
    } catch (error) {
      console.error(error);
      res.redirect('/#?error=invalid_token');
    }
  }
};

export default CallbackController;
