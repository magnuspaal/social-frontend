import Login from './app/login/Login'
import { Route, Routes } from 'react-router-dom'
import SearchPage from './app/search/SearchPage'
import HomePage from './app/HomePage'
import ChatPage from './app/chat/ChatPage'
import MainLayout from './app/MainLayout'
import ChatRoom from './app/chat/[id]/ChatRoom'
import ChatSettings from './app/chat/[id]/settings/ChatSettings'
import ChatLayout from './app/chat/ChatLayout'
import ProfileLayout from './app/profile/[id]/ProfileLayout'
import ProfileHome from './app/profile/[id]/ProfileHome'
import FollowersPage from './app/profile/[id]/followers/FollowersPage'
import FollowingPage from './app/profile/[id]/following/FollowingPage'
import PostPage from './app/post/[id]/PostPage'
import ProfileSettingsPage from './app/profile/settings/ProfileSettingsPage'
import { ProtectedRoute } from './ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="profile/:id" element={<ProfileLayout />}>
            <Route path="" element={<ProfileHome />}/>
            <Route path="followers" element={<FollowersPage />} />
            <Route path="following" element={<FollowingPage />} />
          </Route>
          <Route path="/profile/settings" element={<ProfileSettingsPage />} />
          <Route path="chat" element={<ChatLayout />}>
            <Route path="" element={<ChatPage />} />
            <Route path=":id" element={<ChatRoom />} />
            <Route path=":id/settings" element={<ChatSettings />}/>
          </Route>
          <Route path="post">
            <Route path=":id" element={<PostPage />}/>         
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
