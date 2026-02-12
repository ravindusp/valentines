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
  rank?: number;
}

export type ViewState = 'HOME' | 'GALLERY' | 'PROFILE';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: Comment[];
}