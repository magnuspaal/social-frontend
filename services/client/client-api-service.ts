'use client'

import { Post } from "@/types/post"
import { Follow } from "@/types/follow"
import { ConfigService } from "../config-service"
import { Search } from "@/types/search"
import { AbstractClientApiService } from "./abstract-client-api-service"

class ClientApiService extends AbstractClientApiService {

  constructor() {
    super(ConfigService.getApiUrl())
  }

  getFeed = (offset: number, limit: number): Promise<Post[]> =>
    this.get(`/post/feed?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  getUserPosts = (offset: number, limit: number, id: number): Promise<Post[]> => 
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
}

const useClientApiService = () => {
  const clientApiService = new ClientApiService()
  return clientApiService
} 

export default useClientApiService
