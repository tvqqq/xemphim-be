import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * My first route in NestJS
   * @returns string
   */
  @Get()
  index(): string {
    return 'Welcome to controller movie!';
  }

  /**
   * Get a specific movie
   */
  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.movieService.getDetail(id);
  }

  // TODO: search movie
}
