import { hash, compare } from 'bcrypt';
import { UserId } from './user-id';

export class Account {
  constructor(
    public readonly email: string,
    public readonly hashedPassword: string,
    public readonly name: string,
  ) {}
  private _following: UserId[] = [];

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

  async comparePassword(plainPassword: string): Promise<boolean> {
    return await compare(plainPassword, this.hashedPassword);
  }

  static async create(email: string, password: string, name: string) {
    const hashedPassword = await Account.createHashedPassword(password);
    return new Account(email, hashedPassword, name);
  }

  private static async createHashedPassword(password: string) {
    return await hash(password, 10);
  }
}
