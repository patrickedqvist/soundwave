import { serialize, CookieSerializeOptions, parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * This sets `cookie` using the `res` object
 */

export function setCookie(
  res: NextApiResponse,
  tokenName: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge = options.maxAge;
  }

  const cookie = serialize(tokenName, String(stringValue), options);

  res.setHeader('Set-Cookie', cookie);
}

export function removeCookie(res: NextApiResponse, tokenName: string) {
  const cookie = serialize(tokenName, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getTokenCookie(req: NextApiRequest, tokenName: string) {
  const cookies = parseCookies(req);
  return cookies[tokenName];
}
