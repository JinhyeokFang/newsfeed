import { Comment } from './comment';
import { UserId } from './user-id';

export class Post {
  public title: string;
  public content: string;
  public author: UserId;
  public likes: UserId[] = [];
  public comments: Comment[] = [];

  constructor(title?: string, content?: string, author?: UserId) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  like(userId: UserId) {
    if (this.doesUserLikeThis(userId))
      throw new Error('이미 좋아요를 누른 사용자입니다.');
    this.likes.push(userId);
  }

  unlike(userId: UserId) {
    if (!this.doesUserLikeThis(userId))
      throw new Error('좋아요를 누른 사용자가 아닙니다.');
    // userId.equal에 userId를 this로 bind
    this.likes.splice(this.likes.findIndex(userId.equal, userId));
  }

  private doesUserLikeThis(userId: UserId) {
    return this.likes.includes(userId);
  }

  addComment(userId: UserId, content: string) {
    this.comments.push(new Comment(userId, content));
  }

  static builder = class {
    private title = '';
    private content = '';

    constructor(private readonly userId: UserId) {}

    setTitle(title: string) {
      this.title = title;
      return this;
    }

    setContent(content: string) {
      this.content = content;
      return this;
    }

    build() {
      const post = new Post();
      post.title = this.title;
      post.content = this.content;
      post.author = this.userId;
      return post;
    }
  };
}
