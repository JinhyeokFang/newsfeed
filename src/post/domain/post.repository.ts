import { UserId } from '../domain/user-id';
import { Post } from './post';

export interface PostRepository {
  save(post: Post): Promise<void>;
  findByAuthorId(authorId: UserId): Promise<Post[]>;
  findOneById(id: number): Promise<Post>;
  deleteOneById(id: number): Promise<void>;
}
