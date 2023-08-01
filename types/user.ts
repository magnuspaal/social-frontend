export interface User {
  createdAt: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
  followerCount: number;
  followingCount: number;
  followed: boolean;
  imageName: string
}