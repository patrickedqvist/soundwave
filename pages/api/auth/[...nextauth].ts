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
  'playlist-read-collaborative',
];

const providers = [
  SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
    async jwt({ token, account }) {
      if (account) {
        token.id = account.userId;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if ( user ) {
        session.user = user;
      }    
      session.accessToken = token.accessToken;
      console.log('session', session);
      return session;
    }
  },
};


const NextAuthHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export default NextAuthHandler;
