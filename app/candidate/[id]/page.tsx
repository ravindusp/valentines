'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import Profile from '@/components/Profile';
import Toast from '@/components/Toast';
import { castVoteForCandidate, fetchCandidateById } from '@/lib/client/api';
import { Candidate } from '@/types';

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');

  const loadCandidate = async (id: string) => {
    const item = await fetchCandidateById(id);
    setCandidate(item);
  };

  useEffect(() => {
    if (!candidateId) {
      return;
    }

    loadCandidate(candidateId).catch((error) => {
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to load candidate.');
    });
  }, [candidateId]);

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

  const onCastVote = async (id: string) => {
    try {
      setIsVoting(true);
      const response = await castVoteForCandidate(id);
      setFeedbackType('success');
      setFeedbackMessage(response.message);
      await loadCandidate(id);
    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Vote failed.');
    } finally {
      setIsVoting(false);
    }
  };

  if (!candidateId) {
    return <div className="max-w-7xl mx-auto p-6">Invalid candidate route.</div>;
  }

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {feedbackMessage || 'Loading candidate...'}
      </div>
    );
  }

  return (
    <>
      <Toast
        message={feedbackMessage}
        type={feedbackType}
        onClose={() => setFeedbackMessage('')}
      />
      <Profile candidate={candidate} onCastVote={onCastVote} isVoting={isVoting} />
    </>
  );
}
