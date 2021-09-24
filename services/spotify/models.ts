/**
 * Generics
 */

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Followers {
  href: null;
  total: number;
}

export interface PaginatedResult<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

/**
 * Athorization response
 */
export interface AuthorizationResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * Artist
 */
export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
}

/**
 * Playlist
 */
export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

/**
 * Responses
 */

export interface GetAllNewReleases {
  albums: PaginatedResult<Album>;
}

export interface GetAllFeaturedPlaylists {
  message: string;
  playlists: PaginatedResult<Playlist>;
}
