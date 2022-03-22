import { AppService } from 'src/app.service';
import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, AppService],
})
export class MovieModule {}
