export type User = {
  id: number;
  login: string;
  email: string;
  userImg: string | null;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  postImg: string | null;
  user: User;
  created_at: string;
  updated_at: string;
  tags: Tag[];
};

export type Tag = {
  id: number;
  name: string;
  posts: Post[];
};
