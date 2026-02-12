import { Candidate, CandidatesResponse, VoteResponse } from '@/types';
import { getDeviceId } from '@/lib/client/device-id';

interface CandidatePayload {
  candidate: Candidate;
}

const apiRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-device-id': getDeviceId(),
      ...(init?.headers || {}),
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload as T;
};

export const fetchCandidates = async (limit?: number) => {
  const query = typeof limit === 'number' ? `?limit=${limit}` : '';
  return apiRequest<CandidatesResponse>(`/api/candidates${query}`);
};

export const fetchCandidateById = async (id: string) => {
  const payload = await apiRequest<CandidatePayload>(`/api/candidates/${id}`);
  return payload.candidate;
};

export const castVoteForCandidate = async (candidateId: string) => {
  return apiRequest<VoteResponse>('/api/vote', {
    method: 'POST',
    body: JSON.stringify({ candidateId }),
  });
};
