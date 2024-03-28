import { cookies } from "next/headers"
import { User } from "@/types/user"
import { Post } from "@/types/post"
import { ConfigService } from "../config-service"
import { AbstractServerApiService } from "./abstract-server-api-service"

class ServerApiService extends AbstractServerApiService {

  constructor() {
    super(ConfigService.getApiUrl())
  }

  getApiHeaders = () => {
    const authToken = cookies().get("authToken")
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken?.value,
    }
  }

  getFeed = (offset: number, limit: number): Promise<Post[]> => this.get(`/post/feed?offset=${offset}&limit=${limit}`)

  getPost = (id: number): Promise<Post> => this.get(`/post/${id}`)

  getPostReplies = (id: number, offset: number, limit: number): Promise<Post[]> => this.get(`/post/${id}/replies?offset=${offset}&limit=${limit}`)

  getUsers = (): Promise<User[]> => this.get(`/user`, { next: { revalidate: 0 } })

  getMe = (): Promise<User> => this.get(`/user/me`, { next: { revalidate: 0 } } )

  getUser = (id: number): Promise<User> => this.get(`/user/${id}`, { next: { revalidate: 0 } })

  getUserFollowers = (id: number): Promise<User[]> => this.get(`/user/${id}/followers`)

  getUserFollowing = (id: number): Promise<User[]> => this.get(`/user/${id}/following`)
}

const serverApiService = new ServerApiService()
export default serverApiService

