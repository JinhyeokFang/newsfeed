import { UserId } from './user-id';

export class Post {
  public title: string;
  public content: string;
  public likes: UserId[] = [];
  public comments: unknown[] = [];

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  static create(title: string, content: string) {
    return new Post(title, content);
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
}
