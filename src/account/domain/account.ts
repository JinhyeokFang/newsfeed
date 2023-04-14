import { hash, compare } from 'bcrypt';
import { UserId } from './user-id';

interface AccountData {
  email: string;
  hashedPassword: string;
  name: string;
  id: UserId;
}

export class Account {
  private constructor(private readonly data: AccountData) {}
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
    return await compare(plainPassword, this.data.hashedPassword);
  }

  static async create(data: {
    email: string;
    password?: string;
    hashedPassword?: string;
    name: string;
    id?: UserId;
  }) {
    const hashedPassword =
      data.hashedPassword ||
      (await Account.createHashedPassword(data.password));
    return new Account({
      email: data.email,
      hashedPassword,
      name: data.name,
      id: data.id || UserId.generate(),
    });
  }

  private static async createHashedPassword(password: string) {
    return await hash(password, 10);
  }

  get email() {
    return this.data.email;
  }

  get hashedPassword() {
    return this.data.hashedPassword;
  }

  get id() {
    return this.data.id;
  }
}
