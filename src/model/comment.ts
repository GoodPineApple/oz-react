export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type CommentFormState = Omit<Comment, "id">;
// export interface CommentCreate {
//   postId: number;
//   name: string;
//   email: string;
//   body: string;
// }

export type CommentUpdate = Partial<Omit<Comment, "id">>;

// export interface CommentUpdate {
//   postId?: number;
//   name?: string;
//   email?: string;
//   body?: string;
// }
