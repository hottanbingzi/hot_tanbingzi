
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  skills: string[];
}
