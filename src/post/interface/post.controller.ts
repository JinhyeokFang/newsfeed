import { inject } from 'inversify';
import { Controller } from '../../common/framework/controller';
import { PostService } from '../business/post.service';

@Controller('/post')
export class PostController {
  constructor(
    @inject('PostService')
    private readonly postService: PostService,
  ) {}
}
