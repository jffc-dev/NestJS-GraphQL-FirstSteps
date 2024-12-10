import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  findAll(): Post[] {
    return [
      {
        id: 1,
        title: 'Hello world',
      },
    ];
  }
}
