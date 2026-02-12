'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Home from '@/components/Home';
import { fetchCandidates } from '@/lib/client/api';
import { Candidate } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const items = await fetchCandidates(4);
        setCandidates(items);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load candidates.');
      }
    };

    void load();
  }, []);

  return (
    <>
      {errorMessage && (
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        </div>
      )}
      <Home
        onNavigateToGallery={() => {
          router.push('/candidates');
          window.scrollTo(0, 0);
        }}
        onNavigateToProfile={(id) => {
          router.push(`/candidate/${id}`);
          window.scrollTo(0, 0);
        }}
        candidates={candidates}
      />
    </>
  );
}
