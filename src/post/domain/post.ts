import { randomInt } from 'crypto';
import { Comment } from './comment';
import { UserId } from './user-id';

export class Post {
  private _title: string;
  private _content: string;
  private _likes: UserId[] = [];
  private _comments: Comment[] = [];

  constructor(public readonly id: number, public readonly author: UserId) {}

  like(userId: UserId) {
    if (this.doesUserLikeThis(userId))
      throw new Error('이미 좋아요를 누른 사용자입니다.');
    this._likes.push(userId);
  }

  dislike(userId: UserId) {
    if (!this.doesUserLikeThis(userId))
      throw new Error('좋아요를 누른 사용자가 아닙니다.');
    // userId.equal에 userId를 this로 bind
    this._likes.splice(this._likes.findIndex(userId.equal, userId));
  }

  doesUserLikeThis(userId: UserId) {
    return this._likes.findIndex(userId.equal, userId) !== -1;
  }

  addComment(userId: UserId, content: string) {
    this._comments.push(new Comment(userId, content));
  }

  get comments(): readonly Comment[] {
    return this._comments;
  }

  get likes(): readonly UserId[] {
    return this._likes;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  static builder = class {
    private title = '';
    private content = '';
    private likes: UserId[] = [];
    private comments: Comment[] = [];
    private id: number = randomInt(2 ** 31 - 1);

    constructor(private readonly userId: UserId) {}

    setId(id: number) {
      this.id = id;
      return this;
    }

    setTitle(title: string) {
      this.title = title;
      return this;
    }

    setContent(content: string) {
      this.content = content;
      return this;
    }

    setLikes(likes: UserId[]) {
      this.likes = likes;
      return this;
    }

    setComments(comments: Comment[]) {
      this.comments = comments;
      return this;
    }

    build() {
      const post = new Post(this.id, this.userId);
      post._title = this.title;
      post._content = this.content;
      post._likes = this.likes;
      post._comments = this.comments;
      return post;
    }
  };
}
