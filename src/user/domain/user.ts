import { UserId } from './user-id';

export class User {
  private _following: UserId[] = [];

  constructor(public readonly name: string) {}

  follow(userIdToFollow: UserId) {
    if (this.isFollow(userIdToFollow))
      throw new Error('이미 팔로우 중인 사용자입니다.');
    this._following.push(userIdToFollow);
  }

  private isFollow(userId: UserId) {
    return this._following.indexOf(userId) !== -1;
  }

  unfollow(userIdToUnfollow: UserId) {
    if (!this.isFollow(userIdToUnfollow))
      throw new Error('팔로우 하지 않은 사용자입니다.');
    this._following = this._following.filter(
      (userId) => userId !== userIdToUnfollow,
    );
  }

  get following(): readonly UserId[] {
    return this._following;
  }

  static create(name: string) {
    return new User(name);
  }
}
