'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

import { Candidate } from '@/types';

interface SessionPayload {
  authenticated: boolean;
  configured: boolean;
  username?: string;
  message?: string;
}

interface CandidateFormState {
  name: string;
  department: string;
  role: string;
  description: string;
  rank: string;
  votes: string;
  isTrending: boolean;
}

const initialFormState: CandidateFormState = {
  name: '',
  department: '',
  role: '',
  description: '',
  rank: '',
  votes: '0',
  isTrending: false,
};

const parseJsonResponse = async <T,>(response: Response): Promise<T> => {
  const payload = (await response.json().catch(() => ({}))) as T & { message?: string };

  if (!response.ok) {
    const message = (payload as { message?: string }).message || 'Request failed.';
    throw new Error(message);
  }

  return payload;
};

export default function AdminPage() {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [form, setForm] = useState<CandidateFormState>(initialFormState);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const isAuthenticated = Boolean(session?.authenticated);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => b.votes - a.votes);
  }, [candidates]);

  const loadSession = async () => {
    const response = await fetch('/api/admin/session', { cache: 'no-store' });
    const payload = await parseJsonResponse<SessionPayload>(response);
    setSession(payload);
    return payload;
  };

  const loadCandidates = async () => {
    const response = await fetch('/api/admin/candidates', { cache: 'no-store' });
    const payload = await parseJsonResponse<{ candidates: Candidate[] }>(response);
    setCandidates(payload.candidates);
  };

  useEffect(() => {
    loadSession()
      .then((payload) => {
        if (payload.authenticated) {
          return loadCandidates();
        }
        return undefined;
      })
      .catch((error) => {
        setFeedbackMessage(error instanceof Error ? error.message : 'Failed to load admin state.');
      });
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setFeedbackMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      await parseJsonResponse<{ ok: boolean; username: string }>(response);
      setLoginPassword('');
      setLoginUsername('');

      const payload = await loadSession();
      if (payload.authenticated) {
        await loadCandidates();
      }

      setFeedbackMessage('Logged in as admin.');
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setFeedbackMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      await parseJsonResponse<{ ok: boolean }>(response);
      setCandidates([]);
      await loadSession();
      setFeedbackMessage('Logged out.');
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Logout failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCandidate = async (event: FormEvent) => {
    event.preventDefault();
    setFeedbackMessage('');

    if (!selectedImage) {
      setFeedbackMessage('Please choose an image for the contender.');
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadBody = new FormData();
      uploadBody.append('file', selectedImage);

      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadBody,
      });

      const uploadPayload = await parseJsonResponse<{ imageUrl: string }>(uploadResponse);

      const createResponse = await fetch('/api/admin/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          department: form.department,
          role: form.role,
          description: form.description,
          rank: form.rank,
          votes: form.votes,
          isTrending: form.isTrending,
          image: uploadPayload.imageUrl,
        }),
      });

      await parseJsonResponse<{ message: string }>(createResponse);

      setForm(initialFormState);
      setSelectedImage(null);
      const fileInput = document.getElementById('candidate-image-input') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }

      await loadCandidates();
      setFeedbackMessage('Contender created successfully.');
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to create contender.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    const confirmed = window.confirm('Delete this contender? This cannot be undone.');
    if (!confirmed) {
      return;
    }

    setFeedbackMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/candidates/${candidateId}`, {
        method: 'DELETE',
      });
      await parseJsonResponse<{ message: string }>(response);
      await loadCandidates();
      setFeedbackMessage('Contender deleted.');
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to delete contender.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return <div className="max-w-7xl mx-auto px-6 py-10">Loading admin page...</div>;
  }

  return (
    <div className="bg-bg-light min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white border border-primary/10 rounded-3xl p-8 shadow-soft">
          <h1 className="font-serif text-4xl text-slate-900 mb-2">Admin Console</h1>
          <p className="text-slate-500">
            Manage contenders and image uploads for the public candidates page.
          </p>
        </div>

        {feedbackMessage && (
          <div className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-slate-700">
            {feedbackMessage}
          </div>
        )}

        {!session.configured && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800">
            {session.message ||
              'Admin auth is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in .env.local.'}
          </div>
        )}

        {session.configured && !isAuthenticated && (
          <form
            onSubmit={handleLogin}
            className="bg-white border border-primary/10 rounded-3xl p-8 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
            </div>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Username
              <input
                value={loginUsername}
                onChange={(event) => setLoginUsername(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="admin"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Password
              <input
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        )}

        {isAuthenticated && (
          <>
            <div className="bg-white border border-primary/10 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Logged In As</p>
                <p className="font-bold text-slate-900">{session.username}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full border border-primary/30 text-primary font-bold hover:bg-primary/5 disabled:opacity-60"
              >
                Logout
              </button>
            </div>

            <form
              onSubmit={handleCreateCandidate}
              className="bg-white border border-primary/10 rounded-3xl p-8 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-slate-900">Create Contender</h2>
              </div>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Full Name
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Department
                <input
                  value={form.department}
                  onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Role
                <input
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Rank (Optional)
                <input
                  value={form.rank}
                  onChange={(event) => setForm((prev) => ({ ...prev, rank: event.target.value }))}
                  type="number"
                  min={1}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Initial Votes
                <input
                  value={form.votes}
                  onChange={(event) => setForm((prev) => ({ ...prev, votes: event.target.value }))}
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input
                  checked={form.isTrending}
                  onChange={(event) => setForm((prev) => ({ ...prev, isTrending: event.target.checked }))}
                  type="checkbox"
                  className="h-4 w-4"
                />
                Mark as Trending
              </label>

              <label className="md:col-span-2 flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Description
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>

              <label className="md:col-span-2 flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Candidate Image
                <input
                  id="candidate-image-input"
                  onChange={(event) => setSelectedImage(event.target.files?.[0] || null)}
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                  required
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : 'Create Contender'}
                </button>
              </div>
            </form>

            <section className="bg-white border border-primary/10 rounded-3xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Current Contenders</h2>

              {sortedCandidates.length === 0 ? (
                <p className="text-slate-500">No contenders found yet.</p>
              ) : (
                <div className="grid gap-4">
                  {sortedCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{candidate.name}</p>
                          <p className="text-sm text-slate-500">
                            {candidate.role} • {candidate.department}
                          </p>
                          <p className="text-xs uppercase text-slate-400 tracking-wide">
                            {candidate.votes.toLocaleString()} votes
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        disabled={isSubmitting}
                        className="px-5 py-2 rounded-lg border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
