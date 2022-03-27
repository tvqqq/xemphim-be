import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class MovieService {
  constructor(private readonly appService: AppService) {}

  async getDetail(id: number) {
    const info = await this.getInfo(id);
    const trailers = await this.getTrailers(id);
    const credits = await this.getCredits(id);
    const recommendations = await this.getRecommendations(id);
    return {
      id,
      info,
      trailers,
      credits,
      recommendations,
    };
  }

  private async getInfo(id: number) {
    const movie = await this.appService.fetchTmdb(`movie/${id}`);
    // TODO: typescript type
    const result = {
      title: movie.title,
      release_date: movie.release_date,
      tagline: movie.tagline,
      genres: movie.genres,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      revenue: movie.revenue,
      runtime: movie.runtime,
      overview: movie.overview,
    };
    return result;
  }

  private async getTrailers(id: number) {
    const videos = await this.appService.fetchTmdb(`movie/${id}/videos`);
    const trailers = [];
    videos.results.map((video) => {
      if (video.type === 'Trailer' && video.site === 'YouTube') {
        trailers.push({
          name: video.name,
          key: video.key,
        });
      }
    });
    return trailers;
  }

  private async getCredits(id: number) {
    const credits = await this.appService.fetchTmdb(`movie/${id}/credits`);
    const casts = [];
    const directors = [];
    const writers = [];
    credits.cast.map((person) => {
      if (casts.length === 6) {
        return;
      }
      if (
        person.known_for_department === 'Acting' &&
        person.profile_path !== null
      ) {
        casts.push({
          id: person.id,
          name: person.name,
          character: person.character,
          profile_path: person.profile_path,
        });
      }
    });
    credits.crew.map((person) => {
      if (person.job === 'Director') {
        directors.push(person.name);
      }
      if (person.job === 'Writer') {
        writers.push(person.name);
      }
    });
    return {
      casts,
      directors,
      writers,
    };
  }

  private async getRecommendations(id: number) {
    const recommendations = await this.appService.fetchTmdb(
      `movie/${id}/recommendations`,
    );
    // TODO: get random numbers
    const result = [];
    recommendations.results.map((recommendation) => {
      if (result.length === 4) {
        return;
      }
      result.push({
        id: recommendation.id,
        title: recommendation.title,
        release_date: recommendation.release_date,
        poster_path: recommendation.poster_path,
      });
    });
    return result;
  }
}
