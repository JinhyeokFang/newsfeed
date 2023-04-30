import { inject, injectable } from 'inversify';
import { UserId } from '../domain/user-id';
import { DataSource } from '../../common/database/database';
import { Post } from '../domain/post';
import { PostRepository } from '../domain/post.repository';
import PostData from './follow.data-mapper';

@injectable()
export class PostMysqlRepository implements PostRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async save(post: Post): Promise<void> {
    const pool = this.dataSource.createPool();
    const createPostSql = `INSERT IGNORE INTO posts (title, authorUserId, content) VALUES (?, ?, ?)`;
    await pool.execute(createPostSql, [
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

    return postDatas.map((postData) =>
      new Post.builder(new UserId(postData.authorUserId))
        .setTitle(postData.title)
        .setContent(postData.content)
        .build(),
    );
  }
}
