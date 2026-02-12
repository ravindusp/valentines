'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Gallery from '@/components/Gallery';
import { castVoteForCandidate, fetchCandidates } from '@/lib/client/api';
import { Candidate } from '@/types';

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeVoteCandidateId, setActiveVoteCandidateId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const loadCandidates = async () => {
    const items = await fetchCandidates();
    setCandidates(items);
  };

  useEffect(() => {
    loadCandidates().catch((error) => {
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to load candidates.');
    });
  }, []);

  const onCastVote = async (candidateId: string) => {
    try {
      setActiveVoteCandidateId(candidateId);
      const response = await castVoteForCandidate(candidateId);
      setFeedbackMessage(response.message);
      await loadCandidates();
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Vote failed.');
    } finally {
      setActiveVoteCandidateId(null);
    }
  };

  return (
    <>
      {feedbackMessage && (
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-slate-700">
            {feedbackMessage}
          </div>
        </div>
      )}
      <Gallery
        onNavigateToProfile={(id) => {
          router.push(`/candidate/${id}`);
          window.scrollTo(0, 0);
        }}
        onCastVote={onCastVote}
        activeVoteCandidateId={activeVoteCandidateId}
        candidates={candidates}
      />
    </>
  );
}
