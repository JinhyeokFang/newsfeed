import { inject, injectable } from 'inversify';
import { Post } from '../domain/post';
import { PostRepository } from '../domain/post.repository';
import { UserId } from '../domain/user-id';

@injectable()
export class PostService {
  constructor(
    @inject('PostRepository')
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(authorId: UserId, title: string, content: string) {
    const post = new Post.builder(authorId)
      .setTitle(title)
      .setContent(content)
      .build();

    await this.postRepository.save(post);
  }

  async getPostByAuthorId(authorId: UserId) {
    const posts = await this.postRepository.findByAuthorId(authorId);

    return posts;
  }

  async like(postId: number, userId: UserId) {
    const post = await this.postRepository.findOneById(postId);
    post.like(userId);
    await this.postRepository.save(post);
  }

  async dislike(postId: number, userId: UserId) {
    const post = await this.postRepository.findOneById(postId);
    post.dislike(userId);
    await this.postRepository.save(post);
  }
}
