export default interface Iuser {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
}

export interface InewUser {
  displayName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface Icredentials {
  displayName: string;
  password: string;
}
