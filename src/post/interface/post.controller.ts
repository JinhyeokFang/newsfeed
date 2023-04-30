import { inject } from 'inversify';
import { Controller } from '../../common/framework/controller';
import { Get, Post } from '../../common/framework/route-function';
import { PostService } from '../business/post.service';
import { CreatePostBody } from './create-post.body';

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
        authorId: post.author.toString(),
        title: post.title,
        content: post.content,
        comments: post.comments,
        likes: post.likes,
      })),
    );
  }
}
