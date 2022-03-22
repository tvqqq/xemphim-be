import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class ListsService {
  constructor(private readonly appService: AppService) {}

  async getListForHomepage() {
    // trending day (random page 1) get 1
    // now playing (8)
    // popular (12)
  }
}
