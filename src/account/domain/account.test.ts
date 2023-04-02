import { Account } from './account';
import { UserId } from './user-id';

describe('Account', () => {
  let account: Account;

  beforeEach(async () => {
    account = await Account.create('', 'password', '');
  });

  it('Account.comparePassword(plainPassword)', async () => {
    expect(await account.comparePassword('password')).toBe(true);
    expect(await account.comparePassword('pass!word')).toBe(false);
  });

  describe('User.follow(userId)', () => {
    it('when 팔로우 안 한 사람 should 팔로우', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      account.follow(userId);

      // then
      expect(account.following).toContain(userId);
    });

    it('when 팔로우 한 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');
      account.follow(userId);

      // when
      const when = () => {
        account.follow(userId);
      };

      expect(when).toThrowError();
    });
  });

  describe('User.unfollow(userId)', () => {
    it('when 좋아요 누른 사람 should 좋아요 삭제', () => {
      // given
      const userId: UserId = new UserId('User');
      account.follow(userId);

      // when
      account.unfollow(userId);

      // then
      expect(account.following).not.toContainEqual(userId);
    });

    it('when 좋아요 안 누른 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      const when = () => {
        account.unfollow(userId);
      };

      expect(when).toThrowError();
    });
  });
});
