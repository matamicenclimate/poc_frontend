export type MagicUser = {
  issuer: string;
  publicAddress: string;
  email: string;
  isMfaEnabled: boolean;
  phoneNumber: null | string;
};

export type UserResponse = {
  jwt: string;
  user: MagicUser;
};

export interface StrapiUser {
  confirmed?: boolean;
  blocked?: boolean;
  _id?: string;
  username?: string;
  email?: string;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  role?: Role;
  id?: string;
  type?: 'buyer' | 'developer';
  first_name?: string;
  last_name?: string;
  avatar?: AvatarClass;
}

interface Role {
  _id?: string;
  name?: string;
  description?: string;
  type?: string;
  __v?: number;
  id?: string;
}

export interface Avatar {
  confirmed: boolean;
  blocked: boolean;
  type: string;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  role: Role;
  first_name: string;
  last_name: string;
  avatar: AvatarClass;
  id: string;
  magic_user: MagicUser;
}

export interface AvatarClass {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: Formats;
  provider: string;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export type AuthUser = StrapiUser & { magic_user: MagicUser };
