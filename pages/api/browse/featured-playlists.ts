import SpotifyClient from '@/services/spotify';
import { NoSessionError } from '@/services/spotify/errors';
import isAxiosError from '@/utils/isAxiosError';
import { NextApiRequest, NextApiResponse } from 'next';

const NewReleasesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const client = new SpotifyClient({ req, res });
    const response = await client.getAllFeaturedPlaylists({ limit: 5 });
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof NoSessionError) {
      res.status(401).json({ error: 'no session was available' });
    } else if (isAxiosError(error) && error.response?.status === 401) {
      res.redirect(307, '/login');     
    } else {
      res.status(400).json({ error: 'Ops something went wrong' });
    }
  }
};

export default NewReleasesHandler;
