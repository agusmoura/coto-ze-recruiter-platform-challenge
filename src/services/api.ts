import type { CandidatesResponse } from "@/types/candidate";
import type {
  RolesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "@/types/message";

const CANDIDATES_API_BASE_URL = import.meta.env.VITE_CANDIDATES_API_BASE_URL;

export async function getUserList(): Promise<CandidatesResponse> {
  const response = await fetch(`${CANDIDATES_API_BASE_URL}/userlist`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  // La API devuelve un array directo, no wrapeado
  return response.json();
}

export async function getRolesList(): Promise<RolesResponse> {
  const response = await fetch(`${CANDIDATES_API_BASE_URL}/roleslist`);

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  return response.json();
}

export async function sendMessage(
  data: SendMessageRequest,
): Promise<SendMessageResponse> {
  const response = await fetch(`${CANDIDATES_API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
}
