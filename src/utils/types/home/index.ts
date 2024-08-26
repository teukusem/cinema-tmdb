export interface NowPlaying {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_title?: string;
}

export interface NowPlayingMovieApiResponse {
  results: NowPlaying[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface RequestSessionResponse {
  success: boolean;
  session_id: string;
}

export interface ValidateTokenPayload {
  username: string;
  password: string;
  request_token: string;
}
