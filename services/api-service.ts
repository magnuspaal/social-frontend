import { cookies, headers } from "next/headers"
import { AbstractApiService } from "./abstract-api-service"
import { User } from "@/types/user"
import { Post } from "@/types/post"
import { redirect } from "next/navigation"

const apiUrl = process.env.API_URL ?? "http://localhost:8081/api/v1"

class ApiService extends AbstractApiService {
  getApiHeaders = () => {
    const authToken = cookies().get("authToken")
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken?.value,
    }
  }

  getFeed = (offset: number, limit: number): Promise<Post[]> => this.get(`${apiUrl}/post/feed?offset=${offset}&limit=${limit}`)

  getPost = (id: number): Promise<Post> => this.get(`${apiUrl}/post/${id}`)

  getPostReplies = (id: number, offset: number, limit: number): Promise<Post[]> => this.get(`${apiUrl}/post/${id}/replies?offset=${offset}&limit=${limit}`)

  getAccounts = (): Promise<User[]> => this.get(`${apiUrl}/user`)

  getMe = (): Promise<User> => this.get(`${apiUrl}/user/me`, { next: { revalidate: 0, tags: ['me'] } } )

  getUser = (id: number): Promise<User> => this.get(`${apiUrl}/user/${id}`, { next: { revalidate: 0 } })

  getUserFollowers = (id: number): Promise<User[]> => this.get(`${apiUrl}/user/${id}/followers`)

  getUserFollowing = (id: number): Promise<User[]> => this.get(`${apiUrl}/user/${id}/following`)

  handleResponseError = async (res: Response): Promise<boolean> => {
    if ([401, 403].includes(res.status)) {
      redirect(`/login`)
    }
    return Promise.resolve(false)
  }
}

const apiService = new ApiService()
export default apiService

