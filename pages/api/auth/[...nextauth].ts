import SpotifyClient from '@/services/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const SpotifyScopes = [
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-follow-read',
  'playlist-read-private',
  'user-read-email',
  'user-read-private',
  'user-library-read',
];

const providers = [
  SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    // @ts-expect-error
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    // @ts-ignore
    scope: SpotifyScopes.join(' '),
  }),
];

const options: NextAuthOptions = {
  // Configure one or more authentication providers
  providers,
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    signingKey: JSON.stringify({
      kty: 'oct',
      kid: 'nwv-Hr2ybVB3bSP8wFLOcpM7Cw4MBAdtzBbRrbnxtd0',
      alg: 'HS512',
      k: 'Rxsjybn4jcllq0Nx1AwiAtCoUbyhTWtfCERRJlZHDTM',
    }),
    verificationOptions: {
      algorithms: ['HS512'],
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {

      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          // @ts-expect-error
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      
      // Return previous token if the access token has not expired yet
      // @ts-expect-error
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return SpotifyClient.refreshAccessToken(token);
    },
    async session({ session, token }) {
      // @ts-expect-error
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    }
  },
};


const NextAuthHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export default NextAuthHandler;
