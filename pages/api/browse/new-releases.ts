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
    const response = await client.getAllNewReleases({ limit: 5 });
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof NoSessionError) {
      res.redirect('/login');
    } else if (isAxiosError(error) && error.response?.status === 401) {
      res.redirect('/login');
    } else {
      res.status(400).json({ error: 'Ops something went wrong' });
    }
  }
};

export default NewReleasesHandler;
