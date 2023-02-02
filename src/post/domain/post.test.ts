import { Comment } from './comment';
import { Post } from './post';
import { UserId } from './user-id';

describe('Post', () => {
  let post: Post;
  beforeEach(() => {
    post = Post.create('any title', 'any content');
  });

  it('Post.create()', () => {
    // given
    const title = 'Hi this is the title';
    const content = 'Hi this is the content';

    // when
    const post = Post.create(title, content);

    // then
    expect(post).toStrictEqual(new Post(title, content));
  });

  describe('Post.like(userId)', () => {
    it('when 좋아요 안 누른 사람 should 좋아요 추가', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      post.like(userId);

      // then
      expect(post.likes).toContain(userId);
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

  describe('Post.unlike(userId)', () => {
    it('when 좋아요 누른 사람 should 좋아요 추가', () => {
      // given
      const userId: UserId = new UserId('User');
      post.like(userId);

      // when
      post.unlike(userId);

      // then
      expect(post.likes).not.toContain(userId);
    });

    it('when 좋아요 안 누른 사람 should 오류', () => {
      // given
      const userId: UserId = new UserId('User');

      // when
      const when = () => {
        post.unlike(userId);
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
