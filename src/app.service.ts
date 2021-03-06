import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async fetchTmdb(path: string, query = null, method = 'GET') {
    const response = await fetch(
      `https://api.themoviedb.org/3/${path}?api_key=${process.env.TMDB_API_KEY}&${query}`,
      {
        method,
      },
    );
    return await response.json();
  }
}
