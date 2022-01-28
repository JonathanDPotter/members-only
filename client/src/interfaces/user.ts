export default interface Iuser {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  member: boolean;
  admin: boolean;
  createdAt: Date;
}

export interface InewUser {
  displayName: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  member: boolean;
  admin: boolean;
}

export interface Icredentials {
  displayName: string;
  password: string;
}

export interface InewData {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  image?: string;
  member?: boolean;
  admin?: boolean;
}
