'use client'

import { AbstractApiService } from "./abstract-api-service"
import Cookies from "js-cookie"
import { Post } from "@/types/post"
import { Follow } from "@/types/follow"
import authService from "./auth-service"

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1"

class ClientApiService extends AbstractApiService {

  constructor() {
    super()
  }

  getApiHeaders = () => {
    const authToken = Cookies.get("authToken")
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken,
    }
  }

  getFeed = (offset: number, limit: number): Promise<Post[]> =>
    this.get(`${apiUrl}/post/feed?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  getUserPosts = (offset: number, limit: number, id: number): Promise<Post[]> => 
    this.get(`${apiUrl}/user/${id}/posts?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })
  
  likePost = async (postId: number): Promise<Post> => this.post(`${apiUrl}/post/${postId}/like`)
  
  createPost = async (content: string): Promise<Post> => this.post(`${apiUrl}/post`, JSON.stringify({content}))

  postReply = async (content: string, postId: number): Promise<Post> => this.post(`${apiUrl}/post/${postId}/reply`, JSON.stringify({content}))

  repostPost = async (postId: number): Promise<Post> => this.post(`${apiUrl}/post/${postId}/repost`)

  followUser = async (userId: number): Promise<Follow> => this.post(`${apiUrl}/user/${userId}/follow`)

  getPost = (id: number): Promise<Post> => this.get(`${apiUrl}/post/${id}`)

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
