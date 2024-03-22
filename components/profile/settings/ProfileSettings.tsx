'use client'
import { User } from "@/types/user";
import ProfileImageUpload from "./ProfileImageUpload";

export default function ProfileSettings({ user }: {user: User }) {

  return (
    <div>
      <ProfileImageUpload user={user}></ProfileImageUpload>
    </div>
  )
}