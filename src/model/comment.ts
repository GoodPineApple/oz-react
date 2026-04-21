export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentCreate {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentUpdate = Partial<Omit<Comment, "id">>;
