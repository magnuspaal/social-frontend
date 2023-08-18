'use client'

import { AbstractApiService } from "./abstract-api-service"
import Cookies from "js-cookie"
import { Post } from "@/types/post"
import { Follow } from "@/types/follow"
import authService from "./auth-service"
import { ConfigService } from "./config-service"

class ClientApiService extends AbstractApiService {

  private apiUrl: string

  constructor() {
    super()
    this.apiUrl = ConfigService.getApiUrl()
  }

  getApiHeaders = () => {
    const authToken = Cookies.get("authToken")
    return {
      "Authorization": "Bearer " + authToken,
    }
  }

  getFeed = (offset: number, limit: number): Promise<Post[]> =>
    this.get(`${this.apiUrl}/post/feed?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  getUserPosts = (offset: number, limit: number, id: number): Promise<Post[]> => 
    this.get(`${this.apiUrl}/user/${id}/posts?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })
  
  likePost = async (postId: number): Promise<Post> => this.post(`${this.apiUrl}/post/${postId}/like`)
  
  createPost = async (body: FormData): Promise<Post> => this.post(`${this.apiUrl}/post`, body)

  postReply = async (body: FormData, postId: number): Promise<Post> => this.post(`${this.apiUrl}/post/${postId}/reply`, body)

  repostPost = async (postId: number): Promise<Post> => this.post(`${this.apiUrl}/post/${postId}/repost`)

  followUser = async (userId: number): Promise<Follow> => this.post(`${this.apiUrl}/user/${userId}/follow`)

  getPost = (id: number): Promise<Post> => this.get(`${this.apiUrl}/post/${id}`)

  uploadProfileImage = (userId: number, body: FormData) => this.post(`${this.apiUrl}/user/${userId}/upload-image`, body)

  handleResponseError = async (res: Response): Promise<boolean> => {
    if ([401, 403].includes(res.status)) {
      return authService.handleClientRefreshToken()
    }
    return Promise.resolve(false)
  }
}

const useClientApiService = () => {
  const clientApiService = new ClientApiService()
  return clientApiService
} 

export default useClientApiService
