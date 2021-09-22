// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkStatus from '@/utils/checkStatus';
import type { NextApiRequest, NextApiResponse } from 'next';

const RefreshController = async (req: NextApiRequest, res: NextApiResponse) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  const authToken = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  if (refresh_token && !Array.isArray(refresh_token)) {
    params.append('refresh_token', refresh_token);
  }
  const response = await fetch(
    `https://accounts.spotify.com/api/token`,
    {
      method: 'POST',
      body: params,
      headers: {
        Authorization: 'Basic ' + authToken,
      },
    }
  );
  checkStatus(response);
  const data = await response.json();
  res.json({ access_token: data.access_token });
};

export default RefreshController;
