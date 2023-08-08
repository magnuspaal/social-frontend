'use client'
import { User } from "@/types/user";
import ProfileImageUpload from "./ProfileImageUpload";

export default function ProfileSettings({ user, dict }: {user: User, dict: any}) {

  return (
    <div>
      <ProfileImageUpload user={user} dict={dict}></ProfileImageUpload>
    </div>
  )
}