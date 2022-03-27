import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class ListsService {
  constructor(private readonly appService: AppService) {}

  async getListForHomepage() {
    const min = 1;
    const max = 10;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const videos = await this.appService.fetchTmdb(`/trending/all/day`, `page=${randomNumber}`);
    const result = [];
    videos.results.map((video) => {
      if (video.release_date === undefined) {
        return false;
      }
        result.push({
          id: video.id,
          name: video.title || video.name || video.original_name,
          poster_path: video.poster_path,
          release_date: video.release_date,
        });
    });
    return result;
  }

  async getFirstMovie() {
    const videos = await this.appService.fetchTmdb('/trending/all/day', 'page=1');
    const min = 0;
    const max = 19;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const video = videos.results[randomNumber];
    const result = {
      id: video.id,
      name: video.title,
      poster_path: video.poster_path,
      overview: video.overview,
    };
    return result;
  }
}
