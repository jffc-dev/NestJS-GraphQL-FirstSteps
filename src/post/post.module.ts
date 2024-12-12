import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => AuthorModule)],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
