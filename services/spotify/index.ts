import isAxiosError from '@/utils/isAxiosError';
import axios, { Method } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { ContextMissingError, NoSessionError } from './errors';
import { AuthorizationResponse, GetAllNewReleases } from './models';

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

class SpotifyClient {
  private version = 'v1';
  private apiUrl = `https://api.spotify.com/${this.version}`;
  private axios = axios.create({ baseURL: this.apiUrl });
  private context: null | Context = null;
  private country: string = '';

  constructor(ctx?: Context, country: string = 'SE') {
    if (ctx) {
      this.context = ctx;
    }

    this.country = country;
  }

  private async get<T>(
    url: string,
    params?: URLSearchParams,
    method: Method = 'get'
  ) {
    if (!this.context) {
      throw new ContextMissingError('Context missing');
    }

    // Get session from next-auth
    const session = await getSession(this.context);

    // If we are missing an access token that means we are not logged in
    if (!session || !session.accessToken) {
      throw new NoSessionError('No session');
    }

    // Check if we have a country specified and if not append default
    const existingParams = new URLSearchParams(params);
    if (!existingParams.has('country')) {
      existingParams.append('country', this.country);
    }

    // Perform actual request
    const response = await this.axios.get<T>(url, {
      method,
      params: existingParams,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return response;
  }

  static async refreshAccessToken(token: JWT) {
    try {
      const url = 'https://accounts.spotify.com/api/token';

      const authToken = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const params = new URLSearchParams()
      params.append('grant_type', 'refresh_token');
      
      if ( typeof token.refreshToken === 'string' ) {
        params.append('refresh_token', token.refreshToken)
      }

      const response = await axios.post<AuthorizationResponse>(url, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return {
        ...token,
        accessToken: response.data.access_token,
        accessTokenExpires: Date.now() + response.data.expires_in * 1000,
        refreshToken: response.data.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      
      if ( isAxiosError(error) ) {
        console.error(error.message, error.response?.data)
      }

      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  }

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @returns albums
   */
  getAllNewReleases(args?: { limit?: number; offset?: number }) {
    const params = new URLSearchParams();

    if (args?.limit) {
      params.append('limit', args.limit.toString());
    }

    if (args?.offset) {
      params.append('offset', args.offset.toString());
    }

    return this.get<GetAllNewReleases>('/browse/new-releases', params);
  }
}

export default SpotifyClient;
