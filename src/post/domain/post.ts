import { Comment } from './comment';
import { UserId } from './user-id';

export class Post {
  private title: string;
  private content: string;
  private likes: UserId[] = [];
  private comments: Comment[] = [];

  constructor(public readonly author: UserId) {}

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

  doesUserLikeThis(userId: UserId) {
    return this.likes.includes(userId);
  }

  addComment(userId: UserId, content: string) {
    this.comments.push(new Comment(userId, content));
  }

  get commentList() {
    return this.comments;
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
      const post = new Post(this.userId);
      post.title = this.title;
      post.content = this.content;
      return post;
    }
  };
}
