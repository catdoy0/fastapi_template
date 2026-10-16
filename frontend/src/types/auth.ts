export type Role =
| "SUPER_ADMIN"
| "ADMIN"
| "CUSTOMER";

export interface UserSession {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}


export interface SignUpPayload {
  email: string;
  password: string;
  confirm_password: string;
}
