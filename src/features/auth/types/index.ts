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
}

interface Role {
  _id?: string;
  name?: string;
  description?: string;
  type?: string;
  __v?: number;
  id?: string;
}

export type AuthUser = StrapiUser & { magic_user: MagicUser };
