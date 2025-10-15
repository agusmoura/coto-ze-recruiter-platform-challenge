export interface SendMessageRequest {
  role: string;
  msj: string;
  email: string;
}

export interface SendMessageResponse {
  id: number;
  role: string;
  status: string;
  msj: string;
  submitted_at: string;
}

export interface SendMessageError {
  error: string;
  message: string;
}

export interface RolesResponse {
  roles: string[];
}
