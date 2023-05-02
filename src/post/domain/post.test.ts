import { Comment } from './comment';
import { Post } from './post';
import { UserId } from './user-id';

describe('Post', () => {
  let post: Post;

  beforeEach(() => {
    post = new Post.builder(new UserId('any user'))
      .setTitle('any title')
      .setContent('any content')
      .build();
  });

  describe('Post.like(userId)', () => {
    it('when 좋아요 안 누른 사람 should 좋아요 추가', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      post.like(userId);

      // then
      expect(post.doesUserLikeThis(userId)).toBe(true);
    });

    it('when 좋아요 누른 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');
      post.like(userId);

      // when
      const when = () => {
        post.like(userId);
      };

      expect(when).toThrowError();
    });
  });

  describe('Post.dislike(userId)', () => {
    it('when 좋아요 누른 사람 should 좋아요 삭제', () => {
      // given
      const userId: UserId = new UserId('User');
      post.like(userId);

      // when
      post.dislike(userId);

      // then
      expect(post.doesUserLikeThis(userId)).toBe(false);
    });

    it('when 좋아요 안 누른 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      const when = () => {
        post.dislike(userId);
      };

      expect(when).toThrowError();
    });
  });

  it('Post.addComment(userId, content)', () => {
    // given
    const userId: UserId = new UserId('User');
    const content = 'any comment';

    // when
    post.addComment(userId, content);

    // then
    expect(post.comments).toContainEqual(new Comment(userId, content));
  });
});
