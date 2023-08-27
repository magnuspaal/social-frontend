export interface User {
  createdAt: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
  followerCount: number;
  followingCount: number;
  followed: boolean;
  imageName: string;
  settings: UserSetting[]
}

export interface UserSetting {
  key: UserSettingsKey
  value: UserSettingsValue
}

export enum UserSettingsKey {
  POSTING_DISALLOWED = 'POSTING_DISALLOWED'
}

export enum UserSettingsValue {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}