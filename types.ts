export interface Candidate {
  id: string;
  name: string;
  image: string;
  department: string;
  role: string;
  votes: number;
  description: string;
  isTrending?: boolean;
  hasVoted?: boolean;
  hasVotedAt?: string | null;
  rank?: number;
}

export interface VoteResponse {
  ok: boolean;
  message: string;
  votes?: number;
  hasVoted?: boolean;
  hasVotedAt?: string | null;
}
