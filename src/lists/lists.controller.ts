import { Controller, Get, Param } from '@nestjs/common';
import { ListsService } from 'src/lists/lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get('homepage')
  async getListForHomepage() {
    const homepage = await this.listsService.getListForHomepage();
    return homepage;
  }

  @Get('popular')
  async getPopular() {
    const homepage = await this.listsService.getPopular();
    return homepage;
  }

  @Get('top-rated')
  async getTopRated() {
    const homepage = await this.listsService.getTopRated();
    return homepage;
  }

  /**
   * Get a specific Lists
   */
  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.listsService.getDetail(id);
  }
}
