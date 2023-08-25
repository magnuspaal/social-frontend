'use client'
import { User } from "@/types/user";
import ProfileImageUpload from "./ProfileImageUpload";

export default function ProfileSettings({ user, dict }: {user: User, dict: any}) {

  return (
    <div>
      <ProfileImageUpload dict={dict} user={user}></ProfileImageUpload>
    </div>
  )
}