import { User } from './user';
import { UserId } from './user-id';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = User.create('any user name');
  });

  describe('User.follow(userId)', () => {
    it('when 팔로우 안 한 사람 should 팔로우', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      user.follow(userId);

      // then
      expect(user.following).toContain(userId);
    });

    it('when 팔로우 한 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');
      user.follow(userId);

      // when
      const when = () => {
        user.follow(userId);
      };

      expect(when).toThrowError();
    });
  });

  describe('User.unfollow(userId)', () => {
    it('when 좋아요 누른 사람 should 좋아요 삭제', () => {
      // given
      const userId: UserId = new UserId('User');
      user.follow(userId);

      // when
      user.unfollow(userId);

      // then
      expect(user.following).not.toContainEqual(userId);
    });

    it('when 좋아요 안 누른 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      const when = () => {
        user.unfollow(userId);
      };

      expect(when).toThrowError();
    });
  });
});
