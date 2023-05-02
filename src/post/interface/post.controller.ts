import { inject } from 'inversify';
import { Controller } from '../../common/framework/controller';
import { Get, Patch, Post } from '../../common/framework/route-function';
import { PostService } from '../business/post.service';
import { CreatePostBody } from './create-post.body';
import { LikePostBody } from './like-post.body';
import { DislikePostBody } from './dislike-post.body';
import { UserId } from '../domain/user-id';

@Controller('/post')
export class PostController {
  constructor(
    @inject('PostService')
    private readonly postService: PostService,
  ) {}

  @Post('/', CreatePostBody)
  async createPost(req, res) {
    const { authorId, title, content } = req.body;

    await this.postService.createPost(authorId, title, content);

    res.send('OK');
  }

  @Get('/user/:authorId')
  async getPostByAuthorId(req, res) {
    const { authorId } = req.params;

    const posts = await this.postService.getPostByAuthorId(authorId);

    res.send(
      posts.map((post) => ({
        id: post.id,
        authorId: post.author.toString(),
        title: post.title,
        content: post.content,
        comments: post.comments,
        likes: post.likes,
      })),
    );
  }

  @Patch('/like', LikePostBody)
  async likePost(req, res) {
    const { userId, postId } = req.body;
    try {
      await this.postService.like(postId, new UserId(userId));
      res.send('OK');
    } catch (err) {
      console.error(err);
      res.status(400).send('Bad Request');
    }
  }

  @Patch('/dislike', DislikePostBody)
  async dislikePost(req, res) {
    const { userId, postId } = req.body;
    try {
      await this.postService.dislike(postId, new UserId(userId));
      res.send('OK');
    } catch (err) {
      res.status(400).send('Bad Request');
    }
  }
}
