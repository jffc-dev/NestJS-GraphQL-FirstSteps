import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/author/entities/author.entity';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private authorService: AuthorService,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findPostsByAuthor(authorId: number): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        authorId: authorId,
      },
    });
  }

  async createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create(post);
    return await this.postRepository.save(newPost);
  }

  getAuthor(userId: number): Promise<Author> {
    return this.authorService.findOne(userId);
  }
}
