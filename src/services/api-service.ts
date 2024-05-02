

import { Post } from "@/types/post"
import { Follow } from "@/types/follow"
import { Search } from "@/types/search"
import { User } from "@/types/user"
import { AbstractApiService } from "./abstract-api-service"
import { AuthContext } from "@/providers/auth-provider"
import { useContext } from "react"

class ApiService extends AbstractApiService {

  constructor(
    handleTokenRefresh: () => Promise<boolean>
  ) {
    super(import.meta.env.VITE_API_URL, handleTokenRefresh)
  }

  getMe = (): Promise<User> => this.get(`/user/me`)

  getFeed = (offset: number, limit: number): Promise<Post[]> =>
    this.get(`/post/feed?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  getUserPosts = (offset: number, limit: number, id?: number): Promise<Post[]> => 
    this.get(`/user/${id}/posts?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })
  
  likePost = async (postId: number): Promise<Post> => this.post(`/post/${postId}/like`)
  
  createPost = async (body: FormData): Promise<Post> => this.post(`/post`, body)

  postReply = async (body: FormData, postId: number): Promise<{replyParent: Post, reply: Post}> => this.post(`/post/${postId}/reply`, body)

  repostPost = async (postId: number): Promise<Post> => this.post(`/post/${postId}/repost`)

  followUser = async (userId: number): Promise<Follow> => this.post(`/user/${userId}/follow`)

  getPost = (id: number): Promise<Post> => this.get(`/post/${id}`)

  uploadProfileImage = (userId: number, body: FormData) => this.post(`/user/${userId}/upload-image`, body)

  search = (keyword: string): Promise<Search> => this.get(`/search/${keyword}`)

  getUserFollowers = (id: number): Promise<User[]> => this.get(`/user/${id}/followers`)

  getUserFollowing = (id: number): Promise<User[]> => this.get(`/user/${id}/following`)

  getPostReplies = (offset: number, limit: number, id?: number): Promise<Post[]> => this.get(`/post/${id}/replies?offset=${offset}&limit=${limit}`)

  getUser = (id: number): Promise<User> => this.get(`/user/${id}`)
  
  getUsers = (): Promise<User[]> => this.get(`/user`)
}

const useApiService = () => {
  const { handleTokenRefresh } = useContext(AuthContext);
  return new ApiService(handleTokenRefresh)
} 

export default useApiService
