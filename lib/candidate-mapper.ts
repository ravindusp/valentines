import { Candidate } from '@/types';

interface CandidateRow {
  id: string;
  name: string;
  image: string;
  department: string;
  role: string;
  description: string;
  vote_count: number;
  is_trending: boolean | null;
  rank: number | null;
}

export const mapCandidateRow = (
  row: CandidateRow,
  votedCandidateMap?: Map<string, string>
): Candidate => {
  const votedAt = votedCandidateMap?.get(row.id) || null;

  return {
    id: row.id,
    name: row.name,
    image: row.image,
    department: row.department,
    role: row.role,
    description: row.description,
    votes: row.vote_count || 0,
    isTrending: !!row.is_trending,
    rank: row.rank || undefined,
    hasVoted: Boolean(votedAt),
    hasVotedAt: votedAt,
  };
};
