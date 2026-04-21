export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostCreate = Omit<Post, "id">;
export type PostUpdate = Partial<Omit<Post, "id">>;
