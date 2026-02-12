'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Gallery from '@/components/Gallery';
import Toast from '@/components/Toast';
import { castVoteForCandidate, fetchCandidates } from '@/lib/client/api';
import { Candidate } from '@/types';

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeVoteCandidateId, setActiveVoteCandidateId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');

  const loadCandidates = async () => {
    const items = await fetchCandidates();
    setCandidates(items);
  };

  useEffect(() => {
    loadCandidates().catch((error) => {
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to load candidates.');
    });
  }, []);

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedbackMessage('');
    }, 4500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [feedbackMessage]);

  const onCastVote = async (candidateId: string) => {
    try {
      setActiveVoteCandidateId(candidateId);
      const response = await castVoteForCandidate(candidateId);
      setFeedbackType('success');
      setFeedbackMessage(response.message);
      await loadCandidates();
    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Vote failed.');
    } finally {
      setActiveVoteCandidateId(null);
    }
  };

  return (
    <>
      <Toast
        message={feedbackMessage}
        type={feedbackType}
        onClose={() => setFeedbackMessage('')}
      />
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
