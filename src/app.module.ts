import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [MovieModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
