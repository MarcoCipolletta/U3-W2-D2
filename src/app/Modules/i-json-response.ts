import { iPost } from './i-post';

export interface iJsonResponse {
  posts: iPost[];
  total: number;
  skip: number;
  limit: number;
}
