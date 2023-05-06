import { inject, injectable } from 'inversify';
import { UserId } from '../domain/user-id';
import { DataSource } from '../../common/database/database';
import { Post } from '../domain/post';
import { PostRepository } from '../domain/post.repository';
import PostData from './post.data-mapper';
import PostLikeData from './post-like.data-mapper';

@injectable()
export class PostMysqlRepository implements PostRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async save(post: Post): Promise<void> {
    const pool = this.dataSource.createPool();
    const createPostSql = `INSERT IGNORE INTO posts (id, title, authorUserId, content) VALUES (?, ?, ?, ?)`;
    await this.saveLikes(post.likes.slice(), post.id);
    await pool.execute(createPostSql, [
      post.id,
      post.title,
      post.author.toString(),
      post.content,
    ]);
  }

  async findByAuthorId(authorId: UserId): Promise<Post[]> {
    const sql = `SELECT * FROM posts WHERE authorUserId = ?`;
    const result = await this.dataSource
      .createPool()
      .query(sql, [authorId.toString()]);
    const postDatas: PostData[] = result[0] as PostData[];

    return await Promise.all(
      postDatas.map(async (postData) =>
        new Post.builder(new UserId(postData.authorUserId))
          .setId(postData.id)
          .setTitle(postData.title)
          .setContent(postData.content)
          .setLikes(await this.getLikesByPostId(postData.id))
          .build(),
      ),
    );
  }

  async findOneById(id: number): Promise<Post> {
    const sql = `SELECT * FROM posts WHERE id = ?`;
    const result = await this.dataSource.createPool().query(sql, [id]);
    const postDatas: PostData[] = result[0] as PostData[];

    if (postDatas === undefined || postDatas.length < 1) {
      return null;
    }

    const postData = postDatas[0];
    const likes = await this.getLikesByPostId(id);
    return new Post.builder(new UserId(postData.authorUserId))
      .setId(id)
      .setTitle(postData.title)
      .setContent(postData.content)
      .setLikes(likes)
      .build();
  }

  private async getLikesByPostId(postId: number): Promise<UserId[]> {
    const sql = `SELECT * FROM post_like_list WHERE postId = ?`;
    const result = await this.dataSource.createPool().query(sql, [postId]);
    const likeDatas: PostLikeData[] = result[0] as PostLikeData[];

    return likeDatas.map((likeData) => new UserId(likeData.userId));
  }

  private async saveLikes(likes: UserId[], postId: number): Promise<void> {
    const pool = this.dataSource.createPool();
    const removeSql = `DELETE FROM post_like_list WHERE postId = ?`;
    await pool.execute(removeSql, [postId]);
    likes.forEach(async (like) => {
      const sql = `INSERT INTO post_like_list (userId, postId) VALUES (?, ?)`;
      await pool.execute(sql, [like.toString(), postId]);
    });
    return;
  }

  async deleteOneById(id: number): Promise<void> {
    const pool = this.dataSource.createPool();
    const sql = `DELETE FROM post WHERE id = ?`;
    await pool.execute(sql, [id]);
  }
}
