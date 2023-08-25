import { User } from "./user";

export interface Post {
  createdAt: string;
  deletedAt: string;
  id: number;
  content: string | null;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  reply: Post | null;
  liked: boolean;
  reposted: boolean;
  user: User; 
  replyParent: Post | null;
  repostParent: Post | null;
  imageName: string;
}

export interface Repost extends Omit<Post, 'repostParent'> {
  repostParent: Post
}

export interface Reply extends Omit<Post, 'replyParent'> {
  replyParent: Post
}