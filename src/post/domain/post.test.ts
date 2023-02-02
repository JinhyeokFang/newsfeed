import { Post } from './post';

describe('Post', () => {
  it('Post.create()', () => {
    // given
    const title = 'Hi this is the title';
    const content = 'Hi this is the content';

    // when
    const post = Post.create(title, content);

    // then
    expect(post).toStrictEqual(new Post(title, content));
  });
});
