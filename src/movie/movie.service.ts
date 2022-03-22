import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class MovieService {
  constructor(private readonly appService: AppService) {}

  async getDetail(id: number) {
    const info = await this.getInfo(id);
    const trailer = await this.getTrailers(id);
    const credits = await this.getCredits(id);
    const recommendations = await this.getRecommendations(id);
    return {
      info,
      trailer,
      credits,
      recommendations,
    };
  }

  private async getInfo(id: number) {
    const movie = await this.appService.fetchTmdb(`movie/${id}`);
    // Budget - Đạo diên 2
    // Revenue - biên kịch 2
    // TODO: typescript type
    return {
      movie: movie,
      backdrop_path: movie.backdrop_path,
    };
  }

  private async getTrailers(id: number) {
    const videos = await this.appService.fetchTmdb(`movie/${id}/videos`);
    // TODO: get "type": "Trailer",
    // TODO: typescript type
    return {
      videos,
    };
  }

  private async getCredits(id: number) {
    const credits = await this.appService.fetchTmdb(`movie/${id}/credits`);
    // Top Billed Cast
    // TODO:"known_for_department": "Acting",
    // TODO: top 6
    // TODO: typescript type

    // Director
    // "job": "Director" array

    // Wrtier
    //  "job": "Writer" array
    return {
      credits,
    };
  }

  private async getRecommendations(id: number) {
    const recommendations = await this.appService.fetchTmdb(
      `movie/${id}/recommendations`,
    );

    // 1. Get first request to get how much pages existed
    // Random a number from 1 - latest pages
    // Phrase 1: get 4 movies for templates (no slider yet)

    return {
      recommendations,
    };
  }
}
