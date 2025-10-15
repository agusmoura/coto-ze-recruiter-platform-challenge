export interface Skill {
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Candidate {
  username: string;
  joined_at: string;
  skills: Skill[];
  score: number;
}

export type CandidatesResponse = Candidate[];
