import { Country } from '@/features/documents';

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
  name?: string;
  surname?: string;
  avatar?: AvatarClass;
  alias?: string;
  city?: string;
  country?: Country;
  bio?: string;
  personal_URL?: string;
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
  name: string;
  surname: string;
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
