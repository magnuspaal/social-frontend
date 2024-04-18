

import Loading from "@/components/common/Loading";
import UserPostList from "@/components/profile/UserPostList";
import { User } from "@/types/user";
import { useOutletContext } from "react-router-dom";

export default function ProfileHome() {

  const user = useOutletContext<User>();

  return (
    <div>{ user ? <UserPostList userId={user.id}/> : <Loading /> }</div>
  )
}