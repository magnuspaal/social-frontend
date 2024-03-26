import { cookies } from "next/headers"
import { AbstractApiService } from "../abstract-api-service"
import { User } from "@/types/user"
import { Post } from "@/types/post"
import { redirect } from "next/navigation"
import { ConfigService } from "../config-service"

class ServerApiService extends AbstractApiService {

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

  getUsers = (): Promise<User[]> => this.get(`/user`)

  getMe = (): Promise<User> => this.get(`/user/me`, { next: { revalidate: 0 } } )

  getUser = (id: number): Promise<User> => this.get(`/user/${id}`, { next: { revalidate: 0 } })

  getUserFollowers = (id: number): Promise<User[]> => this.get(`/user/${id}/followers`)

  getUserFollowing = (id: number): Promise<User[]> => this.get(`/user/${id}/following`)

  handleResponseError = async (res: Response): Promise<boolean> => {
    return Promise.resolve(false)
  }

  handleTokenRefresh = (): Promise<boolean> => {
    redirect(`/login`)
  };
}

const serverApiService = new ServerApiService()
export default serverApiService

